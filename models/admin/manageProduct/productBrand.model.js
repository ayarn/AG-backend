const { mongoose, Schema } = require("mongoose");

// Product Brand Schema
const ProductBrandSchema = new Schema({
    brandName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const ProductBrand = mongoose.model("ProductBrand", ProductBrandSchema);

module.exports = ProductBrand;
