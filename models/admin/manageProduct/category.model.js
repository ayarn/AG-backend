const { mongoose, Schema } = require("mongoose");

// Category Schema
const CategorySchema = new Schema({
    categoryName: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
