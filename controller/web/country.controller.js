const apiResponseHandler = require("utils/apiResponseHandler");
const countryService = require("service/web/country.service");

module.exports = {
    countryList,
};

// Get countries list
async function countryList(req, res, next) {
    countryService
        .countryList()
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}
