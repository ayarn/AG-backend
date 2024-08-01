const BannerImage = require("models/admin/homePage/bannerImage.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addBanner,
    editBanner,
    getBanner,
    deleteBanner,
    getAllBanners,
};

// Add new banner image
async function addBanner(params, image) {
    try {
        const { bannerTitle, bannerDescription, imageType, category, status, bannerLink } = params;

        if (!bannerTitle) {
            const error = new Error("Banner Title is required");
            error.status = 400;
            throw error;
        }

        if (!bannerDescription) {
            const error = new Error("Banner Description is required");
            error.status = 400;
            throw error;
        }

        if (!imageType) {
            const error = new Error("Image type is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Banner Image is required");
            error.status = 400;
            throw error;
        }

        if (!category) {
            const error = new Error("Category is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        if (!bannerLink) {
            const error = new Error("Banner Link is required");
            error.status = 400;
            throw error;
        }

        const bannerData = {
            bannerTitle,
            bannerDescription,
            imageType,
            bannerImage: image.key,
            category,
            status,
            bannerLink,
        };

        const banner = await BannerImage.create(bannerData);

        if (!banner) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Banner successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit banner image
async function editBanner(params, image) {
    try {
        const { id, bannerTitle, bannerDescription, imageType, category, status, bannerLink } =
            params;

        if (!id) {
            const error = new Error("Banner Id is required");
            error.status = 400;
            throw error;
        }

        const banner = await BannerImage.findById(id);

        if (!banner) {
            const error = new Error("Banner not found");
            error.status = 400;
            throw error;
        }

        if (bannerTitle) {
            banner.bannerTitle = bannerTitle;
        }

        if (bannerDescription) {
            banner.bannerDescription = bannerDescription;
        }

        if (imageType) {
            banner.imageType = imageType;
        }

        if (image) {
            // Delete old image first
            deleteFile(banner.bannerImage);

            // Replace new image
            banner.bannerImage = image.key;
        }

        if (category) {
            banner.category = category;
        }

        if (status) {
            banner.status = status;
        }

        if (bannerLink) {
            banner.bannerLink = bannerLink;
        }

        await banner.save();

        return { status: 200, data: banner, message: "Banner successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get banner
async function getBanner(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Banner Id is required");
            error.status = 400;
            throw error;
        }

        const banner = await BannerImage.findById(id);

        if (!banner) {
            const error = new Error("Banner not found");
            error.status = 400;
            throw error;
        }

        const bannerData = {
            id: id,
            bannerTitle: banner.bannerTitle,
            bannerDescription: banner.bannerDescription,
            imageType: banner.imageType,
            bannerImage: getCloudFrontUrl(banner.bannerImage),
            category: banner.category,
            status: banner.status,
            bannerLink: banner.bannerLink,
        };

        return { status: 200, data: bannerData, message: "Banner received" };
    } catch (err) {
        throw err;
    }
}

// Delete banner
async function deleteBanner(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Banner Id is required");
            error.status = 400;
            throw error;
        }

        const deletedBanner = await BannerImage.findOneAndDelete({ _id: id });

        if (!deletedBanner) {
            const error = new Error("Banner not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedBanner.bannerImage);

        return { status: 200, data: deletedBanner, message: "Banner successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all banners
async function getAllBanners(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { bannerTitle: { $regex: search, $options: "i" } };
        }

        const banners = await BannerImage.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!banners || banners.length === 0) {
            return { status: 200, data: [], message: "Currently banner images are not available" };
        }

        const allBanners = banners.map((banner) => ({
            id: banner._id,
            bannerTitle: banner.bannerTitle,
            bannerDescription: banner.bannerDescription,
            imageType: banner.imageType,
            bannerImage: getCloudFrontUrl(banner.bannerImage),
            category: banner.category,
            status: banner.status,
            bannerLink: banner.bannerLink,
        }));

        return {
            status: 200,
            data: allBanners,
            message: "Banners successfully received",
            page,
            items_per_page,
            total: allBanners.length,
        };
    } catch (err) {
        throw err;
    }
}
