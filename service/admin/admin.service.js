const AdminUser = require("models/admin/adminUser.model");
const generateOTP = require("helpers/generateOTP");
const sendOTPEmail = require("helpers/sendOTPEmail");
const jwt = require("jsonwebtoken");

module.exports = {
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    logout,
    getCurrentUser,
};

// Admin login
async function login(params) {
    try {
        const { email, password } = params;

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        if (!password) {
            const error = new Error("Password is required");
            error.status = 400;
            throw error;
        }

        const user = await AdminUser.findOne({ email: email });

        if (!user) {
            const error = new Error("Admin not found");
            error.status = 400;
            throw error;
        }

        const isPasswordMatch = await user.isPasswordCorrect(password);

        if (!isPasswordMatch) {
            const error = new Error("Incorrect Password");
            error.status = 400;
            throw error;
        }

        // Generate JWT token
        const token = await user.generateToken();
        user.token = token;
        await user.save();

        return { status: 200, data: {}, message: "LoggedIn successfully", token: token };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Forgot password
async function forgotPassword(params) {
    try {
        const { email } = params;

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        const user = await AdminUser.findOne({ email: email });

        if (!user) {
            const error = new Error("Email does not exist");
            error.status = 400;
            throw error;
        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP
        user.otp = otp;
        user.otpCreatedAt = Date.now();
        await user.save();

        // Send OTP on email
        await sendOTPEmail(user.email, user.userName, user.otp);

        return { status: 200, data: {}, message: "OTP sent successfully" };
    } catch (err) {
        throw err;
    }
}

// Validate entered OTP
async function validateOTP(params) {
    try {
        const { email, otp } = params;

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        if (!otp) {
            const error = new Error("OTP is required");
            error.status = 400;
            throw error;
        }

        const user = await AdminUser.findOne({ email: email });

        if (!user) {
            const error = new Error("Email does not exist");
            error.status = 400;
            throw error;
        }

        if (parseInt(otp) !== user.otp) {
            const error = new Error("Invalid OTP. Please try again.");
            error.status = 400;
            throw error;
        }

        const otpTimeDuration = Math.abs(Date.parse(user.otpCreatedAt) - Date.now());

        if (otpTimeDuration > process.env.OTP_EXPIRY) {
            const error = new Error("OTP has been expired");
            error.status = 400;
            throw error;
        }

        return { status: 200, data: {}, message: "success" };
    } catch (err) {
        throw err;
    }
}

// Change admin new password
async function changePassword(params) {
    try {
        const { email, newPassword } = params;

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        if (!newPassword) {
            const error = new Error("New password is required");
            error.status = 400;
            throw error;
        }

        const user = await AdminUser.findOne({ email: email });

        if (!user) {
            const error = new Error("Email does not exist");
            error.status = 400;
            throw error;
        }

        const isPasswordMatch = await user.isPasswordCorrect(newPassword);

        if (isPasswordMatch) {
            const error = new Error("New password can't be your current password");
            error.status = 400;
            throw error;
        }

        // Saving new password
        user.password = newPassword;
        await user.save();

        return { status: 200, data: {}, message: "Password successfully changed" };
    } catch (err) {
        throw err;
    }
}

// Logout current user
async function logout(user) {
    try {
        if (user) {
            return { status: 200, data: {}, message: "User successfully logged out" };
        }
    } catch (err) {
        throw err;
    }
}

// Get current user
async function getCurrentUser(params) {
    try {
        const { token } = params;

        if (!token) {
            const error = new Error("Token is required !");
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

        return { status: 200, data: user, message: "Current user recieved" };
    } catch (err) {
        throw err;
    }
}
