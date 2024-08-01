const apiResponseHandler = require("utils/apiResponseHandler");
const categoryService = require("service/admin/manageProduct/category.service");

module.exports = {
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    getCategories,
};

// Add Category
async function addCategory(req, res, next) {
    categoryService
        .addCategory(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Category
async function editCategory(req, res, next) {
    categoryService
        .editCategory(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Category
async function getCategory(req, res, next) {
    categoryService
        .getCategory(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Category
async function deleteCategory(req, res, next) {
    categoryService
        .deleteCategory(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Categories
async function getCategories(req, res, next) {
    categoryService
        .getCategories(req)
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
