const express = require("express");
const router = express.Router();

// Import Models
const Drivers = require("../models/DriversModel");
const Routes = require("../models/RoutesModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validate params and body
        if (!id) {
            return res.status(400).json({ message: "driver_id is required" });
        }
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "body is required" });
        }
        if (typeof data !== "object") {
            return res.status(400).json({ message: "data must be an object" });
        }

        // // Check if the required fields are present
        // const requiredFields = [
        //     "name",
        //     "phone",
        //     "status",
        //     "picture",
        //     "gender",
        //     "date_of_birth",
        //     "driving_license",
        //     "vehicle",
        //     "notes",
        // ];
        // const missingFields = requiredFields.filter((field) => !data[field]);
        // if (missingFields.length > 0) {
        //     return res.status(400).json({
        //         message: `Missing required fields: ${missingFields.join(", ")}`,
        //     });
        // }

        // Fetch driver (case-insensitive)
        const driver = await Drivers.findOne({
            driver_id: { $regex: new RegExp(`^${id}$`, "i") },
        });
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        // Track updated fields to shape the response
        const updatedFields = {};

        // Preserve original assignment for comparison
        const originalAssignedRouteId = driver.assignedRoute_id || null;
        const incomingAssignedRouteId = Object.prototype.hasOwnProperty.call(
            data,
            "assignedRoute_id"
        )
            ? data.assignedRoute_id
            : undefined; // undefined means no change requested

        // Updatable fields whitelist (excluding system-managed fields)
        const updatableFields = [
            "name",
            "picture",
            "phone",
            "address",
            "country",
            "city",
            "contact_channels",
            "status",
            "gender",
            "date_of_birth",
            "driving_license",
            "vehicle",
            "notes",
        ];

        updatableFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(data, field)) {
                if (driver[field] !== data[field]) {
                    driver[field] = data[field];
                    updatedFields[field] = driver[field];
                }
            }
        });

        // Handle status change to unavailable - unassign from current route
        if (data.status === "unavailable" && driver.assignedRoute_id) {
            // Get the current route before unassigning
            const currentRoute = await Routes.findOne({
                route_id: driver.assignedRoute_id,
            });

            if (currentRoute) {
                // Save current driver as last driver before unassigning
                currentRoute.lastDriver_id = driver.driver_id;
                currentRoute.assignedDriver_id = null;
                currentRoute.status = "unassigned";
                currentRoute.updated_at = new Date();
                await currentRoute.save();

                // Add to pastAssignedRoutes
                driver.pastAssignedRoutes = driver.pastAssignedRoutes || [];

                // Clean up any corrupted entries in pastAssignedRoutes
                driver.pastAssignedRoutes = driver.pastAssignedRoutes.filter(
                    (entry) =>
                        entry &&
                        entry.route_id &&
                        entry.startLocation &&
                        entry.endLocation &&
                        entry.assigned_at &&
                        entry.unassigned_at
                );

                driver.pastAssignedRoutes.push({
                    route_id: driver.assignedRoute_id,
                    startLocation: currentRoute.start_location || "Unknown",
                    endLocation: currentRoute.end_location || "Unknown",
                    assigned_at: driver.assigned_at
                        ? new Date(driver.assigned_at)
                        : new Date(),
                    unassigned_at: new Date(),
                });

                // Log activity feed (unassigned due to unavailability)
                const activity = new ActivityFeeds({
                    route_id: currentRoute.route_id,
                    last_driver_id: driver.driver_id,
                    status: "unassigned",
                    action_time: new Date(),
                });
                await activity.save();
            }

            // Unassign driver from route
            driver.assignedRoute_id = null;
            driver.assigned_at = null;
            updatedFields.assignedRoute_id = driver.assignedRoute_id;
            updatedFields.assigned_at = driver.assigned_at;
        }

        // Handle assignment changes if requested
        if (incomingAssignedRouteId !== undefined) {
            // Assign to a route
            if (incomingAssignedRouteId) {
                // Validate route
                const route = await Routes.findOne({
                    route_id: incomingAssignedRouteId,
                });
                if (!route) {
                    return res.status(404).json({
                        message: "Route not found",
                        error: "ROUTE_NOT_FOUND",
                        details: {
                            suggestion: "Please provide a valid route ID",
                        },
                    });
                }

                // Prevent conflicting assignment on the route
                if (
                    route.assignedDriver_id &&
                    route.assignedDriver_id !== driver.driver_id
                ) {
                    return res.status(400).json({
                        message:
                            "Route already has a different driver assigned",
                        error: "ROUTE_ALREADY_ASSIGNED",
                        details: { currentDriverId: route.assignedDriver_id },
                    });
                }

                // If driver is already assigned to a different route, move it to past
                if (
                    originalAssignedRouteId &&
                    originalAssignedRouteId !== incomingAssignedRouteId
                ) {
                    // Get the current route details before unassigning
                    const currentRoute = await Routes.findOne({
                        route_id: originalAssignedRouteId,
                    });

                    driver.pastAssignedRoutes = driver.pastAssignedRoutes || [];

                    driver.pastAssignedRoutes.push({
                        route_id: originalAssignedRouteId,
                        startLocation:
                            currentRoute?.start_location || "Unknown",
                        endLocation: currentRoute?.end_location || "Unknown",
                        assigned_at: driver.assigned_at
                            ? new Date(driver.assigned_at)
                            : new Date(),
                        unassigned_at: new Date(),
                    });
                }

                // Apply assignment
                // Save current driver as last driver before assigning new one
                if (
                    route.assignedDriver_id &&
                    route.assignedDriver_id !== driver.driver_id
                ) {
                    route.lastDriver_id = route.assignedDriver_id;
                }
                route.assignedDriver_id = driver.driver_id;
                route.status = "assigned";
                route.assigned_at = new Date();
                await route.save();

                driver.assignedRoute_id = incomingAssignedRouteId;
                driver.assigned_at = new Date();
                driver.status = "on_route";

                updatedFields.assignedRoute_id = driver.assignedRoute_id;
                updatedFields.assigned_at = driver.assigned_at;
                updatedFields.status = driver.status;

                // Log activity feed (assigned)
                const activity = new ActivityFeeds({
                    route_id: route.route_id,
                    driver_id: driver.driver_id,
                    status: "assigned",
                    action_time: new Date(),
                });
                await activity.save();
            } else {
                // Unassign (incomingAssignedRouteId === null)
                if (originalAssignedRouteId) {
                    // Update the route to remove driver
                    const route = await Routes.findOne({
                        route_id: originalAssignedRouteId,
                    });
                    if (route) {
                        // Save current driver as last driver before unassigning
                        if (route.assignedDriver_id) {
                            route.lastDriver_id = route.assignedDriver_id;
                        }
                        route.assignedDriver_id = null;
                        route.status = "pending";
                        await route.save();

                        // Log activity feed (unassigned)
                        const activity = new ActivityFeeds({
                            route_id: route.route_id,
                            last_driver_id: driver.driver_id,
                            status: "unassigned",
                            action_time: new Date(),
                        });
                        await activity.save();
                    }

                    driver.pastAssignedRoutes = driver.pastAssignedRoutes || [];

                    driver.pastAssignedRoutes.push({
                        route_id: originalAssignedRouteId,
                        startLocation: route?.start_location || "Unknown",
                        endLocation: route?.end_location || "Unknown",
                        assigned_at: driver.assigned_at
                            ? new Date(driver.assigned_at)
                            : new Date(),
                        unassigned_at: new Date(),
                    });
                }

                driver.assignedRoute_id = null;
                driver.status = "available";
                driver.assigned_at = null;

                updatedFields.assignedRoute_id = driver.assignedRoute_id;
                updatedFields.status = driver.status;
                updatedFields.assigned_at = driver.assigned_at;
            }
        }

        // Finalize update timestamps
        driver.updated_at = new Date();
        updatedFields.updated_at = driver.updated_at;
        await driver.save();

        return res.status(200).json({
            message: "Driver updated successfully",
            driver: {
                driver_id: driver.driver_id,
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
