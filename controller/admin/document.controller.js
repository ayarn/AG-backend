const apiResponseHandler = require("utils/apiResponseHandler");
const documentService = require("service/admin/document.service");

module.exports = {
    addDocument,
    getDocument,
    editDocument,
    deleteDocument,
    getDocuments,
};

// Add Document
async function addDocument(req, res, next) {
    documentService
        .addDocument(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Document
async function editDocument(req, res, next) {
    documentService
        .editDocument(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Document
async function getDocument(req, res, next) {
    documentService
        .getDocument(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Document
async function deleteDocument(req, res, next) {
    documentService
        .deleteDocument(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Documents
async function getDocuments(req, res, next) {
    documentService
        .getDocuments()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
