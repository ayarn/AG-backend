const { mongoose, Schema } = require("mongoose");

// User upload document Schema
const UserUploadDocSchema = new Schema({
    docId: {
        type: Schema.Types.ObjectId,
        ref: "Document",
    },
    documentName: {
        type: String,
    },
    documentFile: {
        type: String,
    },
    documentStatus: {
        type: String,
        enum: ["Pending", "Approved"],
    },
    isSubmitted: {
        type: Boolean,
        default: false,
    },
});

const UserUploadDoc = mongoose.model("UserUploadDoc", UserUploadDocSchema);

module.exports = UserUploadDoc;
