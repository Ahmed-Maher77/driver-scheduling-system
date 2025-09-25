const express = require("express");
const router = express.Router();

// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");

router.delete("/", async (req, res) => {
    try {
        const data = req.body;

        // Check the body is not empty
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "body is required" });
        }

        // Check if the data is an object
        if (typeof data !== "object") {
            return res.status(400).json({ message: "data must be an object" });
        }

        const driver_ids = data.driver_ids;

        // Check if the driver_ids are provided
        if (!driver_ids || driver_ids.length === 0) {
            return res.status(400).json({ message: "driver_ids are required" });
        }

        // Check if the driver_ids are valid
        for (const driver_id of driver_ids) {
            if (!driver_id) {
                return res
                    .status(400)
                    .json({ message: "driver_ids are required" });
            }
        }

        // First, get the drivers to be deleted (to access their data)
        const driversToDelete = await Drivers.find({
            driver_id: { $in: driver_ids },
        });

        if (driversToDelete.length === 0) {
            return res
                .status(404)
                .json({ message: "No drivers found with the provided IDs" });
        }

        // Unassign drivers from routes before deleting
        const unassignedRoutes = [];
        for (const driver of driversToDelete) {
            if (driver.assignedRoute_id) {
                // Unassign driver from route
                const routeUpdate = await Routes.updateMany(
                    { assignedDriver_id: driver.driver_id },
                    {
                        $set: {
                            assignedDriver_id: null,
                            status: "unassigned",
                            updated_at: new Date(),
                        },
                    }
                );

                if (routeUpdate.modifiedCount > 0) {
                    unassignedRoutes.push({
                        driver_id: driver.driver_id,
                        route_id: driver.assignedRoute_id,
                    });
                }

                // Log activity feed for unassignment
                try {
                    const newActivityFeed = new ActivityFeeds({
                        route_id: driver.assignedRoute_id,
                        status: "unassigned",
                        last_driver_id: driver.driver_id,
                        action_time: new Date(),
                    });
                    await newActivityFeed.save();
                } catch (activityError) {
                    console.error(
                        "Activity feed update failed:",
                        activityError.message
                    );
                }
            }
        }

        // Now delete the drivers
        const deleteResult = await Drivers.deleteMany({
            driver_id: { $in: driver_ids },
        });

        if (deleteResult.deletedCount === 0) {
            return res
                .status(400)
                .json({ message: "Failed to delete drivers" });
        }

        // Build the response
        const response = {
            deleted_count: deleteResult.deletedCount,
            unassigned_routes: unassignedRoutes.length,
            drivers: driversToDelete.map((driver) => ({
                driver_id: driver.driver_id,
                name: driver.name,
                status: driver.status,
                had_route: !!driver.assignedRoute_id,
                route_id: driver.assignedRoute_id || null,
            })),
        };

        return res.status(200).json({
            message: "Drivers deleted successfully",
            ...response,
        });
    } catch (error) {
        console.error("DeleteBulkDrivers Error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
