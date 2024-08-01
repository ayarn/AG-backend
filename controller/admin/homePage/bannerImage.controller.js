const apiResponseHandler = require("utils/apiResponseHandler");
const bannerImageService = require("service/admin/homePage/bannerImage.service");

module.exports = {
    addBanner,
    editBanner,
    getBanner,
    deleteBanner,
    getAllBanners,
};

// Add banner
async function addBanner(req, res, next) {
    bannerImageService
        .addBanner(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit banner
async function editBanner(req, res, next) {
    bannerImageService
        .editBanner(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get banner
async function getBanner(req, res, next) {
    bannerImageService
        .getBanner(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete banner
async function deleteBanner(req, res, next) {
    bannerImageService
        .deleteBanner(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Banners
async function getAllBanners(req, res, next) {
    bannerImageService
        .getAllBanners(req)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
                pagination: {
                    page: result.page,
                    items_per_page: result.items_per_page,
                    total: result.total,
                },
            })
        )
        .catch(next);
}
