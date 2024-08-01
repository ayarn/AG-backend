const authService = require("service/web/auth.service");
const apiResponseHandler = require("../../utils/apiResponseHandler");

module.exports = {
    register,
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    checkUserProfileVerification,
    logout,
};

// Register new user
async function register(req, res, next) {
    authService
        .register(req.body, req)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Login user
async function login(req, res, next) {
    authService
        .login(req.body)
        .then((result) => {
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            };

            res.cookie("token", result.token, cookieOptions);

            apiResponseHandler(res, result.status, result.data, {
                message: result.message,
                token: result.token,
            });
        })
        .catch(next);
}

// Forgot password
async function forgotPassword(req, res, next) {
    authService
        .forgotPassword(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Validate entered otp
async function validateOTP(req, res, next) {
    authService
        .validateOTP(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Change user's password
async function changePassword(req, res, next) {
    authService
        .changePassword(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Check user profile is verified or not
async function checkUserProfileVerification(req, res, next) {
    authService
        .checkUserProfileVerification(req.body)
        .then((result) =>
            apiResponseHandler(res, result.status, result.data, { message: result.message })
        )
        .catch(next);
}

// Log out current user
async function logout(req, res, next) {
    authService
        .logout(req.user)
        .then((result) => {
            res.clearCookie("token");
            return apiResponseHandler(res, result.status, result.data, { message: result.message });
        })
        .catch(next);
}
