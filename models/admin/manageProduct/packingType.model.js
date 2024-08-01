const { mongoose, Schema } = require("mongoose");

// Packing Type Schema
const PackingTypeSchema = new Schema({
    packingTypeName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const PackingType = mongoose.model("PackingType", PackingTypeSchema);

module.exports = PackingType;
