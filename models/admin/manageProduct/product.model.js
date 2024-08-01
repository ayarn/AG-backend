const { mongoose, Schema } = require("mongoose");

// Product Schema
const ProductSchema = new Schema({
    productCode: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    origin: {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
    productName: {
        type: String,
    },
    hsnCode: {
        type: Number,
    },
    productImage: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    loadingPort: {
        type: Schema.Types.ObjectId,
        ref: "Port",
    },
    destinationPort: [
        {
            type: Schema.Types.ObjectId,
            ref: "Port",
        },
    ],
    containerSize: [
        {
            container: {
                type: Schema.Types.ObjectId,
                ref: "Container",
            },
            weight: {
                type: Number,
            },
        },
    ],
    packingType: {
        type: Schema.Types.ObjectId,
        ref: "PackingType",
    },
    productBrand: [
        {
            type: Schema.Types.ObjectId,
            ref: "ProductBrand",
        },
    ],
    shipmentPeriod: {
        type: String,
    },
    paymentTerm: [
        {
            type: Schema.Types.ObjectId,
            ref: "PaymentTerm",
        },
    ],
    quantity: {
        type: Number,
    },
    insurance: {
        type: String,
    },
    inspection: [
        {
            type: Schema.Types.ObjectId,
            ref: "Inspection",
        }
    ],
    document: [
        {
            type: Schema.Types.ObjectId,
            ref: "ProductDocument",
        },
    ],
    fob: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
