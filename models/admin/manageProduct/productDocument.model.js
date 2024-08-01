const { mongoose, Schema } = require("mongoose");

// Product Document Schema
const ProductDocumentSchema = new Schema({
    documentName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const ProductDocument = mongoose.model("ProductDocument", ProductDocumentSchema);

module.exports = ProductDocument;
