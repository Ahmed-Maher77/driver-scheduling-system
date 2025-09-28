const express = require("express");
const router = express.Router();

// Import Models
const Routes = require("../models/RoutesModel");
const Drivers = require("../models/DriversModel");

// Get Route Details => /get-route-details/:id (id is custom route_id like RT001)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the route_id is provided
        if (!id)
            return res.status(400).json({ message: "route_id is required" });

        const route = await Routes.findOne(
            { route_id: id },
            {
                _id: 0,
                route_id: 1,
                start_location: 1,
                end_location: 1,
                status: 1,
                assignedDriver_id: 1,
                lastDriver_id: 1,
                assigned_at: 1,
                distance: 1,
                distance_unit: 1,
                duration: 1,
                time_unit: 1,
                cost: 1,
                currency: 1,
                max_speed: 1,
                speed_unit: 1,
                notes: 1,
                created_at: 1,
                updated_at: 1,
            }
        ).lean(); // return plain JS object

        // Check if the route exists
        if (!route) return res.status(404).json({ message: "Route not found" });

        // Get the assigned driver
        const assignedDriver = await Drivers.findOne(
            {
                driver_id: route.assignedDriver_id,
            },
            {
                _id: 0,
                driver_id: 1,
                name: 1,
                picture: 1,
            }
        ).lean();

        // Get the last driver (if exists)
        let lastDriver = null;
        if (route.lastDriver_id) {
            lastDriver = await Drivers.findOne(
                {
                    driver_id: route.lastDriver_id,
                },
                {
                    _id: 0,
                    driver_id: 1,
                    name: 1,
                    picture: 1,
                }
            ).lean();
        }

        // Build clean response
        const response = {
            ...route,
            assignedDriver: assignedDriver
                ? {
                      id: assignedDriver.driver_id,
                      name: assignedDriver.name,
                      picture: assignedDriver.picture,
                  }
                : null,
            lastDriver: lastDriver
                ? {
                      id: lastDriver.driver_id,
                      name: lastDriver.name,
                      picture: lastDriver.picture,
                  }
                : null,
        };
        delete response.assignedDriver_id;
        delete response.lastDriver_id;

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
