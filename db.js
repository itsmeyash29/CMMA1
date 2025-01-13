const mongoose = require("mongoose");
require("dotenv").config();

// Establish MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.log('Error occurred while connecting to MongoDB:', error);
});

const vehicleDataSchema = new mongoose.Schema({
    current: {
        type: Number, // Current in Amperes
        required: true, // Mandatory field
        min: 0, // Ensures current is non-negative
    },
    voltage: {
        type: Number, // Voltage in Volts
        required: true, // Mandatory field
        min: 0, // Ensures voltage is non-negative
    },
    power: {
        type: Number, // Power in Watts
        required: true, // Mandatory field
        min: 0, // Ensures power is non-negative
    },
    vehicleOnOffState: {
        type: Boolean, // Indicates whether the vehicle is ON (true) or OFF (false)
        required: true, // Mandatory field
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically captures the time of data entry
    },
});

// Create a model from the schema
const VehicleData = mongoose.model("VehicleData", vehicleDataSchema);

// Export the model
module.exports = VehicleData;