const express = require("express");
const router = express.Router();
// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");

// Get Dashboard Stats => /get-dashboard-stats
router.get("/", async (req, res) => {
    try {
        const totalDrivers = await Drivers.countDocuments();
        const availableDrivers = await Drivers.countDocuments({ status: "active" });
        const totalRoutes = await Routes.countDocuments();
        const unassignedRoutes = await Routes.countDocuments({ status: "unassigned" });

        // Calculate status counts for all routes
        const statusAggregation = await Routes.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const routeStatusCounts = {
            assigned: 0,
            unassigned: 0,
            "in progress": 0,
            completed: 0,
            cancelled: 0
        };

        statusAggregation.forEach(item => {
            if (item._id && Object.prototype.hasOwnProperty.call(routeStatusCounts, item._id.toLowerCase())) {
                routeStatusCounts[item._id.toLowerCase()] = item.count;
            }
        });

        return res.status(200).json({
            totalDrivers,
            availableDrivers,
            totalRoutes,
            unassignedRoutes,
            routeStatusCounts,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;