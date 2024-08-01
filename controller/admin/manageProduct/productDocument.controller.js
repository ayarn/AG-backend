const apiResponseHandler = require("utils/apiResponseHandler");
const productDocumentService = require("service/admin/manageProduct/productDocument.service");

module.exports = {
    addProductDocument,
    getProductDocument,
    editProductDocument,
    deleteProductDocument,
    getProductDocuments,
};

// Add Document
async function addProductDocument(req, res, next) {
    productDocumentService
        .addProductDocument(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Document
async function editProductDocument(req, res, next) {
    productDocumentService
        .editProductDocument(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Document
async function getProductDocument(req, res, next) {
    productDocumentService
        .getProductDocument(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Document
async function deleteProductDocument(req, res, next) {
    productDocumentService
        .deleteProductDocument(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Documents
async function getProductDocuments(req, res, next) {
    productDocumentService
        .getProductDocuments(req)
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
