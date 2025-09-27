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

        // Parse filter params
        const { driverIdOrName, status, vehicleType, licenseType } = req.query;

        // Build filter object dynamically based on provided parameters
        const filter = {};

        // Add driver ID or name search if provided
        if (driverIdOrName && driverIdOrName.trim() !== "") {
            filter.$or = [
                { driver_id: { $regex: driverIdOrName, $options: "i" } },
                { name: { $regex: driverIdOrName, $options: "i" } },
            ];
        }

        // Add status filter if provided
        if (status && status.trim() !== "") {
            filter.status = { $regex: status, $options: "i" };
        }

        // Add vehicle type filter if provided
        if (vehicleType && vehicleType.trim() !== "") {
            filter["vehicle.type"] = { $regex: vehicleType, $options: "i" };
        }

        // Add license type filter if provided
        if (licenseType && licenseType.trim() !== "") {
            filter["driving_license.type"] = {
                $regex: licenseType,
                $options: "i",
            };
        }

        // Fetch drivers with projection, pagination, and sort
        const drivers = await Drivers.find(
            filter,
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

        const totalDocs = await Drivers.countDocuments(filter);
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
