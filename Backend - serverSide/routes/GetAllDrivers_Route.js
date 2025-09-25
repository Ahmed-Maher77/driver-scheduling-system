const express = require("express");
const router = express.Router();

// Import Models
const Drivers = require("../models/DriversModel");

// Get All Drivers => /get-all-drivers?page=1&limit=15
router.get("/", async (req, res) => {
    try {
        // Parse pagination params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;

        // Fetch drivers with projection, pagination, and sort
        const drivers = await Drivers.find(
            {},
            {
                _id: 0,
                driver_id: 1,
                name: 1,
                picture: 1,
                phone: 1,
                status: 1,
                assignedRoute_id: 1,
                driving_license: 1,
                vehicle: 1,
                joined_at: 1,
            },
            { skip, limit, sort: { joined_at: -1 } }
        ).lean();

        // Map assignedRoute to nested object
        const data = drivers.map((d) => ({
            driver_id: d.driver_id,
            name: d.name,
            picture: d.picture || null,
            phone: d.phone,
            status: d.status,
            license_type: d.driving_license?.type || null,
            vehicle_type: d.vehicle?.type || null,
            assignedRoute: d.assignedRoute_id
                ? { id: d.assignedRoute_id }
                : null,
            joined_at: d.joined_at || null,
        }));

        const totalDocs = await Drivers.countDocuments();
        const totalPages = Math.ceil(totalDocs / limit) || 1;

        return res.status(200).json({
            data,
            currentPage: page,
            totalPages,
            totalDocs,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
