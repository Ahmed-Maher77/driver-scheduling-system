const express = require("express");
const router = express.Router();
// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");

// Get Dashboard Stats => /get-dashboard-stats
router.get("/", async (req, res) => {
    try {
        const totalDrivers = await Drivers.countDocuments();
        const availableDrivers = await Drivers.countDocuments({ status: "available" });
        const totalRoutes = await Routes.countDocuments();
        const unassignedRoutes = await Routes.countDocuments({ status: "unassigned" });

        return res.status(200).json({
            totalDrivers,
            availableDrivers,
            totalRoutes,
            unassignedRoutes,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;