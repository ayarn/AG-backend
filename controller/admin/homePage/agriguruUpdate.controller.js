const apiResponseHandler = require("utils/apiResponseHandler");
const agriguruUpdateService = require("service/admin/homePage/agriguruUpdate.service");

module.exports = {
    addAgriguruUpdate,
    getAgriguruUpdate,
    editAgriguruUpdate,
    deleteAgriguruUpdate,
    getAllAgriguruUpdates,
};

// Add Agriguru update
async function addAgriguruUpdate(req, res, next) {
    agriguruUpdateService
        .addAgriguruUpdate(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Agriguru update
async function editAgriguruUpdate(req, res, next) {
    agriguruUpdateService
        .editAgriguruUpdate(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Agriguru update
async function getAgriguruUpdate(req, res, next) {
    agriguruUpdateService
        .getAgriguruUpdate(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Agriguru update
async function deleteAgriguruUpdate(req, res, next) {
    agriguruUpdateService
        .deleteAgriguruUpdate(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Agriguru updates
async function getAllAgriguruUpdates(req, res, next) {
    agriguruUpdateService
        .getAllAgriguruUpdates(req)
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
