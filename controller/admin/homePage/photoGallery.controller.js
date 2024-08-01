const apiResponseHandler = require("utils/apiResponseHandler");
const photoGalleryService = require("service/admin/homePage/photoGallery.service");

module.exports = {
    addPhoto,
    getPhoto,
    editPhoto,
    deletePhoto,
    getPhotos,
    getPhotoCategories,
};

// Add Photo
async function addPhoto(req, res, next) {
    photoGalleryService
        .addPhoto(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Photo
async function editPhoto(req, res, next) {
    photoGalleryService
        .editPhoto(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Photo
async function getPhoto(req, res, next) {
    photoGalleryService
        .getPhoto(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Photo
async function deletePhoto(req, res, next) {
    photoGalleryService
        .deletePhoto(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Photo
async function getPhotos(req, res, next) {
    photoGalleryService
        .getPhotos(req)
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

// Get Photo Categories
async function getPhotoCategories(req, res, next) {
    photoGalleryService
        .getPhotoCategories()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
            })
        )
        .catch(next);
}
