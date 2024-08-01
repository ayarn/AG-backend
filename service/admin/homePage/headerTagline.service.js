const HeaderTagline = require("models/admin/homePage/headerTagline.model");

module.exports = {
    addHeaderTagline,
    getHeaderTagline,
    editHeaderTagline,
    deleteHeaderTagline,
    getHeaderTaglines,
};

// Add new header tagline
async function addHeaderTagline(params) {
    try {
        const { title, status } = params;

        if (!title) {
            const error = new Error("Header Title is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const headerData = {
            title,
            status,
        };

        const header = await HeaderTagline.create(headerData);

        if (!header) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Header successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit header tagline
async function editHeaderTagline(params) {
    try {
        const { id, title, status } = params;

        if (!id) {
            const error = new Error("Header tagline Id is required");
            error.status = 400;
            throw error;
        }

        const header = await HeaderTagline.findById(id);

        if (!header) {
            const error = new Error("Header tagline not found");
            error.status = 400;
            throw error;
        }

        if (title) {
            header.title = title;
        }

        if (status) {
            header.status = status;
        }

        await header.save();

        return { status: 200, data: header, message: "Header successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get header tagline
async function getHeaderTagline(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Header Tagline Id is required");
            error.status = 400;
            throw error;
        }

        const header = await HeaderTagline.findById(id);

        if (!header) {
            const error = new Error("Header tagline not found");
            error.status = 400;
            throw error;
        }

        const headerData = {
            id: header._id,
            title: header.title,
            status: header.status,
        };

        return { status: 200, data: headerData, message: "Header tagline received" };
    } catch (err) {
        throw err;
    }
}

// Delete header tagline
async function deleteHeaderTagline(params) {
    try {
        const { id } = params;

        if (!id) {
            const error = new Error("Header Tagline Id is required");
            error.status = 400;
            throw error;
        }

        const deletedHeaderTagline = await HeaderTagline.findOneAndDelete({ _id: id });

        if (!deletedHeaderTagline) {
            const error = new Error("Header tagline not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedHeaderTagline,
            message: "Header tagline successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all header taglines
async function getHeaderTaglines(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { title: { $regex: search, $options: "i" } };
        }

        const headers = await HeaderTagline.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!headers || headers.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently header taglines are not available",
            };
        }

        const allHeaders = headers.map((header) => ({
            id: header._id,
            title: header.title,
            status: header.status,
        }));

        return {
            status: 200,
            data: allHeaders,
            message: "Header taglines successfully received",
            page,
            items_per_page,
            total: allHeaders.length,
        };
    } catch (err) {
        throw err;
    }
}
