import type { AddRouteItemProps, ValidationErrors } from "../../../common/Types/Interfaces";

export const validateForm = (formData: AddRouteItemProps): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Start Location validation
    if (!formData.startLocation?.trim()) {
        errors.startLocation = "Start location is required";
    } else if (formData.startLocation.trim().length < 2) {
        errors.startLocation = "Start location must be at least 2 characters";
    }

    // End Location validation
    if (!formData.endLocation?.trim()) {
        errors.endLocation = "End location is required";
    } else if (formData.endLocation.trim().length < 2) {
        errors.endLocation = "End location must be at least 2 characters";
    }

    // Check if start and end locations are the same
    if (
        formData.startLocation?.trim() &&
        formData.endLocation?.trim() &&
        formData.startLocation.trim().toLowerCase() ===
            formData.endLocation.trim().toLowerCase()
    ) {
        errors.endLocation =
            "End location must be different from start location";
    }

    // Status validation
    const validStatuses = ["assigned", "unassigned", "in progress"];
    if (!formData.status || !validStatuses.includes(formData.status)) {
        errors.status = "Please select a valid status";
    }

    // Assigned Driver validation - Optional but if provided, must be valid
    if (formData.assignedDriver?.id) {
        if (!formData.assignedDriver.id.trim()) {
            errors.assignedDriver = "Driver ID cannot be empty";
        } else if (formData.assignedDriver.id.trim().length < 2) {
            errors.assignedDriver = "Driver ID must be at least 2 characters";
        }
    }

    // Distance validation
    if (!formData.distance || formData.distance <= 0) {
        errors.distance = "Distance must be greater than 0";
    } else if (formData.distance > 10000) {
        errors.distance = "Distance cannot exceed 10,000 units";
    }

    // Duration validation
    if (!formData.duration || formData.duration <= 0) {
        errors.duration = "Duration must be greater than 0";
    } else if (formData.duration > 1440) {
        // 24 hours in minutes
        errors.duration = "Duration cannot exceed 24 hours (1440 minutes)";
    }

    // Cost validation
    if (!formData.cost || formData.cost <= 0) {
        errors.cost = "Cost must be greater than 0";
    } else if (formData.cost > 1000000) {
        errors.cost = "Cost cannot exceed 1,000,000";
    }

    // Max Speed validation
    if (!formData.maxSpeed || formData.maxSpeed <= 0) {
        errors.maxSpeed = "Max speed must be greater than 0";
    } else if (formData.maxSpeed > 500) {
        errors.maxSpeed = "Max speed cannot exceed 500 km/h";
    }

    // Notes validation (optional but if provided, must be reasonable length)
    if (formData.notes && formData.notes.length > 1000) {
        errors.notes = "Notes cannot exceed 1000 characters";
    }

    return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length > 0;
};
