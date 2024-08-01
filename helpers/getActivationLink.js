const crypto = require("crypto");

module.exports = { getActivationLink, encryptEmail, decryptEmail };

const algorithm = "aes-256-ctr";
const secretKey = Buffer.from(process.env.CRYPTO_SECRET_KEY, "hex");

// Encrypt user email
function encryptEmail(email) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(email), cipher.final()]);

    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
}

// Decrypt user email
function decryptEmail(hash) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
    ]);

    return decrypted.toString();
}

// Generate activation link
function getActivationLink(email, activationCode) {
    const encodedEmail = encryptEmail(email);
    const emailParam = encodeURIComponent(JSON.stringify(encodedEmail));
    const link = `${process.env.SITE_URL}/login?email=${emailParam}&code=${activationCode}`;

    return link;
}
