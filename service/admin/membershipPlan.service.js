const MembershipPlan = require("models/admin/membershipPlan.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addMembershipPlan,
    getMembershipPlan,
    editMembershipPlan,
    deleteMembershipPlan,
    getMembershipPlans,
};

// Add new Membership Plan
async function addMembershipPlan(params, image) {
    try {
        const { planName, discount, allowedProducts, isDefaultPlan, status } = params;

        if (!planName) {
            const error = new Error("Plan name is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Image is required");
            error.status = 400;
            throw error;
        }

        if (!discount) {
            const error = new Error("Discount is required");
            error.status = 400;
            throw error;
        }

        if (!allowedProducts) {
            const error = new Error("Allowed products is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        if (isDefaultPlan) {
            await MembershipPlan.updateMany({}, { $set: { isDefaultPlan: false } });
        }

        const membershipPlanData = {
            planName,
            planImage: image.key,
            discount,
            allowedProducts,
            isDefaultPlan,
            status,
        };

        const membership = await MembershipPlan.create(membershipPlanData);

        if (!membership) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Membership Plan successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit Membership Plan
async function editMembershipPlan(params, image) {
    try {
        const { id, planName, discount, allowedProducts, isDefaultPlan, status } = params;

        if (!id) {
            const error = new Error("Plan Id is required");
            error.status = 400;
            throw error;
        }

        const membership = await MembershipPlan.findById(id);

        if (!membership) {
            const error = new Error("Membership plan not found");
            error.status = 400;
            throw error;
        }

        if (planName) {
            membership.planName = planName;
        }

        if (discount) {
            membership.discount = discount;
        }

        if (allowedProducts) {
            membership.allowedProducts = allowedProducts;
        }

        if (isDefaultPlan) {
            await MembershipPlan.updateMany({}, { $set: { isDefaultPlan: false } });
            membership.isDefaultPlan = isDefaultPlan;
        }

        if (image) {
            // Delete old image first
            deleteFile(membership.planImage);

            // Replace new image
            membership.planImage = image.key;
        }

        if (status) {
            membership.status = status;
        }

        await membership.save();

        return { status: 200, data: membership, message: "Membership plan successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get Membership Plan
async function getMembershipPlan(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Membership Id is required");
        error.status = 400;
        throw error;
    }

    const membership = await MembershipPlan.findById(id);

    if (!membership) {
        const error = new Error("Membership plan not found");
        error.status = 400;
        throw error;
    }

    const membershipPlanData = {
        id: id,
        planName: membership.planName,
        discount: membership.discount,
        allowedProducts: membership.allowedProducts,
        isDefaultPlan: membership.isDefaultPlan,
        planImage: getCloudFrontUrl(membership.planImage),
        status: membership.status,
    };

    return { status: 200, data: membershipPlanData, message: "Membership plan received" };
}

// Delete Membership Plan
async function deleteMembershipPlan(params) {
    try {
        const { id } = params;

        const deletedMembershipPlan = await MembershipPlan.findOneAndDelete({ _id: id });

        if (!deletedMembershipPlan) {
            const error = new Error("Membership plan not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedMembershipPlan.planImage);

        return {
            status: 200,
            data: deletedMembershipPlan,
            message: "Membership plan successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all Membership Plans
async function getMembershipPlans(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { planName: { $regex: search, $options: "i" } };
        }

        const membershipPlans = await MembershipPlan.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!membershipPlans || membershipPlans.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently membership plans are not available",
            };
        }

        const allMembershipPlans = [];

        for (let membership of membershipPlans) {
            const membershipData = {
                id: membership._id,
                planName: membership.planName,
                discount: membership.discount,
                allowedProducts: membership.allowedProducts,
                isDefaultPlan: membership.isDefaultPlan,
                photo: getCloudFrontUrl(membership.planImage),
                status: membership.status,
            };

            allMembershipPlans.push(membershipData);
        }

        return {
            status: 200,
            data: allMembershipPlans,
            message: "Membership Plans successfully received",
            page,
            items_per_page,
            total: allMembershipPlans.length,
        };
    } catch (err) {
        throw err;
    }
}
