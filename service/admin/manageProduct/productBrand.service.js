const ProductBrand = require("models/admin/manageProduct/productBrand.model");

module.exports = {
    addProductBrand,
    getProductBrand,
    editProductBrand,
    deleteProductBrand,
    getProductBrands,
};

// Add new product brand
async function addProductBrand(params) {
    try {
        const { brandName, status } = params;

        if (!brandName) {
            const error = new Error("Product brand name is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const productBrandData = {
            brandName,
            status,
        };

        const brand = await ProductBrand.create(productBrandData);

        if (!brand) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Product brand successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit product brand
async function editProductBrand(params) {
    try {
        const { id, brandName, status } = params;

        if (!id) {
            const error = new Error("Product brand Id is required");
            error.status = 400;
            throw error;
        }

        const brand = await ProductBrand.findById(id);

        if (!brand) {
            const error = new Error("Product brand not found");
            error.status = 400;
            throw error;
        }

        if (brandName) {
            brand.brandName = brandName;
        }

        if (status) {
            brand.status = status;
        }

        await brand.save();

        return { status: 200, data: brand, message: "Product brand successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get product brand
async function getProductBrand(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Product brand Id is required");
        error.status = 400;
        throw error;
    }

    const brand = await ProductBrand.findById(id);

    if (!brand) {
        const error = new Error("Product brand not found");
        error.status = 400;
        throw error;
    }

    const brandData = {
        id: brand._id,
        brandName: brand.brandName,
        status: brand.status,
    };

    return { status: 200, data: brandData, message: "Product brand received" };
}

// Delete product brand
async function deleteProductBrand(params) {
    try {
        const { id } = params;

        const deletedBrand = await ProductBrand.findOneAndDelete({ _id: id });

        if (!deletedBrand) {
            const error = new Error("Product brand not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedBrand,
            message: "Product brand successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all product brands
async function getProductBrands(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { brandName: { $regex: search, $options: "i" } };
        }

        const brands = await ProductBrand.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!brands || brands.length === 0) {
            return { status: 200, data: [], message: "Currently product brands are not available" };
        }

        const allBrands = [];

        for (let brand of brands) {
            const newsData = {
                id: brand._id,
                brandName: brand.brandName,
                status: brand.status,
            };

            allBrands.push(newsData);
        }

        return {
            status: 200,
            data: allBrands,
            message: "Product brands successfully received",
            page,
            items_per_page,
            total: brands.length,
        };
    } catch (err) {
        throw err;
    }
}
