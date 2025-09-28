const express = require("express");
const router = express.Router();

// Import Models
const ActivityFeeds = require("../models/ActivityFeedsModel");

// Get All Activity Feeds => /activity-feeds?page=1&limit=15&status=assigned&driverName=John&dateFrom=2024-01-01&dateTo=2024-12-31
// driverName searches: driver name, driver ID, and route ID
router.get("/", async (req, res) => {
    try {
        // Convert query params to numbers, fallback to defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        // Extract filter parameters
        const { status, driverName, dateFrom, dateTo } = req.query;

        // Build filter object
        const filter = {};

        // Status filter (case insensitive)
        if (status && status.trim()) {
            filter.status = { $regex: new RegExp(`^${status.trim()}$`, "i") };
        }

        // Search filter (driver name, driver ID, route ID)
        if (driverName && driverName.trim()) {
            const searchTerm = driverName.trim();
            filter.$or = [
                // Search in driver names
                { "driver.name": { $regex: searchTerm, $options: "i" } },
                { "last_driver.name": { $regex: searchTerm, $options: "i" } },
                // Search in driver IDs
                { "driver.id": { $regex: searchTerm, $options: "i" } },
                { "last_driver.id": { $regex: searchTerm, $options: "i" } },
                { driver_id: { $regex: searchTerm, $options: "i" } },
                { last_driver_id: { $regex: searchTerm, $options: "i" } },
                // Search in route ID
                { route_id: { $regex: searchTerm, $options: "i" } },
            ];
        }

        // Date range filter
        if (dateFrom || dateTo) {
            filter.action_time = {};
            if (dateFrom) {
                filter.action_time.$gte = new Date(dateFrom);
            }
            if (dateTo) {
                // Add one day to include the entire "to" date
                const toDate = new Date(dateTo);
                toDate.setDate(toDate.getDate() + 1);
                filter.action_time.$lt = toDate;
            }
        }

        // Calculate how many docs to skip
        const skip = (page - 1) * limit;

        // Fetch data with pagination and filters
        const activityFeeds = await ActivityFeeds.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ action_time: -1 }); // optional: latest first

        // Calculate total pages count with filters
        const totalDocs = await ActivityFeeds.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / limit);

        res.status(200).json({
            currentPage: page,
            limit,
            totalPages,
            totalDocs,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            data: activityFeeds,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Activity Feed Summary => /activity-feeds/summary
router.get("/summary", async (req, res) => {
    try {
        const activityFeeds = await ActivityFeeds.find()
            .limit(10)
            .sort({ action_time: -1 }); // Latest first

        // Format the response to ensure proper structure
        const formattedFeeds = activityFeeds.map((feed) => ({
            _id: feed._id,
            route_id: feed.route_id,
            status: feed.status,
            action_time: feed.action_time,
            driver:
                feed.driver && feed.driver.id && feed.driver.name
                    ? {
                          id: feed.driver.id,
                          name: feed.driver.name,
                      }
                    : feed.driver_id
                    ? {
                          id: feed.driver_id,
                          name: null,
                      }
                    : null,
            last_driver:
                feed.last_driver && feed.last_driver.id && feed.last_driver.name
                    ? {
                          id: feed.last_driver.id,
                          name: feed.last_driver.name,
                      }
                    : feed.last_driver_id
                    ? {
                          id: feed.last_driver_id,
                          name: null,
                      }
                    : null,
        }));

        res.status(200).json(formattedFeeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
