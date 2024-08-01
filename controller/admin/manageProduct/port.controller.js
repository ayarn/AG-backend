const apiResponseHandler = require("utils/apiResponseHandler");
const portService = require("service/admin/manageProduct/port.service");

module.exports = {
    addPort,
    getPort,
    editPort,
    deletePort,
    getPorts,
    getCountriesList,
};

// Add port
async function addPort(req, res, next) {
    portService
        .addPort(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit port
async function editPort(req, res, next) {
    portService
        .editPort(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get port
async function getPort(req, res, next) {
    portService
        .getPort(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete port
async function deletePort(req, res, next) {
    portService
        .deletePort(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All ports
async function getPorts(req, res, next) {
    portService
        .getPorts(req)
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

// Get All countries
async function getCountriesList(req, res, next) {
    portService
        .getCountriesList(req)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
            })
        )
        .catch(next);
}
