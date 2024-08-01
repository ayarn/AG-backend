const { mongoose, Schema } = require("mongoose");

// Payment Term Schema
const PaymentTermSchema = new Schema({
    paymentTerm: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const PaymentTerm = mongoose.model("PaymentTerm", PaymentTermSchema);

module.exports = PaymentTerm;
