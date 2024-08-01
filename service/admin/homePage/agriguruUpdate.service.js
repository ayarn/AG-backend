const AgriguruUpdate = require("models/admin/homePage/agriguruUpdate.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addAgriguruUpdate,
    getAgriguruUpdate,
    editAgriguruUpdate,
    deleteAgriguruUpdate,
    getAllAgriguruUpdates,
};

// Add new Agriguru update
async function addAgriguruUpdate(params, image) {
    try {
        const { flyerTitle, flyerDescription, imageType, type, pageDescription, link, status } =
            params;

        if (!flyerTitle) {
            const error = new Error("Flyer Title is required");
            error.status = 400;
            throw error;
        }

        if (!flyerDescription) {
            const error = new Error("Flyer Description is required");
            error.status = 400;
            throw error;
        }

        if (!imageType) {
            const error = new Error("Image type is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Flyer image is required");
            error.status = 400;
            throw error;
        }

        if (!type) {
            const error = new Error("Flyer type is required");
            error.status = 400;
            throw error;
        }

        if (type === "Page" && !pageDescription) {
            const error = new Error("Page description is required");
            error.status = 400;
            throw error;
        }

        if (type === "Link" && !link) {
            const error = new Error("Page link is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const agriguruUpdateData = {
            flyerTitle,
            flyerDescription,
            imageType,
            flyerImage: image.key,
            type,
            pageDescription: type === "Page" ? pageDescription : "",
            link: type === "Link" ? link : "",
            status,
        };

        const flyer = await AgriguruUpdate.create(agriguruUpdateData);

        if (!flyer) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Flyer successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit Agriguru update
async function editAgriguruUpdate(params, image) {
    try {
        const { id, flyerTitle, flyerDescription, imageType, type, pageDescription, link, status } =
            params;

        if (!id) {
            const error = new Error("Flyer Id is required");
            error.status = 400;
            throw error;
        }

        const flyer = await AgriguruUpdate.findById(id);

        if (!flyer) {
            const error = new Error("Flyer not found");
            error.status = 400;
            throw error;
        }

        if (flyerTitle) {
            flyer.flyerTitle = flyerTitle;
        }

        if (flyerDescription) {
            flyer.flyerDescription = flyerDescription;
        }

        if (imageType) {
            flyer.imageType = imageType;
        }

        if (image) {
            // Delete old image first
            deleteFile(flyer.flyerImage);

            // Replace new image
            flyer.flyerImage = image.key;
        }

        if (type) {
            flyer.type = type;
        }

        if (type === "Page") {
            flyer.pageDescription = pageDescription;
        }

        if (type === "Link") {
            flyer.link = link;
        }

        if (status) {
            flyer.status = status;
        }

        await flyer.save();

        return { status: 200, data: flyer, message: "Flyer successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get Agriguru update
async function getAgriguruUpdate(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Flyer Id is required");
        error.status = 400;
        throw error;
    }

    const flyer = await AgriguruUpdate.findById(id);

    if (!flyer) {
        const error = new Error("Flyer not found");
        error.status = 400;
        throw error;
    }

    const flyerData = {
        id: id,
        flyerTitle: flyer.flyerTitle,
        flyerDescription: flyer.flyerDescription,
        imageType: flyer.imageType,
        flyerImage: getCloudFrontUrl(flyer.flyerImage),
        type: flyer.type,
        pageDescription: flyer.pageDescription,
        link: flyer.link,
        status: flyer.status,
    };

    return { status: 200, data: flyerData, message: "Flyer received" };
}

// Delete Agriguru update
async function deleteAgriguruUpdate(params) {
    try {
        const { id } = params;

        const deletedFlyer = await AgriguruUpdate.findOneAndDelete({ _id: id });

        if (!deletedFlyer) {
            const error = new Error("Flyer not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedFlyer.flyerImage);

        return { status: 200, data: deletedFlyer, message: "Flyer successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all Agriguru updates
async function getAllAgriguruUpdates(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { flyerTitle: { $regex: search, $options: "i" } };
        }

        const flyers = await AgriguruUpdate.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!flyers || flyers.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently agriguru updates are not available",
            };
        }

        const allFlyers = flyers.map((flyer) => ({
            id: flyer._id,
            flyerTitle: flyer.flyerTitle,
            flyerDescription: flyer.flyerDescription,
            imageType: flyer.imageType,
            flyerImage: getCloudFrontUrl(flyer.flyerImage),
            type: flyer.type,
            pageDescription: flyer.pageDescription,
            link: flyer.link,
            status: flyer.status,
        }));

        return {
            status: 200,
            data: allFlyers,
            message: "Flyers successfully received",
            page,
            items_per_page,
            total: allFlyers.length,
        };
    } catch (err) {
        throw err;
    }
}
