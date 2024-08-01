const apiResponseHandler = require("utils/apiResponseHandler");
const newsUpdateService = require("service/admin/homePage/newsUpdate.service");

module.exports = {
    addNews,
    getNews,
    editNews,
    deleteNews,
    getAllNews,
};

// Add News
async function addNews(req, res, next) {
    newsUpdateService
        .addNews(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit News
async function editNews(req, res, next) {
    newsUpdateService
        .editNews(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get News
async function getNews(req, res, next) {
    newsUpdateService
        .getNews(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete News
async function deleteNews(req, res, next) {
    newsUpdateService
        .deleteNews(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All News
async function getAllNews(req, res, next) {
    newsUpdateService
        .getAllNews(req)
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
