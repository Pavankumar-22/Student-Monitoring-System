const mongoose = require('mongoose');
const logger = require("../utils/logger");

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        
        console.error("Failed to connect to DB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;

