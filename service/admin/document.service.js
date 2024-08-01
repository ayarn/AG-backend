const Document = require("models/admin/kycDocs.model");

module.exports = {
    addDocument,
    getDocument,
    editDocument,
    deleteDocument,
    getDocuments,
};

// Add new document
async function addDocument(params) {
    try {
        const { documentTitle, documentType, status } = params;

        if (!documentTitle) {
            const error = new Error("Document Title is required");
            error.status = 400;
            throw error;
        }

        if (!documentType) {
            const error = new Error("Document type is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const documentData = {
            documentTitle,
            documentType,
            status,
        };

        const document = await Document.create(documentData);

        if (!document) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Document successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit document
async function editDocument(params) {
    try {
        const { id, documentTitle, documentType, status } = params;

        if (!id) {
            const error = new Error("Document Id is required");
            error.status = 400;
            throw error;
        }

        const document = await Document.findById(id);

        if (!document) {
            const error = new Error("Document not found");
            error.status = 400;
            throw error;
        }

        if (documentTitle) {
            document.documentTitle = documentTitle;
        }

        if (documentType) {
            document.documentType = documentType;
        }

        if (status) {
            document.status = status;
        }

        await document.save();

        return { status: 200, data: document, message: "Document successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get document
async function getDocument(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Document Id is required");
        error.status = 400;
        throw error;
    }

    const document = await Document.findById(id);

    if (!document) {
        const error = new Error("Document not found");
        error.status = 400;
        throw error;
    }

    return { status: 200, data: document, message: "Document received" };
}

// Delete document
async function deleteDocument(params) {
    try {
        const { id } = params;

        const deletedDocument = await Document.findOneAndDelete({ _id: id });

        if (!deletedDocument) {
            const error = new Error("Document not found");
            error.status = 400;
            throw error;
        }

        return { status: 200, data: deletedDocument, message: "Document successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all documents
async function getDocuments() {
    try {
        const documents = await Document.find({});

        if (!documents || documents.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently documents are not available",
            };
        }

        return { status: 200, data: documents, message: "Documents successfully received" };
    } catch (err) {
        throw err;
    }
}
