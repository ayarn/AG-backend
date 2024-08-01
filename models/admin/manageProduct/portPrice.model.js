const { mongoose, Schema } = require("mongoose");

// Port Price Schema
const PortPriceSchema = new Schema({
    loadingPort: {
        type: Schema.Types.ObjectId,
        ref: "Port",
    },
    destinationPort: {
        type: Schema.Types.ObjectId,
        ref: "Port",
    },
    prices: [
        {
            containerSize: {
                type: Schema.Types.ObjectId,
                ref: "Container",
            },
            price: {
                type: Number,
            },
        },
    ],
});

const PortPrice = mongoose.model("PortPrice", PortPriceSchema);

module.exports = PortPrice;
