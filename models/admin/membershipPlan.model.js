const { mongoose, Schema } = require("mongoose");

// Membership Plan Schema
const MembershipPlanSchema = new Schema({
    planName: {
        type: String,
    },
    planImage: {
        type: String,
    },
    discount: {
        type: Number,
    },
    allowedProducts: {
        type: Number,
    },
    isDefaultPlan: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const MembershipPlan = mongoose.model("MembershipPlan", MembershipPlanSchema);

module.exports = MembershipPlan;
