const { mongoose, Schema } = require("mongoose");

const AgriguruUpdateSchema = new Schema({
    flyerTitle: {
        type: String,
    },
    flyerDescription: {
        type: String,
    },
    imageType: {
        type: String,
        enum: ["Image", "GIF"],
    },
    flyerImage: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Page", "Link"],
    },
    pageDescription: {
        type: String,
    },
    link: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const AgriguruUpdate = mongoose.model("AgriguruUpdate", AgriguruUpdateSchema);

module.exports = AgriguruUpdate;
