const Product = require("models/admin/manageProduct/product.model");
const Category = require("models/admin/manageProduct/category.model");
const Country = require("models/web/country.model");
const Container = require("models/admin/manageProduct/container.model");
const PackingType = require("models/admin/manageProduct/packingType.model");
const ProductBrand = require("models/admin/manageProduct/productBrand.model");
const PaymentTerm = require("models/admin/manageProduct/paymentTerm.model");
const Inspection = require("models/admin/manageProduct/inspection.model");
const ProductDocument = require("models/admin/manageProduct/productDocument.model");
const Port = require("models/admin/manageProduct/port.model");
const PortPrice = require("models/admin/manageProduct/portPrice.model");
const { deleteFile } = require("utils/s3Upload");
const getCloudFrontUrl = require("helpers/getCloudFrontUrl");

module.exports = {
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductMetaData,
    getLoadingPorts,
    getDestinationPortsByLoadingPort,
};

// Add new product
async function addProduct(params, image) {
    try {
        const {
            category,
            origin,
            productName,
            hsnCode,
            productDescription,
            loadingPort,
            destinationPort,
            containerSize,
            packingType,
            productBrand,
            shipmentPeriod,
            paymentTerm,
            quantity,
            insurance,
            document,
            inspection,
            fob,
            status,
        } = params;

        if (!category) {
            const error = new Error("Category is required");
            error.status = 400;
            throw error;
        }

        if (!origin) {
            const error = new Error("Origin is required");
            error.status = 400;
            throw error;
        }

        if (!productName) {
            const error = new Error("Product Name is required");
            error.status = 400;
            throw error;
        }

        if (!hsnCode) {
            const error = new Error("HSN Code is required");
            error.status = 400;
            throw error;
        }

        if (!productDescription) {
            const error = new Error("Product Description is required");
            error.status = 400;
            throw error;
        }

        if (!loadingPort) {
            const error = new Error("Loading port is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(destinationPort) || destinationPort.length === 0) {
            const error = new Error("Destination port is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(containerSize) || containerSize.length === 0) {
            const error = new Error("Container size is required");
            error.status = 400;
            throw error;
        }

        for (let item of containerSize) {
            const { container } = item;

            if (!container) {
                const error = new Error("Container is required");
                error.status = 400;
                throw error;
            }
        }

        if (!packingType) {
            const error = new Error("Packing type is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(productBrand) || productBrand.length === 0) {
            const error = new Error("Marketing brand is required");
            error.status = 400;
            throw error;
        }

        if (!shipmentPeriod) {
            const error = new Error("Shipment period is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(paymentTerm) || paymentTerm.length === 0) {
            const error = new Error("Payment term is required");
            error.status = 400;
            throw error;
        }

        if (!insurance) {
            const error = new Error("Insurance is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(inspection) || inspection.length === 0) {
            const error = new Error("Inspection is required");
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(document) || document.length === 0) {
            const error = new Error("Document is required");
            error.status = 400;
            throw error;
        }

        if (!fob) {
            const error = new Error("FOB price is required");
            error.status = 400;
            throw error;
        }

        if (!image) {
            const error = new Error("Product Image is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        // Automatic generated product code
        const { categoryName } = await Category.findById({ _id: category });
        const prefix = categoryName.slice(0, 2).toUpperCase();

        let count = await Product.countDocuments({ category });
        count += 1;

        const formattedCount = count.toString().padStart(3, "0");
        const productCode = `${prefix}AG${formattedCount}`;

        const productData = {
            productCode: productCode,
            category,
            origin,
            productName,
            hsnCode,
            productImage: image.key,
            productDescription,
            loadingPort,
            destinationPort,
            containerSize,
            packingType,
            productBrand,
            shipmentPeriod,
            paymentTerm,
            quantity: quantity || 0,
            insurance,
            document,
            inspection,
            fob,
            status,
        };

        const product = await Product.create(productData);

        if (!product) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Product successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit product
async function editProduct(params, image) {
    try {
        const {
            id,
            category,
            origin,
            productName,
            hsnCode,
            productDescription,
            loadingPort,
            destinationPort,
            containerSize,
            packingType,
            productBrand,
            shipmentPeriod,
            paymentTerm,
            quantity,
            insurance,
            inspection,
            document,
            fob,
            status,
        } = params;

        if (!id) {
            const error = new Error("Product Id is required");
            error.status = 400;
            throw error;
        }

        const product = await Product.findById(id);

        if (!product) {
            const error = new Error("Product not found");
            error.status = 400;
            throw error;
        }

        if (category) {
            product.category = category;
        }

        if (origin) {
            product.origin = origin;
        }

        if (productName) {
            product.productName = productName;
        }

        if (hsnCode) {
            product.hsnCode = hsnCode;
        }

        if (productDescription) {
            product.productDescription = productDescription;
        }

        if (loadingPort) {
            product.loadingPort = loadingPort;
        }

        if (destinationPort) {
            product.destinationPort = destinationPort;
        }

        if (containerSize) {
            product.containerSize = containerSize;
        }

        if (packingType) {
            product.packingType = packingType;
        }

        if (productBrand) {
            product.productBrand = productBrand;
        }

        if (shipmentPeriod) {
            product.shipmentPeriod = shipmentPeriod;
        }

        if (paymentTerm) {
            product.paymentTerm = paymentTerm;
        }

        if (quantity) {
            product.quantity = quantity;
        }

        if (insurance) {
            product.insurance = insurance;
        }

        if (inspection) {
            product.inspection = inspection;
        }

        if (document) {
            product.document = document;
        }

        if (fob) {
            product.fob = fob;
        }

        if (image) {
            // Delete old image first
            deleteFile(product.productImage);

            // Replace new image
            product.productImage = image.key;
        }

        if (status) {
            product.status = status;
        }

        await product.save();

        return { status: 200, data: product, message: "Product successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get product
async function getProduct(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Product Id is required");
        error.status = 400;
        throw error;
    }

    const product = await Product.findById(id)
        .populate("loadingPort")
        .populate("destinationPort")
        .populate("category")
        .populate("origin")
        .populate("containerSize.container")
        .populate("packingType")
        .populate("productBrand")
        .populate("paymentTerm")
        .populate("document")
        .populate("inspection");

    if (!product) {
        const error = new Error("Product not found");
        error.status = 400;
        throw error;
    }

    const productData = {
        id: product._id,
        productCode: product.productCode,
        category: {
            id: product.category?._id,
            name: product.category?.categoryName,
        },
        origin: {
            id: product.origin?._id,
            name: product.origin?.name,
        },
        productName: product.productName,
        hsnCode: product.hsnCode,
        productImage: getCloudFrontUrl(product.productImage),
        productDescription: product.productDescription,
        loadingPort: {
            id: product.loadingPort?._id,
            name: product.loadingPort?.portName,
        },
        destinationPort: product.destinationPort.map((port) => ({
            id: port?._id,
            name: port?.portName,
        })),
        containerSize: product.containerSize.map((container) => ({
            container: { id: container.container?._id, name: container.container?.containerSize },
            weight: container.weight,
        })),
        packingType: {
            id: product.packingType?._id,
            name: product.packingType?.packingTypeName,
        },
        productBrand: product.productBrand.map((brand) => ({
            id: brand?._id,
            name: brand?.brandName,
        })),
        shipmentPeriod: product.shipmentPeriod,
        paymentTerm: product.paymentTerm.map((term) => ({
            id: term?._id,
            name: term?.paymentTerm,
        })),
        quantity: product.quantity,
        insurance: product.insurance,
        inspection: product.inspection.map((item) => ({
            id: item?._id,
            name: item?.inspectionName,
        })),
        document: product.document.map((doc) => ({
            id: doc?._id,
            name: doc?.documentName,
        })),
        fob: product.fob,
        status: product.status,
    };

    return { status: 200, data: productData, message: "Product received" };
}

// Delete product
async function deleteProduct(params) {
    try {
        const { id } = params;

        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            const error = new Error("Product not found");
            error.status = 400;
            throw error;
        }

        // Delete image from S3 bucket
        deleteFile(deletedProduct.productImage);

        return { status: 200, data: deletedProduct, message: "Product successfully deleted" };
    } catch (err) {
        throw err;
    }
}

// Get all products
async function getProducts(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { productName: { $regex: search, $options: "i" } };
        }

        const products = await Product.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .populate("category", "_id categoryName")
            .populate("origin", "_id name")
            .populate("loadingPort", "_id portName")
            .populate("packingType", "_id packingTypeName")
            .exec();

        if (!products || products.length === 0) {
            return { status: 200, data: [], message: "Currently products are not available" };
        }

        const allProducts = await Promise.all(
            products.map(async (product) => {
                const destinationPort = await Port.find(
                    { _id: { $in: product.destinationPort } },
                    "_id portName"
                );
                const containerSize = await Promise.all(
                    product.containerSize.map(async (size) => {
                        const container = await Container.findById(
                            size.container,
                            "_id containerSize"
                        );
                        return {
                            id: container._id,
                            name: container.containerSize,
                            weight: size.weight,
                        };
                    })
                );
                const productBrand = await ProductBrand.find(
                    { _id: { $in: product.productBrand } },
                    "_id brandName"
                );
                const paymentTerm = await PaymentTerm.find(
                    { _id: { $in: product.paymentTerm } },
                    "_id paymentTerm"
                );
                const document = await ProductDocument.find(
                    { _id: { $in: product.document } },
                    "_id documentName"
                );

                return {
                    id: product._id,
                    productCode: product.productCode,
                    category: product.category
                        ? { id: product.category._id, name: product.category.categoryName }
                        : null,
                    origin: product.origin
                        ? { id: product.origin._id, name: product.origin.name }
                        : null,
                    productName: product.productName,
                    hsnCode: product.hsnCode,
                    productImage: getCloudFrontUrl(product.productImage),
                    productDescription: product.productDescription,
                    loadingPort: product.loadingPort
                        ? { id: product.loadingPort._id, name: product.loadingPort.portName }
                        : null,
                    destinationPort: destinationPort.map((port) => ({
                        id: port._id,
                        name: port.portName,
                    })),
                    containerSize: containerSize,
                    packingType: product.packingType
                        ? { id: product.packingType._id, name: product.packingType.packingTypeName }
                        : null,
                    productBrand: productBrand.map((brand) => ({
                        id: brand._id,
                        name: brand.brandName,
                    })),
                    shipmentPeriod: product.shipmentPeriod,
                    paymentTerm: paymentTerm.map((term) => ({
                        id: term._id,
                        name: term.paymentTerm,
                    })),
                    quantity: product.quantity,
                    insurance: product.insurance,
                    document: document.map((doc) => ({ id: doc._id, name: doc.documentName })),
                    fob: product.fob,
                    status: product.status,
                };
            })
        );

        return {
            status: 200,
            data: allProducts,
            message: "Products successfully received",
            page: pageNumber,
            items_per_page: itemsPerPage,
            total: allProducts.length,
        };
    } catch (err) {
        throw err;
    }
}

// Get Product meta data
async function getProductMetaData() {
    try {
        // Fetch all categories
        const categories = await Category.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$categoryName",
                },
            },
        ]);

        // Fetch all countries
        const countries = await Country.aggregate([
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$name",
                },
            },
        ]);

        // Fetch all container sizes
        const containers = await Container.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$containerSize",
                },
            },
        ]);

        // Fetch all packing types
        const packingTypes = await PackingType.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$packingTypeName",
                },
            },
        ]);

        // Fetch all marketing brands
        const brands = await ProductBrand.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$brandName",
                },
            },
        ]);

        // Fetch all payment terms
        const paymentTerms = await PaymentTerm.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$paymentTerm",
                },
            },
        ]);

        // Fetch all inspections
        const inspections = await Inspection.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$inspectionName",
                },
            },
        ]);

        // Fetch all documents
        const documents = await ProductDocument.aggregate([
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    label: "$documentName",
                },
            },
        ]);

        const metaData = {
            categories: categories,
            countries: countries,
            containers: containers,
            packingTypes: packingTypes,
            brands: brands,
            paymentTerms: paymentTerms,
            inspections: inspections,
            documents: documents,
        };

        return {
            status: 200,
            data: metaData,
            message: "Product meta data successfully received",
        };
    } catch (err) {
        throw err;
    }
}

// Get loading ports by country
async function getLoadingPorts(params) {
    try {
        const { country } = params;

        if (!country) {
            const error = new Error("Country id is required");
            error.status = 400;
            throw error;
        }

        const loadingPorts = await Port.find({ country: country, status: "Active" }).select(
            "portName"
        );

        if (!loadingPorts || loadingPorts.length === 0) {
            return { status: 200, data: [], message: "Currently loading ports are not available" };
        }

        return { status: 200, data: loadingPorts, message: "Loading ports recieved" };
    } catch (err) {
        throw err;
    }
}

// Get destination ports by loading port
async function getDestinationPortsByLoadingPort(params) {
    try {
        const { loadingPort } = params;

        if (!loadingPort) {
            const error = new Error("Loading port id is required");
            error.status = 400;
            throw error;
        }

        const destinationPorts = await PortPrice.find({
            loadingPort: loadingPort,
            destinationPort: { $ne: loadingPort },
        })
            .select("destinationPort")
            .populate("destinationPort");

        const ports = [];

        for (let i = 0; i < destinationPorts.length; i++) {
            ports.push({
                id: destinationPorts[i]._id,
                destinationPort: {
                    id: destinationPorts[i].destinationPort?._id,
                    name: destinationPorts[i].destinationPort?.portName,
                },
            });
        }

        if (!ports || ports.length === 0) {
            return {
                status: 200,
                data: [],
                message: "Currently destination ports are not available",
            };
        }

        return { status: 200, data: ports, message: "Destination ports recieved" };
    } catch (err) {
        throw err;
    }
}
