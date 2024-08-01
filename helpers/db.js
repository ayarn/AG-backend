const { mongoose } = require("mongoose");

// Initialize Database
const initialize = async () => {
    try {
        // Connect to mongodb atlas
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log(`✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error ", error);
        process.exit(1);
    }
};

module.exports = initialize;
