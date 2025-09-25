const express = require("express");
const router = express.Router();

// Import Models
const ActivityFeeds = require("../models/ActivityFeedsModel");


// Get All Activity Feeds => /activity-feeds?page=1&limit=15
router.get("/", async (req, res) => {
    try {
        // Convert query params to numbers, fallback to defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        // Calculate how many docs to skip
        const skip = (page - 1) * limit;

        // Fetch data with pagination
        const activityFeeds = await ActivityFeeds.find()
            .skip(skip)
            .limit(limit)
            .sort({ action_time: -1 }); // optional: latest first

        // Calculate total pages count
        const totalDocs = await ActivityFeeds.countDocuments();
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
})


// Get Activity Feed Summary => /activity-feeds/summary
router.get("/summary", async (req, res) => {
    try {
        const activityFeeds = await ActivityFeeds.find().limit(10);
        res.status(200).json(activityFeeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;