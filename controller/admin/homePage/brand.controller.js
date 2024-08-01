const apiResponseHandler = require("utils/apiResponseHandler");
const brandService = require("service/admin/homePage/brand.service");

module.exports = {
    addBrand,
    getBrand,
    editBrand,
    deleteBrand,
    getBrands,
};

// Add Brand
async function addBrand(req, res, next) {
    brandService
        .addBrand(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Brand
async function editBrand(req, res, next) {
    brandService
        .editBrand(req.body, req.file)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Brand
async function getBrand(req, res, next) {
    brandService
        .getBrand(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Brand
async function deleteBrand(req, res, next) {
    brandService
        .deleteBrand(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Brands
async function getBrands(req, res, next) {
    brandService
        .getBrands(req)
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
