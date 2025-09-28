const express = require("express");
const router = express.Router();
// Import Models
const Routes = require("../models/RoutesModel");

// Check Route Availability => /check-route-availability/:id?driverId=DR001 (id is custom route_id like RT001)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { driverId } = req.query;

        // Check if the route ID is provided
        if (!id) {
            return res.status(400).json({ message: "Route ID is required" });
        }

        // Check if the route exists (case-insensitive)
        const route = await Routes.findOne(
            { route_id: { $regex: new RegExp(`^${id}$`, "i") } },
            { _id: 0, status: 1, assignedDriver_id: 1 }
        ).lean();
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        const routeStatus = route.status;
        if (!routeStatus) {
            return res.status(404).json({ message: "Route status is unknown" });
        }

        // If driverId is provided and route is already assigned to the same driver, return unassigned
        if (driverId && route.assignedDriver_id === driverId) {
            return res.status(200).json({
                message: "Route found",
                routeId: id,
                routeStatus: "unassigned",
                reason: "Route is already assigned to this driver",
            });
        }

        // Return the route status
        return res
            .status(200)
            .json({ message: "Route found", routeId: id, routeStatus });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
