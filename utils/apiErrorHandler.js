// // API error handler
module.exports = apiErrorHandler;

function apiErrorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({ status: statusCode, message });
}
