const { mongoose, Schema } = require("mongoose");

// Media Category Schema
const MediaCategorySchema = new Schema({
    categoryName: {
        type: String,
    },
    categoryType: {
        type: String,
        enum: ["Youtube Video", "Gallery Image"],
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const MediaCategory = mongoose.model("MediaCategory", MediaCategorySchema);

module.exports = MediaCategory;
