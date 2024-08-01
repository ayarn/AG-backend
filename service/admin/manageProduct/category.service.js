const Category = require("models/admin/manageProduct/category.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    getCategories,
};

// Add new category
async function addCategory(params, image) {
    try {
        const { categoryName, status } = params;

        if (!categoryName) {
            const error = new Error("Category name is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Category image is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const categoryData = {
            categoryName,
            categoryImage: image.key,
            status,
        };

        const category = await Category.create(categoryData);

        if (!category) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Category successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit category
async function editCategory(params, image) {
    try {
        const { id, categoryName, status } = params;

        if (!id) {
            const error = new Error("Category Id is required");
            error.status = 400;
            throw error;
        }

        const category = await Category.findById(id);

        if (!category) {
            const error = new Error("Category not found");
            error.status = 400;
            throw error;
        }

        if (categoryName) {
            category.categoryName = categoryName;
        }

        if (image) {
            // Delete old image first
            deleteFile(category.categoryImage);

            // Replace new image
            category.categoryImage = image.key;
        }

        if (status) {
            category.status = status;
        }

        await category.save();

        return { status: 200, data: category, message: "Category successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get category
async function getCategory(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Category Id is required");
            error.status = 400;
            throw error;
        }

        const category = await Category.findById(id);

        if (!category) {
            const error = new Error("Category not found");
            error.status = 400;
            throw error;
        }

        const categoryData = {
            id: id,
            categoryName: category.categoryName,
            categoryImage: getCloudFrontUrl(category.categoryImage),
            status: category.status,
        };

        return { status: 200, data: categoryData, message: "Category received" };
    } catch (err) {
        throw err;
    }
}

// Delete category
async function deleteCategory(params) {
    try {
        const { id } = params;

        const deletedCategory = await Category.findOneAndDelete({ _id: id });

        if (!deletedCategory) {
            const error = new Error("Category not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedCategory.categoryImage);

        return { status: 200, data: deletedCategory, message: "Category successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all categories
async function getCategories(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { categoryName: { $regex: search, $options: "i" } };
        }

        const categories = await Category.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!categories || categories.length === 0) {
            return { status: 200, data: [], message: "Currently categories are not available" };
        }

        const allCategories = categories.map((category) => ({
            id: category._id,
            categoryName: category.categoryName,
            categoryImage: getCloudFrontUrl(category.categoryImage),
            status: category.status,
        }));

        return {
            status: 200,
            data: allCategories,
            message: "Categories successfully received",
            page,
            items_per_page,
            total: allCategories.length,
        };
    } catch (err) {
        throw err;
    }
}
