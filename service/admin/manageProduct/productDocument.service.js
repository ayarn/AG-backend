const ProductDocument = require("models/admin/manageProduct/productDocument.model");

module.exports = {
    addProductDocument,
    getProductDocument,
    editProductDocument,
    deleteProductDocument,
    getProductDocuments,
};

// Add new document
async function addProductDocument(params) {
    try {
        const { documentName, status } = params;

        if (!documentName) {
            const error = new Error("Document name is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const documentData = {
            documentName,
            status,
        };

        const document = await ProductDocument.create(documentData);

        if (!document) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Product document successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit document
async function editProductDocument(params) {
    try {
        const { id, documentName, status } = params;

        if (!id) {
            const error = new Error("Product document Id is required");
            error.status = 400;
            throw error;
        }

        const document = await ProductDocument.findById(id);

        if (!document) {
            const error = new Error("Document not found");
            error.status = 400;
            throw error;
        }

        if (documentName) {
            document.documentName = documentName;
        }

        if (status) {
            document.status = status;
        }

        await document.save();

        return { status: 200, data: document, message: "Product Document successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get document
async function getProductDocument(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Product document Id is required");
        error.status = 400;
        throw error;
    }

    const document = await ProductDocument.findById(id);

    if (!document) {
        const error = new Error("Product document not found");
        error.status = 400;
        throw error;
    }

    const documentData = {
        id: document._id,
        documentName: document.documentName,
        status: document.status,
    };

    return { status: 200, data: documentData, message: "Product document received" };
}

// Delete document
async function deleteProductDocument(params) {
    try {
        const { id } = params;

        const deletedDocument = await ProductDocument.findOneAndDelete({ _id: id });

        if (!deletedDocument) {
            const error = new Error("Document not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedDocument,
            message: "Product document successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all documents
async function getProductDocuments(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { documentName: { $regex: search, $options: "i" } };
        }

        const documents = await ProductDocument.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!documents || documents.length === 0) {
            return { status: 200, data: [], message: "Currently documents are not available" };
        }

        const allDocuments = [];

        for (let document of documents) {
            const newsData = {
                id: document._id,
                documentName: document.documentName,
                status: document.status,
            };

            allDocuments.push(newsData);
        }

        return {
            status: 200,
            data: allDocuments,
            message: "Product documents successfully received",
            page,
            items_per_page,
            total: documents.length,
        };
    } catch (err) {
        throw err;
    }
}
