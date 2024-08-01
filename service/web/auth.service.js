const User = require("models/web/user.model");
const MembershipPlan = require("models/admin/membershipPlan.model");
const getIpAddress = require("helpers/getIpAddress");
const sendUserProfileActivationEmail = require("helpers/sendUserProfileActivationEmail");
const generateOTP = require("helpers/generateOTP");
const sendOTPEmail = require("helpers/sendOTPEmail");
const { generateActivationCode } = require("helpers/generateActivationCode");
const { decryptEmail } = require("helpers/getActivationLink");
const generateClientId = require("helpers/generateClientId");

module.exports = {
    register,
    login,
    forgotPassword,
    validateOTP,
    changePassword,
    checkUserProfileVerification,
    logout,
};

// Register a new user
async function register(params, req) {
    try {
        const { userType, categories, fullName, companyName, email, country, phone, password } =
            params;

        if (!userType) {
            const error = new Error("User type is required");
            error.status = 400;
            throw error;
        }

        if (!fullName) {
            const error = new Error("Full name is required");
            error.status = 400;
            throw error;
        }

        if (!companyName) {
            const error = new Error("Company name is required");
            error.status = 400;
            throw error;
        }

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        if (!country) {
            const error = new Error("Country is required");
            error.status = 400;
            throw error;
        }

        if (!phone) {
            const error = new Error("Contact number is required");
            error.status = 400;
            throw error;
        }

        if (!password) {
            const error = new Error("Password is required");
            error.status = 400;
            throw error;
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            const error = new Error("User already exists");
            error.status = 409;
            throw error;
        }

        const ipAddress = getIpAddress(req);

        // Generate and assign client id
        const userCount = await User.countDocuments();
        const clientId = generateClientId(userCount);

        // Assign default membership plan
        const membership = await MembershipPlan.findOne({ isDefaultPlan: true });
        const planExpiry = new Date();
        planExpiry.setFullYear(planExpiry.getFullYear() + 1);

        const userData = {
            userType: userType,
            categories: categories,
            fullName: fullName,
            companyName: companyName,
            email: email,
            country: country,
            phone: phone,
            password: password,
            ipAddress: ipAddress,
            clientId: clientId,
            membershipPlan: membership._id,
            membershipExpiry: planExpiry,
        };

        const user = await User.create(userData);

        if (!user) {
            const error = new Error("Unable to create user");
            error.status = 500;
            throw error;
        }

        const activationCode = generateActivationCode();

        user.activationCode = activationCode;
        await user.save();

        // Send user profile activation email
        await sendUserProfileActivationEmail(email, fullName, activationCode);

        return { status: 201, data: {}, message: "User registered successfully" };
    } catch (err) {
        throw err;
    }
}

// User login
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

        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error("User does not exist");
            error.status = 400;
            throw error;
        }

        const isPasswordMatch = await user.isPasswordCorrect(password);

        if (!isPasswordMatch) {
            const error = new Error("Incorrect Password");
            error.status = 400;
            throw error;
        }

        if (!user.isVerified) {
            const error = new Error("User profile is not verified");
            error.status = 400;
            throw error;
        }

        // Generate JWT token
        const token = await user.generateToken();
        user.token = token;
        await user.save();

        return { status: 200, data: {}, message: "User loggedIn successfully", token: token };
    } catch (err) {
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

        const user = await User.findOne({ email: email });

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
        await sendOTPEmail(user.email, user.fullName, user.otp);

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

        const user = await User.findOne({ email: email });

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

// Change users new password
async function changePassword(params) {
    try {
        const { email, newPassword } = params;

        if (!email) {
            const error = new Error("Email is required");
            error.status = 400;
            throw error;
        }

        if (!email || !newPassword) {
            const error = new Error("New password is required");
            error.status = 400;
            throw error;
        }

        const user = await User.findOne({ email: email });

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

// Check user profile is verified or not
async function checkUserProfileVerification(params) {
    try {
        const { emailParam, codeParam } = params;

        if (emailParam && codeParam) {
            const email = decryptEmail(JSON.parse(emailParam));

            const user = await User.findOne({ email: email });

            if (!user) {
                const error = new Error("Email does not exist");
                error.status = 400;
                throw error;
            }

            if (user.isVerified) return { status: 200, data: {}, message: "Verified user" };

            if (user.activationCode !== codeParam) {
                const error = new Error("Invalid activation code");
                error.status = 400;
                throw error;
            }

            user.isVerified = true;
            await user.save();

            return { status: 200, data: {}, message: "Verified user" };
        }
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
