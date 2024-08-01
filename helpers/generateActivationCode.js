const crypto = require("crypto");

module.exports = {
    generateActivationCode,
};

function generateActivationCode() {
    return crypto.randomBytes(8).toString("hex");
}
