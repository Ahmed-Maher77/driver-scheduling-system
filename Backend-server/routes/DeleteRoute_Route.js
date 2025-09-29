const router = require("express").Router();
// Import Models
const Routes = require("../models/RoutesModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");
const Drivers = require("../models/DriversModel");

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the route ID is provided
        if (!id)
            return res.status(400).json({ message: "Route ID is required" });

        // Check if the route exists
        const route = await Routes.findOne({
            route_id: { $regex: new RegExp(`^${id}$`, "i") },
        });
        if (!route) return res.status(404).json({ message: "Route not found" });

        // Delete the route (case-insensitive)
        const deletedRoute = await Routes.findOneAndDelete({
            route_id: { $regex: new RegExp(`^${id}$`, "i") },
        });

        if (!deletedRoute)
            return res.status(404).json({ message: "Route not found" });

        // Clean up any drivers with this route assignment (hardened)
        try {
            await Drivers.updateMany(
                { assignedRoute_id: id },
                {
                    $set: {
                        assignedRoute_id: null,
                        status: "available",
                        updated_at: new Date(),
                    },
                }
            );
        } catch (e) {
            console.error("Driver cleanup failed:", e?.message || e);
        }

        // Update activity feed
        try {
            if (deletedRoute.assignedDriver_id) {
                // Get driver details for last assignment by custom driver_id
                const lastDriver = await Drivers.findOne({
                    driver_id: deletedRoute.assignedDriver_id,
                }).lean();
                const newActivityFeed = new ActivityFeeds({
                    route_id: deletedRoute.route_id,
                    status: "unassigned",
                    action_time: new Date(),
                });

                if (lastDriver) {
                    newActivityFeed.last_driver = {
                        id: lastDriver.driver_id,
                        name: lastDriver.name,
                    };
                }
                await newActivityFeed.save();
            }
        } catch (feedErr) {
            // Do not fail the deletion because of feed issues
        }

        // Return the deleted route
        return res.status(200).json({
            message: "Route deleted successfully",
            route: deletedRoute,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
