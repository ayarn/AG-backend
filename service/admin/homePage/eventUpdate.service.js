const Event = require("models/admin/homePage/event.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addEvent,
    getEvent,
    editEvent,
    deleteEvent,
    getEvents,
};

// Add new event
async function addEvent(params, image) {
    try {
        const {
            eventTitle,
            eventStartDate,
            eventEndDate,
            eventLocation,
            eventDescription,
            status,
        } = params;

        if (!eventTitle) {
            const error = new Error("Event Title is required");
            error.status = 400;
            throw error;
        }

        if (!eventStartDate) {
            const error = new Error("Event start date is required");
            error.status = 400;
            throw error;
        }

        if (!eventEndDate) {
            const error = new Error("Event end date is required");
            error.status = 400;
            throw error;
        }

        if (!eventLocation) {
            const error = new Error("Event location is required");
            error.status = 400;
            throw error;
        }

        if (!eventDescription) {
            const error = new Error("Event Description is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Event image is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const eventData = {
            eventTitle,
            eventDescription,
            eventStartDate,
            eventEndDate,
            eventLocation,
            eventImage: image.key,
            status,
        };

        const event = await Event.create(eventData);

        if (!event) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Event successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit event
async function editEvent(params, image) {
    try {
        const {
            id,
            eventTitle,
            eventStartDate,
            eventEndDate,
            eventLocation,
            eventDescription,
            status,
        } = params;

        if (!id) {
            const error = new Error("Event Id is required");
            error.status = 400;
            throw error;
        }

        const event = await Event.findById(id);

        if (!event) {
            const error = new Error("Event not found");
            error.status = 400;
            throw error;
        }

        if (eventTitle) {
            event.eventTitle = eventTitle;
        }

        if (eventStartDate) {
            event.eventStartDate = eventStartDate;
        }

        if (eventEndDate) {
            event.eventEndDate = eventEndDate;
        }

        if (eventDescription) {
            event.eventDescription = eventDescription;
        }

        if (eventLocation) {
            event.eventLocation = eventLocation;
        }

        if (image) {
            // Delete old image first
            deleteFile(event.eventImage);

            // Replace new image
            event.eventImage = image.key;
        }

        if (status) {
            event.status = status;
        }

        await event.save();

        return { status: 200, data: event, message: "Event successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get event
async function getEvent(params) {
    try {
        const { id } = params;
    
        if (!id) {
            const error = new Error("Event Id is required");
            error.status = 400;
            throw error;
        }
    
        const event = await Event.findById(id);
    
        if (!event) {
            const error = new Error("Event not found");
            error.status = 400;
            throw error;
        }
    
        const eventData = {
            id: id,
            eventTitle: event.eventTitle,
            eventStartDate: event.eventStartDate,
            eventEndDate: event.eventEndDate,
            eventDescription: event.eventDescription,
            eventLocation: event.eventLocation,
            eventImage: getCloudFrontUrl(event.eventImage),
            status: event.status,
        };
    
        return { status: 200, data: eventData, message: "Event received" };
    } catch (err) {
        throw err;       
    }
}

// Delete event
async function deleteEvent(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Event Id is required");
            error.status = 400;
            throw error;
        }

        const deletedEvent = await Event.findOneAndDelete({ _id: id });

        if (!deletedEvent) {
            const error = new Error("Event not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedEvent.eventImage);

        return { status: 200, data: deletedEvent, message: "Event successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all event
async function getEvents(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { eventTitle: { $regex: search, $options: "i" } };
        }

        const events = await Event.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!events || events.length === 0) {
            return { status: 200, data: [], message: "Currently events are not available" };
        }

        const allEvents = events.map((event) => ({
            id: event._id,
            eventTitle: event.eventTitle,
            eventStartDate: event.eventStartDate,
            eventEndDate: event.eventEndDate,
            eventDescription: event.eventDescription,
            eventLocation: event.eventLocation,
            eventImage: getCloudFrontUrl(event.eventImage),
            status: event.status,
        }));

        return {
            status: 200,
            data: allEvents,
            message: "Events successfully received",
            page,
            items_per_page,
            total: allEvents.length,
        };
    } catch (err) {
        throw err;
    }
}
