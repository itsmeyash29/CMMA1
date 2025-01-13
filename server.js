const express = require("express");
const cors = require("cors");
const VehicleData = require("./db"); // Import the VehicleData model from your db.js

const app = express();
const port = 3001;

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable JSON body parsing

// Route to get paginated vehicle data
app.get("/api/vehicleData", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page

    try {
        // Fetch the data based on page and limit
        const data = await VehicleData.find()
            .skip((page - 1) * limit)  // Skip records based on page number
            .limit(limit);  // Limit the number of records per page
        
        // Get the total number of records for pagination info
        const totalRecords = await VehicleData.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages

        // Send the data along with pagination info
        res.json({
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalRecords,
            }
        });
    } catch (error) {
        // Handle any errors
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// Start the server and connect to MongoDB
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});