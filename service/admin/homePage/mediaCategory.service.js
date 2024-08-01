const MediaCategory = require("models/admin/homePage/mediaCategory.model");

module.exports = {
    addMediaCategory,
    editMediaCategory,
    getMediaCategory,
    deleteMediaCategory,
    getMediaCategories,
};

// Add new media category
async function addMediaCategory(params) {
    try {
        const { categoryName, categoryType, status } = params;

        if (!categoryName) {
            const error = new Error("Category name is required");
            error.status = 400;
            throw error;
        }

        if (!categoryType) {
            const error = new Error("Category type is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const mediaCategoryData = {
            categoryName,
            categoryType,
            status,
        };

        const mediaCategory = await MediaCategory.create(mediaCategoryData);

        if (!mediaCategory) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Media Category successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit media category
async function editMediaCategory(params) {
    try {
        const { id, categoryName, categoryType, status } = params;

        if (!id) {
            const error = new Error("Media Category Id is required");
            error.status = 400;
            throw error;
        }

        const mediaCategory = await MediaCategory.findById(id);

        if (!mediaCategory) {
            const error = new Error("Media Category not found");
            error.status = 400;
            throw error;
        }

        if (categoryName) {
            mediaCategory.categoryName = categoryName;
        }

        if (categoryType) {
            mediaCategory.categoryType = categoryType;
        }

        if (status) {
            mediaCategory.status = status;
        }

        await mediaCategory.save();

        return { status: 200, data: mediaCategory, message: "Media Category successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get media category
async function getMediaCategory(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Media Category Id is required");
            error.status = 400;
            throw error;
        }

        const mediaCategory = await MediaCategory.findById(id);

        if (!mediaCategory) {
            const error = new Error("Media Category not found");
            error.status = 400;
            throw error;
        }

        const mediaCategoryData = {
            id: id,
            categoryName: mediaCategory.categoryName,
            categoryType: mediaCategory.categoryType,
            status: mediaCategory.status,
        };

        return { status: 200, data: mediaCategoryData, message: "Media Category received" };
    } catch (err) {
        throw err;
    }
}

// Delete media category
async function deleteMediaCategory(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Media Category Id is required");
            error.status = 400;
            throw error;
        }

        const deletedMediaCategory = await MediaCategory.findOneAndDelete({ _id: id });

        if (!deletedMediaCategory) {
            const error = new Error("Media Category not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedMediaCategory,
            message: "Media Category successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all media categories
async function getMediaCategories(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = {
                $or: [
                    { categoryName: { $regex: search, $options: "i" } },
                    { categoryType: { $regex: search, $options: "i" } },
                ],
            };
        }

        const mediaCategories = await MediaCategory.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!mediaCategories || mediaCategories.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently media categories are not available",
            };
        }

        const allMediaCategories = mediaCategories.map((mediaCategory) => ({
            id: mediaCategory._id,
            categoryName: mediaCategory.categoryName,
            categoryType: mediaCategory.categoryType,
            status: mediaCategory.status,
        }));

        return {
            status: 200,
            data: allMediaCategories,
            message: "Media Categories successfully received",
            page,
            items_per_page,
            total: allMediaCategories.length,
        };
    } catch (err) {
        throw err;
    }
}
