const { mongoose, Schema } = require("mongoose");

// Header Tagline Schema
const HeaderTaglineSchema = new Schema({
    title: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const HeaderTagline = mongoose.model("HeaderTagline", HeaderTaglineSchema);

module.exports = HeaderTagline;
