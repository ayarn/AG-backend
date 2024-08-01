const apiResponseHandler = require("utils/apiResponseHandler");
const mediaCategoryService = require("service/admin/homePage/mediaCategory.service");

module.exports = {
    addMediaCategory,
    editMediaCategory,
    getMediaCategory,
    deleteMediaCategory,
    getMediaCategories,
};

// Add MediaCategory
async function addMediaCategory(req, res, next) {
    mediaCategoryService
        .addMediaCategory(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit MediaCategory
async function editMediaCategory(req, res, next) {
    mediaCategoryService
        .editMediaCategory(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get MediaCategory
async function getMediaCategory(req, res, next) {
    mediaCategoryService
        .getMediaCategory(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete MediaCategory
async function deleteMediaCategory(req, res, next) {
    mediaCategoryService
        .deleteMediaCategory(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All MediaCategories
async function getMediaCategories(req, res, next) {
    mediaCategoryService
        .getMediaCategories(req)
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
