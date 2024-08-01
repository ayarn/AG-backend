const apiResponseHandler = require("utils/apiResponseHandler");
const inspectionService = require("service/admin/manageProduct/inspection.service");

module.exports = {
    addInspection,
    getInspection,
    editInspection,
    deleteInspection,
    getInspections,
};

// Add Inspection
async function addInspection(req, res, next) {
    inspectionService
        .addInspection(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Inspection
async function editInspection(req, res, next) {
    inspectionService
        .editInspection(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Inspection
async function getInspection(req, res, next) {
    inspectionService
        .getInspection(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Inspection
async function deleteInspection(req, res, next) {
    inspectionService
        .deleteInspection(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Inspections
async function getInspections(req, res, next) {
    inspectionService
        .getInspections(req)
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
