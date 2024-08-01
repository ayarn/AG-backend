const { mongoose, Schema } = require("mongoose");

// Event Schema
const EventSchema = new Schema({
    eventTitle: {
        type: String,
    },
    eventStartDate: {
        type: Date,
    },
    eventEndDate: {
        type: Date,
    },
    eventLocation: {
        type: String,
    },
    eventDescription: {
        type: String,
    },
    eventImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
    },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
