// API response handler
const apiResponseHandler = (res, statusCode, data, meta) => {
    res.status(statusCode).json({
        status: statusCode,
        data: data,
        meta: meta,
    });
};

module.exports = apiResponseHandler;
