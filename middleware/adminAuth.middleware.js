const jwt = require("jsonwebtoken");
const AdminUser = require("models/admin/adminUser.model");

module.exports = auth;

// Admin authentication middleware
async function auth(req, _, next) {
    try {
        let token = ''
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            const error = new Error("Token missing !");
            error.status = 404;
            throw error;
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await AdminUser.findById(decodedToken?._id).select("-password");

        if (!user) {
            const error = new Error("Unauthorized user");
            error.status = 401;
            throw error;
        }

        req.token = token;
        // current user
        req.user = user;
        next();
    } catch (err) {
        throw err;
    }
};
