const apiResponseHandler = require("utils/apiResponseHandler");
const siteSettingService = require("service/admin/siteSettings/siteSetting.service");

module.exports = {
    addSiteSetting,
    editSiteSetting,
    getSiteSetting,
};

// Add Site Setting
async function addSiteSetting(req, res, next) {
    siteSettingService
        .addSiteSetting(req.body, req.files)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Site Setting
async function editSiteSetting(req, res, next) {
    siteSettingService
        .editSiteSetting(req.body, req.files)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Site Setting
async function getSiteSetting(req, res, next) {
    siteSettingService
        .getSiteSetting()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
