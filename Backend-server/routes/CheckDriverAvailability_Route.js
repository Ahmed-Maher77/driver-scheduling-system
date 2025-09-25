const express = require("express");
const router = express.Router();
// Import Models
const Drivers = require("../models/DriversModel");

// Check Driver Availability => /check-driver-availability/:id (id is custom driver_id like DR001)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the driver ID is provided
        if (!id) {
            return res.status(400).json({ message: "Driver ID is required" });
        }

        // Check if the driver exists
        const driver = await Drivers.findOne(
            { driver_id: id },
            { _id: 0, status: 1 }
        ).lean();
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        const driverStatus = driver.status;
        if (!driverStatus) {
            return res
                .status(404)
                .json({ message: "Driver status is unknown" });
        }

        // Return the driver status
        return res
            .status(200)
            .json({ message: "Driver found", driverId: id, driverStatus });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
