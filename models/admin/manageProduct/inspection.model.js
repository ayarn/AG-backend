const { mongoose, Schema } = require("mongoose");

// Inspection Schema
const InspectionSchema = new Schema({
    inspectionName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Inspection = mongoose.model("Inspection", InspectionSchema);

module.exports = Inspection;
