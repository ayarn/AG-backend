const { mongoose, Schema } = require("mongoose");

// Photo Gallery Schema
const PhotoGallerySchema = new Schema({
    imageTitle: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "MediaCategory",
    },
    photo: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const PhotoGallery = mongoose.model("PhotoGallery", PhotoGallerySchema);

module.exports = PhotoGallery;
