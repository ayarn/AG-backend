const { S3Client, DeleteObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Initialize the S3 client
const s3 = new S3Client({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
    region: process.env.AWS_REGION,
});

// Upload object
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME || "demoagriguru",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const folder = file.fieldname + "s/";
            cb(null, folder + file.mimetype.split("/")[0] + "-" + Date.now().toString());
        },
    }),
});

// File exist or not
const fileExists = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "demoagriguru",
        Key: key,
    };

    try {
        const command = new HeadObjectCommand(params);
        await s3.send(command);
        // console.log(`File exists: ${key}`);
        return true;
    } catch (err) {
        if (err.name === "NotFound") {
            console.log(`File does not exist: ${key}`);
            return false;
        }
        console.error(`Error checking if file exists: ${err.message}`);
        throw err;
    }
};

// Delete file
const deleteFile = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "demoagriguru",
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        console.log(`File deleted successfully: ${key}`);
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
};

module.exports = { upload, deleteFile, fileExists };
