const apiResponseHandler = require("utils/apiResponseHandler");
const containerService = require("service/admin/manageProduct/container.service");

module.exports = {
    addContainer,
    getContainer,
    editContainer,
    deleteContainer,
    getContainers,
};

// Add Container
async function addContainer(req, res, next) {
    containerService
        .addContainer(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Container
async function editContainer(req, res, next) {
    containerService
        .editContainer(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Container
async function getContainer(req, res, next) {
    containerService
        .getContainer(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Container
async function deleteContainer(req, res, next) {
    containerService
        .deleteContainer(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Containers
async function getContainers(req, res, next) {
    containerService
        .getContainers(req)
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
