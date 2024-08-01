const apiResponseHandler = require("utils/apiResponseHandler");
const adminService = require("service/admin/admin.service");

module.exports = {
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    logout,
    getCurrentUser,
};

// Admin login
async function login(req, res, next) {
    adminService
        .login(req.body)
        .then((result) => {
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            };

            // res.cookie("jwtoken", result.token, cookieOptions);
            res.setHeader("Authorization", `Bearer ${result.token}`);

            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
                token: result.token,
            });
        })
        .catch(next);
}

// Admin forgot password
async function forgotPassword(req, res, next) {
    adminService
        .forgotPassword(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Validate entered otp
async function validateOTP(req, res, next) {
    adminService
        .validateOTP(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Change admin's password
async function changePassword(req, res, next) {
    adminService
        .changePassword(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Logout current user
async function logout(req, res, next) {
    adminService
        .logout(req.user)
        .then((result) => {
            res.clearCookie("jwtoken");
            return apiResponseHandler(res, result.status, result.data, { message: result.message });
        })
        .catch(next);
}

// Get current user
async function getCurrentUser(req, res, next) {
    adminService
        .getCurrentUser(req.body)
        .then((result) => {
            return apiResponseHandler(res, result.status, result.data, { message: result.message });
        })
        .catch(next);
}
