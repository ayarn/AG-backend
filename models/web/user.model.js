const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User schema
const UserSchema = new Schema(
    {
        userType: {
            type: String,
            enum: ["Seller", "Buyer", "Other"],
            required: true,
        },
        categories: {
            type: [String],
        },
        fullName: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        country: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
            required: true,
        },
        otherPhone: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        clientId: {
            type: String,
        },
        ipAddress: {
            type: String,
        },
        website: {
            type: String,
        },
        userDocs: {
            type: [Schema.Types.ObjectId],
        },
        membershipPlan: {
            type: Schema.Types.ObjectId,
            ref: "MembershipPlan",
        },
        membershipExpiry: {
            type: Date,
        },
        otp: {
            type: Number,
        },
        otpCreatedAt: {
            type: Date,
        },
        activationCode: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
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
UserSchema.pre("save", async function (next) {
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
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateToken = async function () {
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

module.exports = mongoose.model("User", UserSchema);
