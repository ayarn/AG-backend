const Inspection = require("models/admin/manageProduct/inspection.model");

module.exports = {
    addInspection,
    getInspection,
    editInspection,
    deleteInspection,
    getInspections,
};

// Add new inspection
async function addInspection(params) {
    try {
        const { inspectionName, status } = params;

        if (!inspectionName) {
            const error = new Error("Inspection name is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const inspectionData = {
            inspectionName,
            status,
        };

        const inspection = await Inspection.create(inspectionData);

        if (!inspection) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Inspection successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit inspection
async function editInspection(params) {
    try {
        const { id, inspectionName, status } = params;

        if (!id) {
            const error = new Error("Inspection Id is required");
            error.status = 400;
            throw error;
        }

        const inspection = await Inspection.findById(id);

        if (!inspection) {
            const error = new Error("Inspection not found");
            error.status = 400;
            throw error;
        }

        if (inspectionName) {
            inspection.inspectionName = inspectionName;
        }

        if (status) {
            inspection.status = status;
        }

        await inspection.save();

        return { status: 200, data: inspection, message: "Inspection successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get inspection
async function getInspection(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Inspection Id is required");
        error.status = 400;
        throw error;
    }

    const inspection = await Inspection.findById(id);

    if (!inspection) {
        const error = new Error("Inspection not found");
        error.status = 400;
        throw error;
    }

    const inspectionData = {
        id: inspection._id,
        inspectionName: inspection.inspectionName,
        status: inspection.status,
    };

    return { status: 200, data: inspectionData, message: "Inspection received" };
}

// Delete inspection
async function deleteInspection(params) {
    try {
        const { id } = params;

        const deletedInspection = await Inspection.findOneAndDelete({ _id: id });

        if (!deletedInspection) {
            const error = new Error("Inspection not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedInspection,
            message: "Inspection successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all inspections
async function getInspections(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { inspectionName: { $regex: search, $options: "i" } };
        }

        const inspections = await Inspection.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!inspections || inspections.length === 0) {
            return { status: 200, data: [], message: "Currently inspections are not available" };
        }

        const allInspections = [];

        for (let inspection of inspections) {
            const newsData = {
                id: inspection._id,
                inspectionName: inspection.inspectionName,
                status: inspection.status,
            };

            allInspections.push(newsData);
        }

        return {
            status: 200,
            data: allInspections,
            message: "Inspections successfully received",
            page,
            items_per_page,
            total: inspections.length,
        };
    } catch (err) {
        throw err;
    }
}
