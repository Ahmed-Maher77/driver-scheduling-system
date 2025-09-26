const router = require("express").Router();

// Import Models
const Routes = require("../models/RoutesModel");
const Drivers = require("../models/DriversModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Check if the route_id is provided
        if (!id) {
            return res.status(400).json({ message: "route_id is required" });
        }

        // Check the body is not empty
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "body is required" });
        }

        // Check if the data is an object
        if (typeof data !== "object") {
            return res.status(400).json({ message: "data must be an object" });
        }

        // // Check if the required fields are present
        // const requiredFields = [
        //     "start_location",
        //     "end_location",
        //     "status",
        //     "distance",
        //     "distance_unit",
        //     "duration",
        //     "time_unit",
        //     "cost",
        //     "currency",
        //     "max_speed",
        //     "speed_unit",
        // ];
        // const missingFields = requiredFields.filter((field) => !data[field]);
        // if (missingFields.length > 0) {
        //     return res.status(400).json({
        //         message: `Missing required fields: ${missingFields.join(", ")}`,
        //     });
        // }

        // Check if the route exists
        const route = await Routes.findOne({ route_id: id });
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Track updated fields to shape the response
        const updatedFields = {};

        // Updatable fields whitelist (excluding system-managed fields)
        const updatableFields = [
            "start_location",
            "end_location",
            "status",
            "distance",
            "distance_unit",
            "duration",
            "time_unit",
            "cost",
            "currency",
            "max_speed",
            "speed_unit",
            "notes",
        ];

        // Update the route [only the fields have changed]
        updatableFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(data, field)) {
                if (data[field] !== route[field]) {
                    route[field] = data[field];
                    updatedFields[field] = route[field];
                }
            }
        });

        // Handle status-specific updates
        if (Object.prototype.hasOwnProperty.call(data, "status")) {
            if (route.status === "assigned") {
                route.assigned_at = new Date();
                updatedFields.assigned_at = route.assigned_at;
            }
        }

        route.updated_at = new Date();
        updatedFields.updated_at = route.updated_at;
        await route.save();

        // Update the activity feed
        if (route.status !== data.status) {
            const newActivityFeed = new ActivityFeeds({
                route_id: id,
                status: route.status,
                action_time: new Date(),
            });

            if (route.status === "assigned") {
                // Get driver details for current assignment
                const driver = await Drivers.findById(route.assignedDriver_id);
                if (driver) {
                    newActivityFeed.driver = {
                        id: driver.driver_id,
                        name: driver.name,
                    };
                }
            } else if (route.status === "unassigned") {
                // Get driver details for last assignment
                const lastDriver = await Drivers.findById(
                    route.assignedDriver_id
                );
                if (lastDriver) {
                    newActivityFeed.last_driver = {
                        id: lastDriver.driver_id,
                        name: lastDriver.name,
                    };
                }
            }
            await newActivityFeed.save();
        }

        // Update the driver if status changed to assigned
        if (
            route.assignedDriver_id &&
            route.status === "assigned" &&
            data.status === "assigned"
        ) {
            const driver = await Drivers.findOne({
                driver_id: route.assignedDriver_id,
            });
            if (!driver) {
                return res.status(404).json({
                    message: "Driver not found",
                    error: "DRIVER_NOT_FOUND",
                    details: { suggestion: "Please provide a valid driver ID" },
                });
            }

            // Only update driver if they're not already assigned to this route
            if (driver.assignedRoute_id !== id) {
                if (driver.status === "available") {
                    // Move current assignment to past if exists
                    if (driver.assignedRoute_id) {
                        const pastAssignedRoute =
                            driver.pastAssignedRoutes.find(
                                (route) =>
                                    route.route_id === driver.assignedRoute_id
                            );
                        driver.pastAssignedRoutes.push({
                            route_id: driver.assignedRoute_id,
                            startLocation:
                                pastAssignedRoute.start_location || null,
                            endLocation: pastAssignedRoute.end_location || null,
                        });
                    }
                    driver.assignedRoute_id = id;
                    driver.assigned_at = new Date();
                    driver.updated_at = new Date();
                    driver.status = "on_route";
                    await driver.save();
                } else if (driver.status === "on_route") {
                    return res.status(400).json({
                        message: "Driver is already on a route",
                        error: "DRIVER_BUSY",
                    });
                } else if (driver.status === "unavailable") {
                    return res.status(400).json({
                        message:
                            "Driver is unavailable for assignment at the moment",
                        error: "DRIVER_UNAVAILABLE",
                    });
                }
            }
        }

        // Handle unassignment
        if (route.status === "unassigned" && data.status === "unassigned") {
            // Unassign driver from this route
            await Drivers.updateMany(
                { assignedRoute_id: id },
                {
                    $set: {
                        assignedRoute_id: null,
                        status: "available",
                        updated_at: new Date(),
                    },
                }
            );
        }

        return res.status(200).json({
            message: "Route updated successfully",
            route: {
                route_id: route.route_id,
                ...updatedFields,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
