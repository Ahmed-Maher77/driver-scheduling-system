const router = require("express").Router();

// Import Models
const Routes = require("../models/RoutesModel");
const Drivers = require("../models/DriversModel");
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

        const route_ids = data.route_ids;

        // Check if the route_ids are provided
        if (!route_ids || route_ids.length === 0) {
            return res.status(400).json({ message: "route_ids are required" });
        }

        // Check if the route_ids are valid
        for (const route_id of route_ids) {
            if (!route_id) {
                return res
                    .status(400)
                    .json({ message: "route_ids are required" });
            }
        }

        // First, get the routes to be deleted (to access their data)
        const routesToDelete = await Routes.find({
            route_id: { $in: route_ids },
        });

        if (routesToDelete.length === 0) {
            return res
                .status(404)
                .json({ message: "No routes found with the provided IDs" });
        }

        // Unassign drivers from the routes before deleting
        const unassignedDrivers = [];
        for (const route of routesToDelete) {
            if (route.assignedDriver_id) {
                // Unassign driver from this route
                const driverUpdate = await Drivers.updateMany(
                    { assignedRoute_id: route.route_id },
                    {
                        $set: {
                            assignedRoute_id: null,
                            status: "available",
                            updated_at: new Date(),
                        },
                    }
                );

                if (driverUpdate.modifiedCount > 0) {
                    unassignedDrivers.push({
                        route_id: route.route_id,
                        driver_id: route.assignedDriver_id,
                    });
                }

                // Log activity feed for unassignment
                try {
                    const newActivityFeed = new ActivityFeeds({
                        route_id: route.route_id,
                        status: "unassigned",
                        last_driver_id: route.assignedDriver_id,
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

        // Now delete the routes
        const deleteResult = await Routes.deleteMany({
            route_id: { $in: route_ids },
        });

        if (deleteResult.deletedCount === 0) {
            return res.status(400).json({ message: "Failed to delete routes" });
        }

        // Build the response
        const response = {
            deleted_count: deleteResult.deletedCount,
            unassigned_drivers: unassignedDrivers.length,
            routes: routesToDelete.map((route) => ({
                route_id: route.route_id,
                status: route.status,
                had_driver: !!route.assignedDriver_id,
                driver_id: route.assignedDriver_id || null,
            })),
        };

        return res.status(200).json({
            message: "Routes deleted successfully",
            ...response,
        });
    } catch (error) {
        console.error("DeleteBulkRoutes Error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
