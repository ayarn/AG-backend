const apiResponseHandler = require("utils/apiResponseHandler");
const productBrandService = require("service/admin/manageProduct/productBrand.service");

module.exports = {
    addProductBrand,
    getProductBrand,
    editProductBrand,
    deleteProductBrand,
    getProductBrands,
};

// Add Product Brand
async function addProductBrand(req, res, next) {
    productBrandService
        .addProductBrand(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Edit Product Brand
async function editProductBrand(req, res, next) {
    productBrandService
        .editProductBrand(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get Product Brand
async function getProductBrand(req, res, next) {
    productBrandService
        .getProductBrand(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Delete Product Brand
async function deleteProductBrand(req, res, next) {
    productBrandService
        .deleteProductBrand(req.params)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Get All Product Brands
async function getProductBrands(req, res, next) {
    productBrandService
        .getProductBrands(req)
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
