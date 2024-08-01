const PhotoGallery = require("models/admin/homePage/photoGallery.model");
const MediaCategory = require("models/admin/homePage/mediaCategory.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addPhoto,
    getPhoto,
    editPhoto,
    deletePhoto,
    getPhotos,
    getPhotoCategories,
};

// Add new photo
async function addPhoto(params, image) {
    try {
        const { imageTitle, category, status } = params;

        if (!imageTitle) {
            const error = new Error("Image Title is required");
            error.status = 400;
            throw error;
        }

        if (!category) {
            const error = new Error("Media category is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Photo is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const photoData = {
            imageTitle,
            category,
            photo: image.key,
            status,
        };

        const photo = await PhotoGallery.create(photoData);

        if (!photo) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Photo successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit photo
async function editPhoto(params, image) {
    try {
        const { id, imageTitle, category, status } = params;

        if (!id) {
            const error = new Error("Image Id is required");
            error.status = 400;
            throw error;
        }

        const photo = await PhotoGallery.findById(id);

        if (!photo) {
            const error = new Error("Image not found");
            error.status = 400;
            throw error;
        }

        if (imageTitle) {
            photo.imageTitle = imageTitle;
        }

        if (category) {
            photo.category = category;
        }

        if (image) {
            // Delete old image first
            deleteFile(photo.photo);

            // Replace new image
            photo.photo = image.key;
        }

        if (status) {
            photo.status = status;
        }

        await photo.save();

        return { status: 200, data: photo, message: "Image successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get photo
async function getPhoto(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Image Id is required");
            error.status = 400;
            throw error;
        }

        const photo = await PhotoGallery.findById(id);

        if (!photo) {
            const error = new Error("Image not found");
            error.status = 400;
            throw error;
        }

        const photoData = {
            id: id,
            imageTitle: photo.imageTitle,
            category: photo.category,
            photo: getCloudFrontUrl(photo.photo),
            status: photo.status,
        };

        return { status: 200, data: photoData, message: "Image received" };
    } catch (error) {}
}

// Delete photo
async function deletePhoto(params) {
    try {
        const { id } = params;

        const deletedPhoto = await PhotoGallery.findOneAndDelete({ _id: id });

        if (!deletedPhoto) {
            const error = new Error("Image not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedPhoto.photo);

        return { status: 200, data: deletedPhoto, message: "Image successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all photos
async function getPhotos(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { imageTitle: { $regex: search, $options: "i" } };
        }

        const photos = await PhotoGallery.find(searchQuery)
            .populate("category")
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        const allPhotosLength = await PhotoGallery.find(searchQuery);

        if (!photos || photos.length === 0) {
            return { status: 200, data: [], message: "Currently images are not available" };
        }

        const allPhotos = photos.map((photo) => ({
            id: photo._id,
            imageTitle: photo.imageTitle,
            category: {
                id: photo.category._id,
                name: photo.category.categoryName,
            },
            photo: getCloudFrontUrl(photo.photo),
            status: photo.status,
        }));

        return {
            status: 200,
            data: allPhotos,
            message: "Photos successfully received",
            page,
            items_per_page,
            total: allPhotosLength.length,
        };
    } catch (err) {
        throw err;
    }
}

// Get Photo Categories
async function getPhotoCategories() {
    try {
        const mediaCategories = await MediaCategory.find({
            categoryType: "Gallery Image",
            status: "Active",
        });

        if (!mediaCategories || mediaCategories.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently photo categories are not available",
            };
        }

        return {
            status: 200,
            data: mediaCategories,
            message: "Photo categories successfully received",
        };
    } catch (err) {
        throw err;
    }
}
