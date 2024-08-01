const apiResponseHandler = require("utils/apiResponseHandler");
const paymentTermService = require("service/admin/manageProduct/paymentTerm.service");

module.exports = {
    addPaymentTerm,
    getPaymentTerm,
    editPaymentTerm,
    deletePaymentTerm,
    getPaymentTerms,
};

// Add Inspection
async function addPaymentTerm(req, res, next) {
    paymentTermService
        .addPaymentTerm(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Inspection
async function editPaymentTerm(req, res, next) {
    paymentTermService
        .editPaymentTerm(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Inspection
async function getPaymentTerm(req, res, next) {
    paymentTermService
        .getPaymentTerm(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Inspection
async function deletePaymentTerm(req, res, next) {
    paymentTermService
        .deletePaymentTerm(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Inspections
async function getPaymentTerms(req, res, next) {
    paymentTermService
        .getPaymentTerms(req)
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
