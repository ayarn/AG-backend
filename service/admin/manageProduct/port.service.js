const Port = require("models/admin/manageProduct/port.model");
const Country = require("models/web/country.model");

module.exports = {
    addPort,
    getPort,
    editPort,
    deletePort,
    getPorts,
    getCountriesList,
};

// Add new port
async function addPort(params) {
    try {
        const { portName, country, status } = params;

        if (!portName) {
            const error = new Error("Port name is required");
            error.status = 400;
            throw error;
        }

        if (!country) {
            const error = new Error("Country is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const portData = {
            portName,
            country,
            status,
        };

        const port = await Port.create(portData);

        if (!port) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Port successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit port
async function editPort(params) {
    try {
        const { id, portName, country, status } = params;

        if (!id) {
            const error = new Error("Port Id is required");
            error.status = 400;
            throw error;
        }

        const port = await Port.findById(id);

        if (!port) {
            const error = new Error("Port not found");
            error.status = 400;
            throw error;
        }

        if (portName) {
            port.portName = portName;
        }

        if (country) {
            port.country = country;
        }

        if (status) {
            port.status = status;
        }

        await port.save();

        return { status: 200, data: port, message: "Port successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get port
async function getPort(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Port Id is required");
        error.status = 400;
        throw error;
    }

    const port = await Port.findById(id);

    if (!port) {
        const error = new Error("Port not found");
        error.status = 400;
        throw error;
    }

    const formattedData = {
        id: port._id,
        portName: port.portName,
        country: port.country,
        status: port.status,
    };

    return { status: 200, data: formattedData, message: "port received" };
}

// Delete port
async function deletePort(params) {
    try {
        const { id } = params;

        const deletedPort = await Port.findOneAndDelete({ _id: id });

        if (!deletedPort) {
            const error = new Error("Port not found");
            error.status = 400;
            throw error;
        }

        return { status: 200, data: deletedPort, message: "Port successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all ports
async function getPorts(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            const countries = await Country.find({
                name: { $regex: search, $options: "i" },
            }).select("_id");

            const countryIds = countries.map((country) => country._id);

            searchQuery = {
                $or: [
                    { portName: { $regex: search, $options: "i" } },
                    { country: { $in: countryIds } },
                ],
            };
        }

        const ports = await Port.find(searchQuery)
            .populate("country")
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!ports || ports.length === 0) {
            return { status: 200, data: [], message: "Currently ports are not available" };
        }

        return {
            status: 200,
            data: ports.map((port) => ({
                id: port._id,
                portName: port.portName,
                country: {
                    id: port.country._id,
                    name: port.country.name,
                },
                status: port.status,
            })),
            message: "Ports successfully received",
            page,
            items_per_page,
            total: ports.length,
        };
    } catch (err) {
        throw err;
    }
}

// Get all countries
async function getCountriesList() {
    try {
        const countries = await Country.find({}).select("name iso2 id").sort({ id: 1 });

        const list = countries.map((country) => ({
            value: country._id,
            label: country.name,
            iso2: country.iso2,
        }));

        return { status: 200, data: list, message: "Country list received successfully" };
    } catch (err) {
        throw err;
    }
}
