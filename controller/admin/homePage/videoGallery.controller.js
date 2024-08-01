const apiResponseHandler = require("utils/apiResponseHandler");
const videoGalleryService = require("service/admin/homePage/videoGallery.service");

module.exports = {
    addVideo,
    getVideo,
    editVideo,
    deleteVideo,
    getVideos,
    getVideoCategories
};

// Add Video
async function addVideo(req, res, next) {
    videoGalleryService
        .addVideo(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Video
async function editVideo(req, res, next) {
    videoGalleryService
        .editVideo(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Video
async function getVideo(req, res, next) {
    videoGalleryService
        .getVideo(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Video
async function deleteVideo(req, res, next) {
    videoGalleryService
        .deleteVideo(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Video
async function getVideos(req, res, next) {
    videoGalleryService
        .getVideos(req)
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

// Get Video Categories
async function getVideoCategories(req, res, next) {
    videoGalleryService
        .getVideoCategories()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
            })
        )
        .catch(next);
}
