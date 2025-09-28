const express = require("express");
const router = express.Router();
// Import Models
const Drivers = require("../models/DriversModel");

// Check Driver Availability => /check-driver-availability/:id?routeId=RT001 (id is custom driver_id like DR001)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { routeId } = req.query;

        // Check if the driver ID is provided
        if (!id) {
            return res.status(400).json({ message: "Driver ID is required" });
        }

        // Check if the driver exists (case-insensitive)
        const driver = await Drivers.findOne(
            { driver_id: { $regex: new RegExp(`^${id}$`, "i") } },
            { _id: 0, status: 1, assignedRoute_id: 1 }
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

        // If routeId is provided and driver is already assigned to the same route, return available
        if (routeId && driver.assignedRoute_id === routeId) {
            return res.status(200).json({
                message: "Driver found",
                driverId: id,
                driverStatus: "available",
                reason: "Driver is already assigned to this route",
            });
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
