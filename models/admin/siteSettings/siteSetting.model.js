const { mongoose, Schema } = require("mongoose");

// Site Setting Schema
const SiteSettingSchema = new Schema({
    siteLogo: {
        type: String,
    },
    siteFavicon: {
        type: String,
    },
    contactNumber1: {
        type: Number,
    },
    contactNumber2: {
        type: Number,
    },
    email: {
        type: String,
    },
    faceBook: {
        type: String,
    },
    twitterX: {
        type: String,
    },
    instaGram: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    youTube: {
        type: String,
    },
    playStore: {
        type: String,
    },
    appStore: {
        type: String,
    },
    copyRightText: {
        type: String,
    },
});

const SiteSetting = mongoose.model("SiteSetting", SiteSettingSchema);

module.exports = SiteSetting;
