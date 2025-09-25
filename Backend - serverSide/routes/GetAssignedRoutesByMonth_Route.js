const express = require("express");
const router = express.Router();
// Import Models
const Routes = require("../models/RoutesModel");

router.get("/", async (req, res) => {
    try {
        // Check if the month is provided
        if (!req.query.month || !req.query.year) {
            return res
                .status(400)
                .json({ message: "Month and year are required" });
        }

        const month = parseInt(req.query.month, 10);
        const year = parseInt(req.query.year, 10);

        // Check if the year and month are a number
        if (isNaN(year) || isNaN(month)) {
            return res
                .status(400)
                .json({ message: "Year and month must be a number" });
        }

        // Check if the month is a valid month (1-12)
        if (month < 1 || month > 12) {
            return res
                .status(400)
                .json({ message: "Month must be between 1 and 12" });
        }

        // Build date range using provided year/month
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        // Get the routes by month with projection
        const routes = await Routes.find(
            {
                assigned_at: { $gte: start, $lt: end },
                status: "assigned",
            },
            {
                _id: 0,
                route_id: 1,
                assigned_at: 1,
                start_location: 1,
                end_location: 1,
            }
        ).lean();

        return res.status(200).json({
            month,
            year,
            count: routes.length,
            routes,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
