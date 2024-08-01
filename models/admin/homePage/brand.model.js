const { mongoose, Schema } = require("mongoose");

// Brand Schema
const BrandSchema = new Schema({
    brandTitle: {
        type: String,
    },
    brandImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
