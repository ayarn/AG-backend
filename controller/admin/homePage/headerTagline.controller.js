const apiResponseHandler = require("utils/apiResponseHandler");
const headerTaglineService = require("service/admin/homePage/headerTagline.service");

module.exports = {
    addHeaderTagline,
    getHeaderTagline,
    editHeaderTagline,
    deleteHeaderTagline,
    getHeaderTaglines,
};

// Add Header Tagline
async function addHeaderTagline(req, res, next) {
    headerTaglineService
        .addHeaderTagline(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Header Tagline
async function editHeaderTagline(req, res, next) {
    headerTaglineService
        .editHeaderTagline(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Header Tagline
async function getHeaderTagline(req, res, next) {
    headerTaglineService
        .getHeaderTagline(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Header Tagline
async function deleteHeaderTagline(req, res, next) {
    headerTaglineService
        .deleteHeaderTagline(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Header Taglines
async function getHeaderTaglines(req, res, next) {
    headerTaglineService
        .getHeaderTaglines(req)
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
