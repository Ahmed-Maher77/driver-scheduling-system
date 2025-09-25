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
        const route = await Routes.findOne({ route_id: id });
        if (!route) return res.status(404).json({ message: "Route not found" });

        // Delete the route
        const deletedRoute = await Routes.findOneAndDelete({ route_id: id });

        if (!deletedRoute)
            return res.status(404).json({ message: "Route not found" });

        // Clean up any drivers with this route assignment (hardened)
        try {
            await Drivers.updateMany(
                { assignedRoute_id: id },
                { $set: { assignedRoute_id: null, status: "available", updated_at: new Date() } }
            );
        } catch (e) {
            console.error("Driver cleanup failed:", e?.message || e);
        }

        // Update activity feed
        try {
            if (deletedRoute.assignedDriver_id) {
                const newActivityFeed = new ActivityFeeds({
                    route_id: deletedRoute.route_id,
                    status: "unassigned",
                    last_driver_id: deletedRoute.assignedDriver_id,
                    action_time: new Date(),
                });
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
