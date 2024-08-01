const apiResponseHandler = require("utils/apiResponseHandler");
const homeService = require("service/web/home.service");

module.exports = {
    getAllActiveBanners,
    getAllActiveLogos,
    getAllActiveAgriguruUpdates,
    getAllActiveNewsAndEvents,
    getAllActiveBrands,
    getAllActivePhotos,
    getAllActiveImagesByCategory,
    getAllActiveVideos,
    getAllActiveCategories,
    getAllActiveHeaderTaglines,
};

// Get All Active Banners
async function getAllActiveBanners(req, res, next) {
    homeService
        .getAllActiveBanners()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Logos
async function getAllActiveLogos(req, res, next) {
    homeService
        .getAllActiveLogos()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Agriguru Updates
async function getAllActiveAgriguruUpdates(req, res, next) {
    homeService
        .getAllActiveAgriguruUpdates()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active News And Events
async function getAllActiveNewsAndEvents(req, res, next) {
    homeService
        .getAllActiveNewsAndEvents(req)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Brands
async function getAllActiveBrands(req, res, next) {
    homeService
        .getAllActiveBrands()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Photos
async function getAllActivePhotos(req, res, next) {
    homeService
        .getAllActivePhotos()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Images By Category
async function getAllActiveImagesByCategory(req, res, next) {
    homeService
        .getAllActiveImagesByCategory()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Videos
async function getAllActiveVideos(req, res, next) {
    homeService
        .getAllActiveVideos()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active Categories
async function getAllActiveCategories(req, res, next) {
    homeService
        .getAllActiveCategories()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Active HeaderTaglines
async function getAllActiveHeaderTaglines(req, res, next) {
    homeService
        .getAllActiveHeaderTaglines()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
