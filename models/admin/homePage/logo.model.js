const { mongoose, Schema } = require("mongoose");

// Logo Images Schema
const LogoSchema = new Schema({
    logoTitle: {
        type: String,
    },
    logoDescription: {
        type: String,
    },
    logoImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Logo = mongoose.model("Logo", LogoSchema);

module.exports = Logo;
