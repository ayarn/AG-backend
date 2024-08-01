const crypto = require("crypto");

module.exports = generateOTP;

// Generate random 6 digit otp
function generateOTP() {
    const buffer = crypto.randomBytes(3);
    const otp = parseInt(buffer.toString("hex"), 16) % 1000000;
    return otp.toString().padStart(6, "0");
}
