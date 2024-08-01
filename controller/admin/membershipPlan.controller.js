const apiResponseHandler = require("utils/apiResponseHandler");
const membershipPlanService = require("service/admin/membershipPlan.service");

module.exports = {
    addMembershipPlan,
    getMembershipPlan,
    editMembershipPlan,
    deleteMembershipPlan,
    getMembershipPlans,
};

// Add Membership Plan
async function addMembershipPlan(req, res, next) {
    membershipPlanService
        .addMembershipPlan(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Membership Plan
async function editMembershipPlan(req, res, next) {
    membershipPlanService
        .editMembershipPlan(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Membership Plan
async function getMembershipPlan(req, res, next) {
    membershipPlanService
        .getMembershipPlan(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Membership Plan
async function deleteMembershipPlan(req, res, next) {
    membershipPlanService
        .deleteMembershipPlan(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Membership Plans
async function getMembershipPlans(req, res, next) {
    membershipPlanService
        .getMembershipPlans(req)
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
