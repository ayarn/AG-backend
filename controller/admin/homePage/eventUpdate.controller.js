const apiResponseHandler = require("utils/apiResponseHandler");
const eventUpdateService = require("service/admin/homePage/eventUpdate.service");

module.exports = {
    addEvent,
    getEvent,
    editEvent,
    deleteEvent,
    getEvents,
};

// Add Event
async function addEvent(req, res, next) {
    eventUpdateService
        .addEvent(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Event
async function editEvent(req, res, next) {
    eventUpdateService
        .editEvent(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Event
async function getEvent(req, res, next) {
    eventUpdateService
        .getEvent(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Event
async function deleteEvent(req, res, next) {
    eventUpdateService
        .deleteEvent(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Events
async function getEvents(req, res, next) {
    eventUpdateService
        .getEvents(req)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
                pagination: {
                    page: result.page,
                    items_per_page: result.items_per_page,
                    total: result.total,
                },
            })
        )
        .catch(next);
}
