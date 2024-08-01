const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin user schema
const AdminUserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Admin", "SubAdmin"],
        },
        otp: {
            type: Number,
        },
        otpCreatedAt: {
            type: Date,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Change modified password
AdminUserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const hashedPassword = await bcrypt.hash(this.password, 10);

        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
    }
});

// Compare and match password
AdminUserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
AdminUserSchema.methods.generateToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY,
        }
    );
};

module.exports = mongoose.model("AdminUser", AdminUserSchema);
