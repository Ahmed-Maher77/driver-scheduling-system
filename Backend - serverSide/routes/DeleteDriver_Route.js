const express = require("express");
const router = express.Router();

// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");

// Delete Driver => /delete-driver/:id (id is custom driver_id like DR00)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the driver_id is provided
        if (!id) {
            return res.status(400).json({ message: "driver_id is required" });
        }

        // Check driver existence
        const existing = await Drivers.findOne({ driver_id: id }).lean();
        if (!existing) {
            return res.status(404).json({ message: "Driver not found" });
        }

        // Delete the driver
        const deleteResult = await Drivers.deleteOne({ driver_id: id });
        if (!deleteResult || deleteResult.deletedCount !== 1) {
            return res.status(500).json({ message: "Failed to delete driver" });
        }

        // Clean up routes that reference this driver
        const unassignResult = await Routes.updateMany(
            { assignedDriver_id: id },
            {
                $set: {
                    lastDriver_id: id,
                    assignedDriver_id: null,
                    status: "unassigned",
                    assigned_at: null,
                    updated_at: new Date(),
                },
            }
        );

        // Update activity feed (guarded)
        try {
            if (existing.assignedRoute_id) {
                const newActivityFeed = new ActivityFeeds({
                    route_id: deleteResult.assignedRoute_id,
                    status: "unassigned",
                    last_driver_id: deleteResult.driver_id,
                    action_time: new Date(),
                });
                await newActivityFeed.save();
            }
        } catch (feedErr) {
            console.error(
                "Activity feed write failed after driver delete:",
                feedErr?.message || feedErr
            );
        }

        return res.status(200).json({
            message: "Driver deleted successfully",
            deleted_driver_id: id,
            routes_unassigned: unassignResult?.modifiedCount || 0,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
