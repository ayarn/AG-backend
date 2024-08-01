const { mongoose, Schema } = require("mongoose");

// Banner Image Schema
const BannerImageSchema = new Schema({
    bannerTitle: {
        type: String,
    },
    bannerDescription: {
        type: String,
    },
    imageType: {
        type: String,
        enum: ["Image", "GIF"],
    },
    bannerImage: {
        type: String,
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
    bannerLink: {
        type: String,
    },
});

const BannerImage = mongoose.model("BannerImage", BannerImageSchema);

module.exports = BannerImage;
