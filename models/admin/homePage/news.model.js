const { mongoose, Schema } = require("mongoose");

// News Schema
const NewsSchema = new Schema({
    newsTitle: {
        type: String,
    },
    newsDescription: {
        type: String,
    },
    newsImage: {
        type: String,
    },
    newsSource: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
