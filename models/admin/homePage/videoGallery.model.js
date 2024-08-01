const { mongoose, Schema } = require("mongoose");

// Video Gallery Schema
const VideoGallerySchema = new Schema({
    videoTitle: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "MediaCategory",
    },
    videoType: {
        type: String,
        enum: ["Youtube", "Normal"],
    },
    videoLink: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const VideoGallery = mongoose.model("VideoGallery", VideoGallerySchema);

module.exports = VideoGallery;
