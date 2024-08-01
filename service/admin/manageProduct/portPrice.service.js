const Port = require("models/admin/manageProduct/port.model");
const PortPrice = require("models/admin/manageProduct/portPrice.model");

module.exports = {
    addPortPrice,
    getPortPrice,
    editPortPrice,
    deletePortPrice,
    getPortPrices,
    getDestinationPorts,
};

// Add new port price
async function addPortPrice(params) {
    try {
        const { loadingPort, destinationPort, prices } = params;

        if (!loadingPort) {
            const error = new Error("Loading port is required");
            error.status = 400;
            throw error;
        }

        if (!destinationPort) {
            const error = new Error("Destination port is required");
            error.status = 400;
            throw error;
        }

        const existingPortPrice = await PortPrice.findOne({ loadingPort, destinationPort });

        if (existingPortPrice) {
            const error = new Error("Port price between two ports already exists");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(prices) || prices.length === 0) {
            const error = new Error("Prices are is required and Can't be empty");
            error.status = 400;
            throw error;
        }

        for (const item of prices) {
            const { containerSize, price } = item;

            if (!containerSize) {
                const error = new Error("Container size is required");
                error.status = 400;
                throw error;
            }

            if (!price) {
                const error = new Error("Price (related to Container size) is required");
                error.status = 400;
                throw error;
            }
        }

        const portPriceData = {
            loadingPort,
            destinationPort,
            prices,
        };

        const portPrice = await PortPrice.create(portPriceData);

        if (!portPrice) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Port price successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit port price
async function editPortPrice(params) {
    try {
        const { id, destinationPort, prices } = params;

        if (!id) {
            const error = new Error("Port price id is required");
            error.status = 400;
            throw error;
        }

        const portPrice = await PortPrice.findById(id);

        if (!portPrice) {
            const error = new Error("Port price not found");
            error.status = 400;
            throw error;
        }

        if (destinationPort) {
            portPrice.destinationPort = destinationPort;
        }

        if (prices) {
            portPrice.prices = prices;
        }

        await portPrice.save();

        return { status: 200, data: portPrice, message: "Port price successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get port price
async function getPortPrice(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Port price id is required");
        error.status = 400;
        throw error;
    }

    const portPrice = await PortPrice.findById(id)
        .populate("loadingPort")
        .populate("destinationPort")
        .populate("prices.containerSize");

    if (!portPrice) {
        const error = new Error("Port price not found");
        error.status = 400;
        throw error;
    }

    const newPortPrice = {
        id: portPrice._id,
        loadingPort: {
            id:portPrice.loadingPort?._id,
            name:portPrice.loadingPort?.portName
        },
        destinationPort: {
            id:portPrice.destinationPort?._id,
            name:portPrice.destinationPort?.portName
        },
        prices: portPrice.prices.map((el) => ({
            containerSize: {
                id:el.containerSize?._id,
                name:el.containerSize?.containerSize
            },
            price: el.price,
        })),
    };

    return { status: 200, data: newPortPrice, message: "Port price received" };
}

// Delete port price
async function deletePortPrice(params) {
    try {
        const { id } = params;

        const deletedPortPrice = await PortPrice.findOneAndDelete({ _id: id });

        if (!deletedPortPrice) {
            const error = new Error("Port price not found");
            error.status = 400;
            throw error;
        }

        return { status: 200, data: deletedPortPrice, message: "Port price successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all port price
async function getPortPrices(params) {
    try {
        const { loadingPort } = params;

        const portPrices = await PortPrice.find({ loadingPort })
            .populate("loadingPort")
            .populate("destinationPort")
            .populate("prices.containerSize");

        if (!portPrices || portPrices.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently port prices are not available",
            };
        }

        const allPortPrice = [];

        for (let portPrice of portPrices) {
            const newData = {
                id: portPrice._id,
                loadingPort: {
                    id:portPrice.loadingPort?._id,
                    name:portPrice.loadingPort?.portName
                },
                destinationPort: {
                    id:portPrice.destinationPort?._id,
                    name:portPrice.destinationPort?.portName
                },
                prices: portPrice.prices.map((el) => ({
                    containerSize: {
                        id:el.containerSize?._id,
                        name:el.containerSize?.containerSize
                    },
                    price: el.price,
                })),
            };

            allPortPrice.push(newData);
        }

        return { status: 200, data: allPortPrice, message: "Port prices successfully recieved" };
    } catch (err) {
        throw err;
    }
}

// Get all destination ports
async function getDestinationPorts(params) {
    try {
        const { loadingPort } = params;

        if (!loadingPort) {
            const error = new Error("Loading port is required");
            error.status = 400;
            throw error;
        }

        const destinationPorts = await Port.find({ _id: { $ne: loadingPort } });

        if (!destinationPorts || destinationPorts.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently destination ports are not available",
            };
        }

        return {
            status: 200,
            data: destinationPorts,
            message: "Destination Ports successfully recieved",
        };
    } catch (err) {
        throw err;
    }
}
