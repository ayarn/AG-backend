const Logo = require("models/admin/homePage/logo.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addLogo,
    editLogo,
    getLogo,
    deleteLogo,
    getAllLogos,
};

// Add new logo image
async function addLogo(params, image) {
    try {
        const { logoTitle, logoDescription, status } = params;

        if (!logoTitle) {
            const error = new Error("Logo Title is required");
            error.status = 400;
            throw error;
        }

        if (!logoDescription) {
            const error = new Error("Logo Description is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Logo Image is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const logoData = {
            logoTitle,
            logoDescription,
            logoImage: image.key,
            status,
        };

        const logo = await Logo.create(logoData);

        if (!logo) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Logo successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit logo image
async function editLogo(params, image) {
    try {
        const { id, logoTitle, logoDescription, status } = params;

        if (!id) {
            const error = new Error("Logo Id is required");
            error.status = 400;
            throw error;
        }

        const logo = await Logo.findById(id);

        if (!logo) {
            const error = new Error("Logo not found");
            error.status = 400;
            throw error;
        }

        if (logoTitle) {
            logo.logoTitle = logoTitle;
        }

        if (logoDescription) {
            logo.logoDescription = logoDescription;
        }

        if (image) {
            // Delete old image first
            deleteFile(logo.logoImage);

            // Replace new image
            logo.logoImage = image.key;
        }

        if (status) {
            logo.status = status;
        }

        await logo.save();

        return { status: 200, data: logo, message: "Logo successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get logo
async function getLogo(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Logo Id is required");
            error.status = 400;
            throw error;
        }

        const logo = await Logo.findById(id);

        if (!logo) {
            const error = new Error("Logo not found");
            error.status = 400;
            throw error;
        }

        const logoData = {
            id: id,
            logoTitle: logo.logoTitle,
            logoDescription: logo.logoDescription,
            logoImage: getCloudFrontUrl(logo.logoImage),
            status: logo.status,
        };

        return { status: 200, data: logoData, message: "Logo received" };
    } catch (err) {
        throw err;
    }
}

// Delete logo
async function deleteLogo(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Logo Id is required");
            error.status = 400;
            throw error;
        }

        const deletedLogo = await Logo.findOneAndDelete({ _id: id });

        if (!deletedLogo) {
            const error = new Error("Logo not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedLogo.logoImage);

        return { status: 200, data: deletedLogo, message: "Logo successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all logos
async function getAllLogos(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = {
                $or: [
                    { logoTitle: { $regex: search, $options: "i" } },
                    { logoDescription: { $regex: search, $options: "i" } },
                ],
            };
        }

        const logos = await Logo.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!logos || logos.length === 0) {
            return { status: 200, data: [], message: "Currently logo images are not available" };
        }

        const allLogos = logos.map((logo) => ({
            id: logo._id,
            logoTitle: logo.logoTitle,
            logoDescription: logo.logoDescription,
            logoImage: getCloudFrontUrl(logo.logoImage),
            status: logo.status,
        }));

        return {
            status: 200,
            data: allLogos,
            message: "Logos successfully received",
            page,
            items_per_page,
            total: allLogos.length,
        };
    } catch (err) {
        throw err;
    }
}
