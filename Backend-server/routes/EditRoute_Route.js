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
        const route = await Routes.findOne({
            route_id: { $regex: new RegExp(`^${id}$`, "i") },
        });
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Track updated fields to shape the response
        const updatedFields = {};

        // Updatable fields whitelist (excluding system-managed fields)
        const updatableFields = [
            "assignedDriver_id",
            "lastDriver_id",
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

        if (Object.prototype.hasOwnProperty.call(data, "assignedDriver_id")) {
            const incomingAssignedDriverId = data.assignedDriver_id;
            const originalAssignedDriverId = route.assignedDriver_id;

            // If assigning a new driver
            if (
                incomingAssignedDriverId &&
                incomingAssignedDriverId !== originalAssignedDriverId
            ) {
                // Save current driver as last driver before assigning new one
                if (originalAssignedDriverId) {
                    route.lastDriver_id = originalAssignedDriverId;
                    updatedFields.lastDriver_id = route.lastDriver_id;
                }

                // Validate the new driver
                const driver = await Drivers.findOne({
                    driver_id: incomingAssignedDriverId,
                });
                if (!driver) {
                    return res.status(404).json({
                        message: "Driver not found",
                        error: "DRIVER_NOT_FOUND",
                        details: {
                            suggestion: "Please provide a valid driver ID",
                        },
                    });
                }

                // Check if driver is available
                if (driver.status !== "available") {
                    return res.status(400).json({
                        message: `Driver is ${driver.status}`,
                        error: "DRIVER_NOT_AVAILABLE",
                    });
                }

                // Check if driver is already assigned to another route
                if (driver.assignedRoute_id && driver.assignedRoute_id !== id) {
                    return res.status(400).json({
                        message: "Driver is already assigned to another route",
                        error: "DRIVER_ALREADY_ASSIGNED",
                        details: { currentRouteId: driver.assignedRoute_id },
                    });
                }

                // Update the driver
                driver.assignedRoute_id = id;
                driver.assigned_at = new Date();
                driver.updated_at = new Date();
                driver.status = "on_route";
                await driver.save();

                // Update route
                route.assignedDriver_id = incomingAssignedDriverId;
                route.status = "assigned";
                route.assigned_at = new Date();
                updatedFields.assignedDriver_id = route.assignedDriver_id;
                updatedFields.status = route.status;
                updatedFields.assigned_at = route.assigned_at;

                // Log activity feed (assigned)
                const activity = new ActivityFeeds({
                    route_id: id,
                    driver_id: incomingAssignedDriverId,
                    status: "assigned",
                    action_time: new Date(),
                });
                await activity.save();
            }
            // If unassigning driver
            else if (!incomingAssignedDriverId && originalAssignedDriverId) {
                // Get the current driver before unassigning
                const currentDriver = await Drivers.findOne({
                    driver_id: originalAssignedDriverId,
                });

                // Save current driver as last driver before unassigning
                route.lastDriver_id = originalAssignedDriverId;
                updatedFields.lastDriver_id = route.lastDriver_id;

                // Update the driver
                if (currentDriver) {
                    currentDriver.assignedRoute_id = null;
                    currentDriver.status = "available";
                    currentDriver.updated_at = new Date();
                    await currentDriver.save();
                }

                // Update route
                route.assignedDriver_id = null;
                route.status = "unassigned";
                updatedFields.assignedDriver_id = route.assignedDriver_id;
                updatedFields.status = route.status;

                // Log activity feed (unassigned)
                const activity = new ActivityFeeds({
                    route_id: id,
                    last_driver_id: originalAssignedDriverId,
                    status: "unassigned",
                    action_time: new Date(),
                });
                await activity.save();
            }
        }

        // Update the route [only the fields have changed] - EXCLUDE assignedDriver_id as it's handled above
        updatableFields.forEach((field) => {
            if (
                Object.prototype.hasOwnProperty.call(data, field) &&
                field !== "assignedDriver_id"
            ) {
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
                // Get driver details for current assignment by custom driver_id
                const driver = await Drivers.findOne({
                    driver_id: route.assignedDriver_id,
                }).lean();
                if (driver) {
                    newActivityFeed.driver = {
                        id: driver.driver_id,
                        name: driver.name,
                    };
                }
            } else if (route.status === "unassigned") {
                // Get driver details for last assignment by custom driver_id
                const lastDriver = await Drivers.findOne({
                    driver_id: route.assignedDriver_id,
                }).lean();
                if (lastDriver) {
                    newActivityFeed.last_driver = {
                        id: lastDriver.driver_id,
                        name: lastDriver.name,
                    };
                }
            }
            await newActivityFeed.save();
        }

        // Update the driver if status changed to assigned (only if not already handled above)
        if (
            route.assignedDriver_id &&
            route.status === "assigned" &&
            data.status === "assigned" &&
            !Object.prototype.hasOwnProperty.call(data, "assignedDriver_id")
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
                        // Get the current route details before unassigning
                        const currentRoute = await Routes.findOne({
                            route_id: driver.assignedRoute_id,
                        });

                        // Simple initialization - no validation
                        driver.pastAssignedRoutes =
                            driver.pastAssignedRoutes || [];

                        const newEntry = {
                            route_id: driver.assignedRoute_id,
                            startLocation:
                                currentRoute?.start_location || "Unknown",
                            endLocation:
                                currentRoute?.end_location || "Unknown",
                            assigned_at: driver.assigned_at
                                ? new Date(driver.assigned_at)
                                : new Date(),
                            unassigned_at: new Date(),
                        };

                        driver.pastAssignedRoutes.push(newEntry);
                    }
                    driver.assignedRoute_id = id;
                    driver.assigned_at = new Date();
                    driver.updated_at = new Date();
                    driver.status = "on_route";

                    // No validation - just save the driver

                    try {
                        await driver.save();
                    } catch (saveError) {
                        throw saveError;
                    }
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
