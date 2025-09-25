const express = require("express");
const router = express.Router();

// Import Models
const Routes = require("../models/RoutesModel");
const Drivers = require("../models/DriversModel");

// Get All Routes => /get-all-routes?page=1&limit=15
router.get("/", async (req, res) => {
    try {
        // Convert query params to numbers, fallback to defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;

        // Calculate how many docs to skip
        const skip = (page - 1) * limit;

        // Select only needed fields from Routes
        const routes = await Routes.find(
            {},
            {
                route_id: 1,
                start_location: 1,
                end_location: 1,
                status: 1,
                assignedDriver_id: 1,
                assigned_at: 1,
                distance: 1,
                distance_unit: 1,
                _id: 0,
            },
            {
                skip,
                limit,
                sort: { created_at: -1 },
            }
        ).lean();

        // Bulk fetch driver names for all assignedDriver_id
        const driverIds = routes
            .filter((r) => r.assignedDriver_id)
            .map((r) => r.assignedDriver_id);
        const uniqueDriverIds = [...new Set(driverIds)];
        let driverNameMap = {};
        if (uniqueDriverIds.length > 0) {
            const drivers = await Drivers.find(
                { driver_id: { $in: uniqueDriverIds } },
                { _id: 0, driver_id: 1, name: 1 }
            ).lean();
            driverNameMap = drivers.reduce((acc, d) => {
                acc[d.driver_id] = d.name;
                return acc;
            }, {});
        }

        const formatted = routes.map((r) => ({
            route_id: r.route_id,
            start_location: r.start_location,
            end_location: r.end_location,
            status: r.status,
            assignedDriver: r.assignedDriver_id
                ? {
                      id: r.assignedDriver_id,
                      name: driverNameMap[r.assignedDriver_id] || null,
                  }
                : null,
            ...(r.assignedDriver_id
                ? { assigned_at: r.assigned_at || null }
                : {}),
            distance: r.distance,
            distance_unit: r.distance_unit,
        }));

        // Calculate total pages count
        const totalDocs = await Routes.countDocuments();
        const totalPages = Math.ceil(totalDocs / limit);

        res.status(200).json({
            data: formatted,
            currentPage: page,
            totalPages: Math.ceil(totalDocs / limit),
            totalDocs,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Routes Summary => /get-all-routes/summary
router.get("/summary", async (req, res) => {
    try {
        // Get the routes
        const routes = await Routes.find(
            {},
            {
                _id: 0,
                route_id: 1,
                start_location: 1,
                end_location: 1,
                status: 1,
                assignedDriver_id: 1,
                assigned_at: 1,
                updated_at: 1,
            },
            {
                sort: { updated_at: -1 },
                limit: 20,
            }
        ).lean();

        // Bulk fetch driver names
        const driverIds = routes
            .filter((r) => r.assignedDriver_id)
            .map((r) => r.assignedDriver_id);
        const uniqueDriverIds = [...new Set(driverIds)];
        let driverNameMap = {};
        if (uniqueDriverIds.length > 0) {
            const drivers = await Drivers.find(
                { driver_id: { $in: uniqueDriverIds } },
                { _id: 0, driver_id: 1, name: 1 }
            ).lean();
            driverNameMap = drivers.reduce((acc, d) => {
                acc[d.driver_id] = d.name;
                return acc;
            }, {});
        }

        // Format the routes
        const data = routes.map((r) => ({
            route_id: r.route_id,
            start_location: r.start_location,
            end_location: r.end_location,
            status: r.status,
            assignedDriver: r.assignedDriver_id
                ? {
                      id: r.assignedDriver_id,
                      name: driverNameMap[r.assignedDriver_id] || null,
                  }
                : null,
            // if there is assignedDriver_id exists => return assigned_at
            ...(r.assignedDriver_id
                ? { assigned_at: r.assigned_at || null }
                : {}),
            updated_at: r.updated_at || null,
        }));

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
