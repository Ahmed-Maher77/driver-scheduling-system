const express = require("express");
const router = express.Router();
// Import Models
const Routes = require("../models/RoutesModel");
const Drivers = require("../models/DriversModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");
// Import utilities
const generateRouteId = require("../utils/routeIdGenerator");

// Add New Route endpoint
router.post("/", async (req, res) => {
    try {
        // Check the request body isn't empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Please provide data in the request body.",
            });
        }
        const data = req.body;

        // Validate the data format
        if (typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid data format. Please send a JSON object.",
            });
        }

        // Check if the required fields are present
        const requiredFields = [
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
        ];

        const missingFields = requiredFields.filter((field) => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Generate unique route ID
        const routeId = await generateRouteId();

        // Create new route with generated ID
        const newRoute = new Routes({
            route_id: routeId,
            ...data,
        });
        if (data.assignedDriver_id) {
            newRoute.assigned_at = new Date();
            newRoute.status = "assigned";
            newRoute.assignedDriver_id = data.assignedDriver_id;
        }

        // Save to database
        const savedRoute = await newRoute.save();

        // Update driver with new route assignment
        if (data.assignedDriver_id) {
            try {
                const driver = await Drivers.findOne({
                    driver_id: data.assignedDriver_id,
                });
                if (!driver) {
                    // If driver not found, delete the created route and return error
                    await Routes.findByIdAndDelete(savedRoute._id);
                    return res.status(404).json({
                        message: "Driver not found",
                        error: "DRIVER_NOT_FOUND",
                        details: {
                            driver_id: data.assignedDriver_id,
                            suggestion: "Please provide a valid driver ID",
                        },
                    });
                }

                // Check if driver is already assigned to a different route
                if (
                    driver.assignedRoute_id &&
                    driver.assignedRoute_id !== routeId
                ) {
                    // Move current route to past assigned routes
                    if (!driver.pastAssignedRoutes) {
                        driver.pastAssignedRoutes = [];
                    }

                    // Get current route details for past assignment
                    const currentRoute = await Routes.findOne({
                        route_id: driver.assignedRoute_id,
                    });
                    driver.pastAssignedRoutes.push({
                        route_id: driver.assignedRoute_id,
                        startLocation: currentRoute?.start_location || null,
                        endLocation: currentRoute?.end_location || null,
                        assigned_at: driver.assigned_at || null,
                        unassigned_at: new Date(),
                    });

                    // Unassign driver from current route
                    if (currentRoute) {
                        currentRoute.assignedDriver_id = null;
                        currentRoute.status = "pending";
                        await currentRoute.save();
                    }
                }

                // Update driver with new route assignment
                driver.assignedRoute_id = routeId;
                driver.assigned_at = new Date();
                driver.status = "on_route";
                driver.updated_at = new Date();
                await driver.save();
            } catch (driverError) {
                // If driver update fails, delete the created route and return error
                await Routes.findByIdAndDelete(savedRoute._id);
                return res.status(500).json({
                    message: "Failed to assign driver to route",
                    error: "DRIVER_ASSIGNMENT_FAILED",
                    details: {
                        suggestion:
                            "Route was not created due to driver assignment failure",
                    },
                });
            }
        }

        // Update activity feed
        try {
            if (data.assignedDriver_id) {
                // Get driver details for assignment
                const driver = await Drivers.findById(data.assignedDriver_id);
                const newActivityFeed = new ActivityFeeds({
                    route_id: routeId,
                    status: "assigned",
                    action_time: new Date(),
                });

                if (driver) {
                    newActivityFeed.driver = {
                        id: driver.driver_id,
                        name: driver.name,
                    };
                }
                await newActivityFeed.save();
            }
        } catch (activityFeedError) {
            // Continue with route creation even if activity feed update fails
            console.error(
                "Activity feed update failed:",
                activityFeedError.message
            );
        }

        res.status(201).json({
            message: "Route added successfully",
            route: {
                route_id: savedRoute.route_id,
                start_location: savedRoute.start_location,
                end_location: savedRoute.end_location,
                status: savedRoute.status,
                assignedDriver_id: savedRoute.assignedDriver_id,
                assigned_at: savedRoute.assigned_at,
                distance: savedRoute.distance,
                distance_unit: savedRoute.distance_unit,
                created_at: savedRoute.created_at,
            },
        });
    } catch (error) {
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            console.error("Duplicate key error details:", {
                keyPattern: error.keyPattern,
                keyValue: error.keyValue,
                duplicateFields: error.keyPattern
                    ? Object.keys(error.keyPattern)
                    : [],
                duplicateValues: error.keyValue || {},
            });

            return res.status(409).json({
                message: "Duplicate entry detected",
                error: "DUPLICATE_ENTRY",
                details: {
                    duplicate_fields: error.keyPattern
                        ? Object.keys(error.keyPattern)
                        : ["unknown"],
                    duplicate_values: error.keyValue || {},
                    suggestion: "Please check your data and try again.",
                    technical_details: {
                        error_code: error.code,
                        error_name: error.name,
                        key_pattern: error.keyPattern,
                        key_value: error.keyValue,
                    },
                },
            });
        }

        // Handle validation errors
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map((err) => ({
                field: err.path,
                message: err.message,
                value: err.value,
            }));

            return res.status(400).json({
                message: "Validation failed",
                error: "VALIDATION_ERROR",
                details: validationErrors,
            });
        }

        // Handle other errors
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
