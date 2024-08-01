const { mongoose, Schema } = require("mongoose");

// Port Schema
const PortSchema = new Schema({
    portName: {
        type: String,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Port = mongoose.model("Port", PortSchema);

module.exports = Port;
