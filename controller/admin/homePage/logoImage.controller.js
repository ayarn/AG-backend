const apiResponseHandler = require("utils/apiResponseHandler");
const logoImageService = require("service/admin/homePage/logoImage.service");

module.exports = {
    addLogo,
    editLogo,
    getLogo,
    deleteLogo,
    getAllLogos,
};

// Add logo
async function addLogo(req, res, next) {
    logoImageService
        .addLogo(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit logo
async function editLogo(req, res, next) {
    logoImageService
        .editLogo(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get logo
async function getLogo(req, res, next) {
    logoImageService
        .getLogo(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete logo
async function deleteLogo(req, res, next) {
    logoImageService
        .deleteLogo(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Logos
async function getAllLogos(req, res, next) {
    logoImageService
        .getAllLogos(req)
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
