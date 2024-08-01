module.exports = getIpAddress;

function getIpAddress(req) {
    let ipAddress = "";

    if (req.headers["x-forwarded-for"]) {
        ipAddress = req.headers["x-forwarded-for"].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ipAddress = req.connection.remoteAddress;
    } else {
        ipAddress = req.ip;
    }

    return ipAddress;
}
