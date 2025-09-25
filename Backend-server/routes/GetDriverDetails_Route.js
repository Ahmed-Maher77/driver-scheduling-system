const express = require("express");
const router = express.Router();

// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");

// Get Driver Details => /get-driver-details/:id (id is custom driver_id like DR00)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the driver_id is provided
        if (!id)
            return res.status(400).json({ message: "driver_id is required" });

        // Get driver with a clean projection
        const driver = await Drivers.findOne(
            { driver_id: id },
            {
                _id: 0,
                driver_id: 1,
                name: 1,
                picture: 1,
                phone: 1,
                status: 1,
                address: 1,
                country: 1,
                city: 1,
                contact_channels: 1,
                national_id: 1,
                gender: 1,
                date_of_birth: 1,
                assignedRoute_id: 1,
                pastAssignedRoutes: 1,
                notes: 1,
                joined_at: 1,
                updated_at: 1,
                driving_license: 1,
                vehicle: 1,
            }
        ).lean();

        // Check if the driver exists
        if (!driver)
            return res.status(404).json({ message: "Driver not found" });

        // If driver has an assigned route, fetch minimal route info
        let assignedRoute = null;
        if (driver.assignedRoute_id) {
            const route = await Routes.findOne(
                { route_id: driver.assignedRoute_id },
                {
                    _id: 0,
                    route_id: 1,
                    start_location: 1,
                    end_location: 1,
                    distance: 1,
                    distance_unit: 1,
                    duration: 1,
                    time_unit: 1,
                    cost: 1,
                    currency: 1,
                    max_speed: 1,
                    speed_unit: 1,
                    assigned_at: 1,
                }
            ).lean();
            if (route) {
                assignedRoute = { ...route };
            }
        }

        const response = {
            ...driver,
            age: driver.date_of_birth
                ? Math.floor(
                      (new Date() - new Date(driver.date_of_birth)) /
                          (1000 * 60 * 60 * 24 * 365)
                  )
                : null, // calculate age
            driving_license: driver.driving_license || null,
            vehicle: driver.vehicle || null,
            assignedRoute,
        };
        // Do not expose assignedRoute_id in the API response
        delete response.assignedRoute_id;

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
