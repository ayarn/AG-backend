const apiResponseHandler = require("utils/apiResponseHandler");
const packingTypeService = require("service/admin/manageProduct/packingType.service");

module.exports = {
    addPackingType,
    getPackingType,
    editPackingType,
    deletePackingType,
    getAllPackingTypes,
};

// Add Packing Type
async function addPackingType(req, res, next) {
    packingTypeService
        .addPackingType(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Packing Type
async function editPackingType(req, res, next) {
    packingTypeService
        .editPackingType(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Packing Type
async function getPackingType(req, res, next) {
    packingTypeService
        .getPackingType(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Packing Type
async function deletePackingType(req, res, next) {
    packingTypeService
        .deletePackingType(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Packing Types
async function getAllPackingTypes(req, res, next) {
    packingTypeService
        .getAllPackingTypes(req)
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
