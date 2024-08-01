const { mongoose, Schema } = require("mongoose");

// Container Schema
const ContainerSchema = new Schema({
    containerSize: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Container = mongoose.model("Container", ContainerSchema);

module.exports = Container;
