const PackingType = require("models/admin/manageProduct/packingType.model");

module.exports = {
    addPackingType,
    getPackingType,
    editPackingType,
    deletePackingType,
    getAllPackingTypes,
};

// Add new packing type
async function addPackingType(params) {
    try {
        const { packingTypeName, status } = params;

        if (!packingTypeName) {
            const error = new Error("Packing type name is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const packingTypeData = {
            packingTypeName,
            status,
        };

        const packingType = await PackingType.create(packingTypeData);

        if (!packingType) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Packing type successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit packing type
async function editPackingType(params) {
    try {
        const { id, packingTypeName, status } = params;

        if (!id) {
            const error = new Error("Packing type Id is required");
            error.status = 400;
            throw error;
        }

        const packingType = await PackingType.findById(id);

        if (!packingType) {
            const error = new Error("Packing Type not found");
            error.status = 400;
            throw error;
        }

        if (packingTypeName) {
            packingType.packingTypeName = packingTypeName;
        }

        if (status) {
            packingType.status = status;
        }

        await packingType.save();

        return { status: 200, data: packingType, message: "Packing Type successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get packing type
async function getPackingType(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Packing Type Id is required");
        error.status = 400;
        throw error;
    }

    const packingType = await PackingType.findById(id);

    if (!packingType) {
        const error = new Error("Packing Type not found");
        error.status = 400;
        throw error;
    }

    const newPackingTypeData = {
        id: packingType._id,
        packingTypeName: packingType.packingTypeName,
        status: packingType.status,
    };

    return { status: 200, data: newPackingTypeData, message: "Packing type received" };
}

// Delete packing type
async function deletePackingType(params) {
    try {
        const { id } = params;

        const deletedPackingType = await PackingType.findOneAndDelete({ _id: id });

        if (!deletedPackingType) {
            const error = new Error("Packing type not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedPackingType,
            message: "Packing type successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all packing types
async function getAllPackingTypes(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { packingTypeName: { $regex: search, $options: "i" } };
        }

        const packingTypes = await PackingType.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!packingTypes || packingTypes.length === 0) {
            return { status: 200, data: [], message: "Currently packing types are not available" };
        }

        const allPackingType = [];

        for (let packingType of packingTypes) {
            const newsData = {
                id: packingType._id,
                packingTypeName: packingType.packingTypeName,
                status: packingType.status,
            };

            allPackingType.push(newsData);
        }

        return {
            status: 200,
            data: allPackingType,
            message: "Pcking types successfully received",
            page,
            items_per_page,
            total: packingTypes.length,
        };
    } catch (err) {
        throw err;
    }
}
