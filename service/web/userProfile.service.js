const User = require("models/web/user.model");
const UserUploadDoc = require("models/admin/userUploadDocs.model");
const Document = require("models/admin/kycDocs.model");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");
const { deleteFile } = require("utils/s3Upload");

module.exports = {
    updateUserProfilePicture,
    getUserProfilePicture,
    updateBasicDetails,
    getBasicDetails,
    updateBusinessDetails,
    getBusinessDetails,
    getRequiredDocsList,
    uploadDocument,
    getMembershipPlanDetails,
};

// Update user profile picture
async function updateUserProfilePicture(image, userId) {
    try {
        if (!image) {
            const error = new Error("Profile picture is required");
            error.status = 400;
            throw error;
        }

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        if (user.profilePicture) {
            // Delete old profile picture
            deleteFile(user.profilePicture);
        }

        user.profilePicture = image?.key;
        await user.save();

        return { status: 200, data: {}, message: "User profile picture updated successfully" };
    } catch (err) {
        throw err;
    }
}

// Get user profile picture
async function getUserProfilePicture(userId) {
    try {
        const userProfilePicture = await User.findById(userId).select("profilePicture");

        if (!userProfilePicture) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        const picture = getCloudFrontUrl(userProfilePicture.profilePicture);

        return { status: 200, data: picture, message: "User profile picture recieved" };
    } catch (err) {
        throw err;
    }
}

// Update basic profile details
async function updateBasicDetails(params, userId) {
    try {
        const { fullName, companyName, email, phone, country, website } = params;

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (companyName) {
            user.companyName = companyName;
        }

        if (email) {
            user.email = email;
        }

        if (phone) {
            user.phone = phone;
        }

        if (country) {
            user.country = country;
        }

        if (website) {
            user.website = website;
        }

        await user.save();

        return { status: 200, data: {}, message: "Basic profile details updated" };
    } catch (err) {
        throw err;
    }
}

// Get basic profile details
async function getBasicDetails(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        const userData = {
            id: user._id,
            fullName: user.fullName,
            companyName: user.companyName,
            email: user.email,
            phone: user.phone,
            country: user.country,
            website: user.website,
        };

        return { status: 200, data: userData, message: "User basic profile details recieved" };
    } catch (err) {
        throw err;
    }
}

// Update business profile details
async function updateBusinessDetails(params, userId) {
    try {
        const { companyName, otherPhone, country, state, city, address } = params;

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        if (companyName) {
            user.companyName = companyName;
        }

        if (otherPhone) {
            user.otherPhone = otherPhone;
        }

        if (country) {
            user.country = country;
        }

        if (state) {
            user.state = state;
        }

        if (city) {
            user.city = city;
        }

        if (address) {
            user.address = address;
        }

        await user.save();

        return { status: 200, data: {}, message: "Business profile details updated" };
    } catch (err) {
        throw err;
    }
}

// Get business profile details
async function getBusinessDetails(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        const userData = {
            id: user._id,
            companyName: user.companyName,
            otherPhone: user.otherPhone,
            country: user.country,
            state: user.state,
            city: user.city,
            address: user.address,
        };

        return { status: 200, data: userData, message: "User basic profile details recieved" };
    } catch (err) {
        throw err;
    }
}

// Get required documents list
async function getRequiredDocsList(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        const userType = user.userType;

        const docsList = await Document.find({ documentType: userType, status: "Active" });

        if (!docsList || !docsList.length === 0) {
            return { status: 200, data: [], message: "Currently documents are not available" };
        }

        return { status: 200, data: docsList, message: "All required documents list" };
    } catch (err) {
        throw err;
    }
}

// Upload document
async function uploadDocument(params, file, userId) {
    try {
        const { docId } = params;

        if (!docId) {
            const error = new Error("Document Id is required");
            error.status = 400;
            throw error;
        }

        if (!file) {
            const error = new Error("Document file is required");
            error.status = 400;
            throw error;
        }

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        const document = await Document.findById(docId);

        if (!document) {
            const error = new Error("Document not exists");
            error.status = 400;
            throw error;
        }

        const documentData = {
            docId: docId,
            documentName: document.documentTitle,
            documentFile: file.key,
            documentStatus: "Pending",
            isSubmitted: true,
        };

        const uploadedDoc = await UserUploadDoc.create(documentData);

        if (!uploadedDoc) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        user.userDocs.push(uploadedDoc._id);
        await user.save();

        return {
            status: 200,
            data: uploadedDoc.documentStatus,
            message: "Document successfully uploaded",
        };
    } catch (err) {
        throw err;
    }
}

// Get user's membership plan details
async function getMembershipPlanDetails(userId) {
    try {
        const user = await User.findById(userId).populate("membershipPlan");
        // console.log(user);

        if (!user) {
            const error = new Error("Invalid user");
            error.status = 400;
            throw error;
        }

        const membershipPlanData = {
            id: user.membershipPlan._id,
            membershipPlan: user.membershipPlan.planName,
            userType: user.userType,
            membershipExpiry: user.membershipExpiry,
            categories: user.categories,
        };

        return {
            status: 200,
            data: membershipPlanData,
            message: "Membership Plan details recieved",
        };
    } catch (err) {
        throw err;
    }
}
