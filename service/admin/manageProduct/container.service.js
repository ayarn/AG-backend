const Container = require("models/admin/manageProduct/container.model");

module.exports = {
    addContainer,
    getContainer,
    editContainer,
    deleteContainer,
    getContainers,
};

// Add new container
async function addContainer(params) {
    try {
        const { containerSize, status } = params;

        if (!containerSize) {
            const error = new Error("Container size is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const containerData = {
            containerSize,
            status,
        };

        const container = await Container.create(containerData);

        if (!container) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Container size successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit container
async function editContainer(params) {
    try {
        const { id, containerSize, status } = params;

        if (!id) {
            const error = new Error("Container size Id is required");
            error.status = 400;
            throw error;
        }

        const container = await Container.findById(id);

        if (!container) {
            const error = new Error("Container size not found");
            error.status = 400;
            throw error;
        }

        if (containerSize) {
            container.containerSize = containerSize;
        }

        if (status) {
            container.status = status;
        }

        await container.save();

        return { status: 200, data: container, message: "Container size successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get container
async function getContainer(params) {
    try {
        const { id } = params;
    
        if (!id) {
            const error = new Error("Container size Id is required");
            error.status = 400;
            throw error;
        }
    
        const container = await Container.findById(id);
    
        if (!container) {
            const error = new Error("Container not found");
            error.status = 400;
            throw error;
        }
    
        const newContainerData = {
            id: container._id,
            containerSize: container.containerSize,
            status: container.status,
        };
    
        return { status: 200, data: newContainerData, message: "Container received" };
    } catch (err) {
        throw err;
    }
}

// Delete container
async function deleteContainer(params) {
    try {
        const { id } = params;

        const deletedContainer = await Container.findOneAndDelete({ _id: id });

        if (!deletedContainer) {
            const error = new Error("Container size not found");
            error.status = 400;
            throw error;
        }

        return { status: 200, data: deletedContainer, message: "Container successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all container
async function getContainers(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { containerSize: { $regex: search, $options: "i" } };
        }

        const containers = await Container.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!containers || containers.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently containers sizes are not available",
            };
        }
        
        const allContainers = containers.map(container => ({
            id: container._id,
            containerSize: container.containerSize,
            status: container.status,
        }));

        return {
            status: 200,
            data: allContainers,
            message: "Containers sizes successfully received",
            page,
            items_per_page,
            total: containers.length,
        };
    } catch (err) {
        throw err;
    }
}
