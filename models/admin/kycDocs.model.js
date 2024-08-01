const { mongoose, Schema } = require("mongoose");

// Document Schema
const DocumentSchema = new Schema({
    documentTitle: {
        type: String,
    },
    documentType: {
        type: String,
        enum: ["Buyer", "Seller"],
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
