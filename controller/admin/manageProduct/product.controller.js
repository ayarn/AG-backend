const apiResponseHandler = require("utils/apiResponseHandler");
const productService = require("service/admin/manageProduct/product.service");

module.exports = {
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductMetaData,
    getLoadingPorts,
    getDestinationPortsByLoadingPort,
};

// Add product
async function addProduct(req, res, next) {
    productService
        .addProduct(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit product
async function editProduct(req, res, next) {
    productService
        .editProduct(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get product
async function getProduct(req, res, next) {
    productService
        .getProduct(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete product
async function deleteProduct(req, res, next) {
    productService
        .deleteProduct(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get all products
async function getProducts(req, res, next) {
    productService
        .getProducts(req)
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

// Get product meta data
async function getProductMetaData(req, res, next) {
    productService
        .getProductMetaData()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get loading ports by country
async function getLoadingPorts(req, res, next) {
    productService
        .getLoadingPorts(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get destination ports by loading port
async function getDestinationPortsByLoadingPort(req, res, next) {
    productService
        .getDestinationPortsByLoadingPort(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}