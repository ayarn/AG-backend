const apiResponseHandler = require("utils/apiResponseHandler");
const portPriceService = require("service/admin/manageProduct/portPrice.service");

module.exports = {
    addPortPrice,
    getPortPrice,
    editPortPrice,
    deletePortPrice,
    getPortPrices,
    getDestinationPorts,
};

// Add port price
async function addPortPrice(req, res, next) {
    portPriceService
        .addPortPrice(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit port price
async function editPortPrice(req, res, next) {
    portPriceService
        .editPortPrice(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get port price
async function getPortPrice(req, res, next) {
    portPriceService
        .getPortPrice(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete port price
async function deletePortPrice(req, res, next) {
    portPriceService
        .deletePortPrice(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All port prices
async function getPortPrices(req, res, next) {
    portPriceService
        .getPortPrices(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
            })
        )
        .catch(next);
}

// Get all destination ports
async function getDestinationPorts(req, res, next) {
    portPriceService
        .getDestinationPorts(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
