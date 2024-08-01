const userProfileService = require("service/web/userProfile.service");
const apiResponseHandler = require("utils/apiResponseHandler");

module.exports = {
    updateUserProfilePicture,
    getUserProfilePicture,
    updateBasicDetails,
    getBasicDetails,
    updateBusinessDetails,
    getBusinessDetails,
    getRequiredDocsList,
    uploadDocument,
    getMembershipPlanDetails,
};

// Update user profile picture
async function updateUserProfilePicture(req, res, next) {
    userProfileService
        .updateUserProfilePicture(req.file, req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get user profile picture
async function getUserProfilePicture(req, res, next) {
    userProfileService
        .getUserProfilePicture(req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Update basic details
async function updateBasicDetails(req, res, next) {
    userProfileService
        .updateBasicDetails(req.body, req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get basic details
async function getBasicDetails(req, res, next) {
    userProfileService
        .getBasicDetails(req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Update business details
async function updateBusinessDetails(req, res, next) {
    userProfileService
        .updateBusinessDetails(req.body, req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get business details
async function getBusinessDetails(req, res, next) {
    userProfileService
        .getBusinessDetails(req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get required documents list
async function getRequiredDocsList(req, res, next) {
    userProfileService
        .getRequiredDocsList(req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Upload document
async function uploadDocument(req, res, next) {
    userProfileService
        .uploadDocument(req.body, req.file, req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get membership plan details
async function getMembershipPlanDetails(req, res, next) {
    userProfileService
        .getMembershipPlanDetails(req.user._id)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
