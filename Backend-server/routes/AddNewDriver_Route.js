const express = require("express");
const router = express.Router();
// Import Models
const Drivers = require("../models/DriversModel");
const ActivityFeeds = require("../models/ActivityFeedsModel");
const Routes = require("../models/RoutesModel");
// Import utilities
const generateDriverId = require("../utils/driverIdGenerator");

// Add New Driver endpoint
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
            "name",
            "phone",
            "status",
            "national_id",
            "gender",
            "date_of_birth",
            "driving_license",
            "vehicle",
        ];

        const missingFields = requiredFields.filter((field) => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Validate driving_license object structure
        if (data.driving_license && typeof data.driving_license === "object") {
            const licenseRequiredFields = [
                "type",
                "number",
                "expiration",
                "image",
            ];
            const missingLicenseFields = licenseRequiredFields.filter(
                (field) => !data.driving_license[field]
            );

            if (missingLicenseFields.length > 0) {
                return res.status(400).json({
                    message: `Missing required driving license fields: ${missingLicenseFields.join(
                        ", "
                    )}`,
                });
            }
        }

        // Validate vehicle object structure
        if (data.vehicle && typeof data.vehicle === "object") {
            const vehicleRequiredFields = [
                "type",
                "make",
                "model",
                "year",
                "color",
            ];
            const missingVehicleFields = vehicleRequiredFields.filter(
                (field) => !data.vehicle[field]
            );

            if (missingVehicleFields.length > 0) {
                return res.status(400).json({
                    message: `Missing required vehicle fields: ${missingVehicleFields.join(
                        ", "
                    )}`,
                });
            }
        }

        // Check for duplicate driver (same national_id or phone)
        const existingDriver = await Drivers.findOne({
            $or: [{ national_id: data.national_id }, { phone: data.phone }],
        });

        if (existingDriver) {
            return res.status(409).json({
                message: "Driver already exists",
                error: "DUPLICATE_DRIVER",
                details: {
                    existing_driver_id: existingDriver.driver_id,
                    duplicate_field:
                        existingDriver.national_id === data.national_id
                            ? "national_id"
                            : "phone",
                    suggestion:
                        "A driver with the same national ID or phone number already exists.",
                },
            });
        }
        // Generate custom driver ID
        const driverId = await generateDriverId();

        // Create new driver with generated ID
        const newDriver = new Drivers({
            driver_id: driverId,
            ...data,
        });

        // Save to database
        const savedDriver = await newDriver.save();

        try {
            // Update Route's data
            if (data.assignedRoute_id) {
                const route = await Routes.findOne({
                    route_id: data.assignedRoute_id,
                });
                if (!route) {
                    return res.status(404).json({
                        message: "Route not found",
                        error: "ROUTE_NOT_FOUND",
                        details: {
                            route_id: data.assignedRoute_id,
                            suggestion: "Please provide a valid route ID",
                        },
                    });
                }
                route.lastDriver_id =
                    route.assignedDriver_id || route.lastDriver_id;
                route.assignedDriver_id = savedDriver.driver_id;
                route.status = "assigned";
                route.assigned_at = new Date();
                await route.save();
            }
        } catch (routeError) {
            // Continue with driver creation even if route update fails
        }

        // Update activity feed ["assigned" route]
        try {
            if (data.assignedRoute_id) {
                const newActivityFeed = new ActivityFeeds({
                    route_id: data.assignedRoute_id,
                    status: "assigned",
                    driver_id: savedDriver.driver_id,
                    action_time: new Date(),
                });
                await newActivityFeed.save();
            }
        } catch (activityFeedError) {
            // Continue with driver creation even if activity feed update fails
        }

        res.status(201).json({
            message: "Driver added successfully",
            driver: savedDriver,
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
            // Check which field caused the duplicate
            if (error.keyPattern && error.keyPattern.driver_id) {
                return res.status(409).json({
                    message: "Driver ID already exists. Please try again.",
                    error: "DUPLICATE_DRIVER_ID",
                    details: {
                        duplicate_field: "driver_id",
                        suggestion:
                            "This is a rare error. Please try again or contact support.",
                    },
                });
            } else if (error.keyPattern && error.keyPattern.national_id) {
                return res.status(409).json({
                    message: "Driver already exists",
                    error: "DUPLICATE_NATIONAL_ID",
                    details: {
                        duplicate_field: "national_id",
                        suggestion:
                            "A driver with this national ID already exists.",
                    },
                });
            } else if (error.keyPattern && error.keyPattern.phone) {
                return res.status(409).json({
                    message: "Driver already exists",
                    error: "DUPLICATE_PHONE",
                    details: {
                        duplicate_field: "phone",
                        suggestion:
                            "A driver with this phone number already exists.",
                    },
                });
            } else if (
                error.keyPattern &&
                error.keyPattern["driving_license.number"]
            ) {
                return res.status(409).json({
                    message: "Driving license number already exists",
                    error: "DUPLICATE_LICENSE_NUMBER",
                    details: {
                        duplicate_field: "driving_license.number",
                        suggestion:
                            "A driver with this license number already exists.",
                    },
                });
            } else {
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
