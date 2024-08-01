const { fileExists } = require("../utils/s3Upload");

module.exports = getCloudFrontUrl;

// Generate cloudfront public url
function getCloudFrontUrl(key) {
    let url = "";

    if (fileExists(key)) {
        url = process.env.CLOUDFRONT_URL + "/" + key;
    }

    return url;
}
