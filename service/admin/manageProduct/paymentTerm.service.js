const PaymentTerm = require("models/admin/manageProduct/paymentTerm.model");

module.exports = {
    addPaymentTerm,
    getPaymentTerm,
    editPaymentTerm,
    deletePaymentTerm,
    getPaymentTerms,
};

// Add new payment term
async function addPaymentTerm(params) {
    try {
        const { paymentTerm, status } = params;

        if (!paymentTerm) {
            const error = new Error("Payment Term name is required");
            error.status = 400;
            throw error;
        }

        if (!status) {
            const error = new Error("Status is required");
            error.status = 400;
            throw error;
        }

        const paymentTermData = {
            paymentTerm,
            status,
        };

        const newPaymentTerm = await PaymentTerm.create(paymentTermData);

        if (!newPaymentTerm) {
            const error = new Error("Internal server error");
            error.status = 500;
            throw error;
        }

        return { status: 200, data: {}, message: "Payment term successfully added" };
    } catch (err) {
        throw err;
    }
}

// Edit payment term
async function editPaymentTerm(params) {
    try {
        const { id, paymentTerm, status } = params;

        if (!id) {
            const error = new Error("Payment term Id is required");
            error.status = 400;
            throw error;
        }

        const payTerm = await PaymentTerm.findById(id);

        if (!payTerm) {
            const error = new Error("Payment term not found");
            error.status = 400;
            throw error;
        }

        if (paymentTerm) {
            payTerm.paymentTerm = paymentTerm;
        }

        if (status) {
            payTerm.status = status;
        }

        await payTerm.save();

        return { status: 200, data: payTerm, message: "Payment term successfully updated" };
    } catch (err) {
        throw err;
    }
}

// Get payment term
async function getPaymentTerm(params) {
    const { id } = params;

    if (!id) {
        const error = new Error("Payment term Id is required");
        error.status = 400;
        throw error;
    }

    const payTerm = await PaymentTerm.findById(id);

    if (!payTerm) {
        const error = new Error("Payment term not found");
        error.status = 400;
        throw error;
    }

    const paymentTermData = {
        id: payTerm._id,
        paymentTerm: payTerm.paymentTerm,
        status: payTerm.status,
    };

    return { status: 200, data: paymentTermData, message: "Payment term received" };
}

// Delete payment term
async function deletePaymentTerm(params) {
    try {
        const { id } = params;

        const deletedPaymentTerm = await PaymentTerm.findOneAndDelete({ _id: id });

        if (!deletedPaymentTerm) {
            const error = new Error("Payment term not found");
            error.status = 400;
            throw error;
        }

        return {
            status: 200,
            data: deletedPaymentTerm,
            message: "Payment term successfully deleted",
        };
    } catch (err) {
        throw err;
    }
}

// Get all payment terms
async function getPaymentTerms(req) {
    try {
        const { page = 1, items_per_page = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(items_per_page);

        let searchQuery = {};

        if (search) {
            searchQuery = { paymentTerm: { $regex: search, $options: "i" } };
        }

        const paymentTerms = await PaymentTerm.find(searchQuery)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!paymentTerms || paymentTerms.length === 0) {
            return { status: 200, data: [], message: "Currently payment terms are not available" };
        }

        const allPaymentTerms = [];

        for (let payTerm of paymentTerms) {
            const newsData = {
                id: payTerm._id,
                paymentTerm: payTerm.paymentTerm,
                status: payTerm.status,
            };

            allPaymentTerms.push(newsData);
        }

        return {
            status: 200,
            data: allPaymentTerms,
            message: "Payment terms successfully received",
            page,
            items_per_page,
            total: paymentTerms.length,
        };
    } catch (err) {
        throw err;
    }
}
