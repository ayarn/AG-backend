const Brand = require("models/admin/homePage/brand.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addBrand,
    getBrand,
    editBrand,
    deleteBrand,
    getBrands,
};

// Add new Brand
async function addBrand(params, image) {
    try {
        const { brandTitle, status } = params;

        if (!brandTitle) {
            const error = new Error("Brand Title is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Brand image is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const brandData = {
            brandTitle,
            brandImage: image.key,
            status,
        };

        const brand = await Brand.create(brandData);

        if (!brand) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Brand successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit Brand
async function editBrand(params, image) {
    try {
        const { id, brandTitle, status } = params;

        if (!id) {
            const error = new Error("Brand Id is required");
            error.status = 400;
            throw error;
        }

        const brand = await Brand.findById(id);

        if (!brand) {
            const error = new Error("Brand not found");
            error.status = 400;
            throw error;
        }

        if (brandTitle) {
            brand.brandTitle = brandTitle;
        }

        if (image) {
            // Delete old image first
            deleteFile(brand.brandImage);

            // Replace new image
            brand.brandImage = image.key;
        }

        if (status) {
            brand.status = status;
        }

        await brand.save();

        return { status: 200, data: brand, message: "Brand successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get Brand
async function getBrand(params) {
    try {
        const { id } = params;
    
        if (!id) {
            const error = new Error("Brand Id is required");
            error.status = 400;
            throw error;
        }
    
        const brand = await Brand.findById(id);
    
        if (!brand) {
            const error = new Error("Brand not found");
            error.status = 400;
            throw error;
        }
    
        const brandData = {
            id: id,
            brandTitle: brand.brandTitle,
            brandImage: getCloudFrontUrl(brand.brandImage),
            status: brand.status,
        };
    
        return { status: 200, data: brandData, message: "Brand received" };
    } catch (err) {
        throw err;
    }
}

// Delete Brand
async function deleteBrand(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Brand Id is required");
            error.status = 400;
            throw error;
        }

        const deletedBrand = await Brand.findOneAndDelete({ _id: id });

        if (!deletedBrand) {
            const error = new Error("Brand not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedBrand.brandImage);

        return { status: 200, data: deletedBrand, message: "Brand successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all brands
async function getBrands(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { brandTitle: { $regex: search, $options: "i" } };
        }

        const brands = await Brand.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!brands || brands.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently brands are not available",
            };
        }

        const allBrands = brands.map((brand) => ({
            id: brand._id,
            brandTitle: brand.brandTitle,
            brandImage: getCloudFrontUrl(brand.brandImage),
            status: brand.status,
        }));

        return {
            status: 200,
            data: allBrands,
            message: "Brands successfully received",
            page,
            items_per_page,
            total: allBrands.length,
        };
    } catch (err) {
        throw err;
    }
}
