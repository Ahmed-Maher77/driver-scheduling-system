import type { RouteRow } from "../../../common/Types/Interfaces";

export interface EditValidationErrors {
    startLocation?: string;
    endLocation?: string;
    distance?: string;
    duration?: string;
    cost?: string;
    maxSpeed?: string;
    status?: string;
    assignedDriver?: string;
    lastDriver?: string;
    notes?: string;
}

export const validateEditForm = (formData: RouteRow): EditValidationErrors => {
    const errors: EditValidationErrors = {};

    // Start Location validation
    if (!formData.start_location?.trim()) {
        errors.startLocation = "Start location is required";
    } else if (formData.start_location.trim().length < 2) {
        errors.startLocation = "Start location must be at least 2 characters";
    }

    // End Location validation
    if (!formData.end_location?.trim()) {
        errors.endLocation = "End location is required";
    } else if (formData.end_location.trim().length < 2) {
        errors.endLocation = "End location must be at least 2 characters";
    }

    // Check if start and end locations are the same
    if (
        formData.start_location?.trim() &&
        formData.end_location?.trim() &&
        formData.start_location.trim().toLowerCase() ===
            formData.end_location.trim().toLowerCase()
    ) {
        errors.endLocation =
            "End location must be different from start location";
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

    // Status validation
    const validStatuses = ["assigned", "unassigned", "in progress"];
    if (!formData.status || !validStatuses.includes(formData.status)) {
        errors.status = "Please select a valid status";
    }

    // Assigned Driver validation - Only required when status is "assigned"
    if (formData.status === "assigned") {
        if (!formData.assignedDriver?.id?.trim()) {
            errors.assignedDriver =
                "Assigned driver ID is required for assigned routes";
        } else if (formData.assignedDriver.id.trim().length < 2) {
            errors.assignedDriver = "Driver ID must be at least 2 characters";
        }

        if (!formData.assignedDriver?.name?.trim()) {
            errors.assignedDriver =
                "Assigned driver name is required for assigned routes";
        } else if (formData.assignedDriver.name.trim().length < 2) {
            errors.assignedDriver = "Driver name must be at least 2 characters";
        }
    }

    // Last Driver validation (optional but if provided, must be valid)
    if (formData.lastDriver?.id || formData.lastDriver?.name) {
        if (!formData.lastDriver.id?.trim()) {
            errors.lastDriver =
                "Last driver ID is required when last driver name is provided";
        } else if (formData.lastDriver.id.trim().length < 2) {
            errors.lastDriver = "Last driver ID must be at least 2 characters";
        }

        if (!formData.lastDriver.name?.trim()) {
            errors.lastDriver =
                "Last driver name is required when last driver ID is provided";
        } else if (formData.lastDriver.name.trim().length < 2) {
            errors.lastDriver =
                "Last driver name must be at least 2 characters";
        }
    }

    // Notes validation (optional but if provided, must be reasonable length)
    if (formData.notes && formData.notes.length > 1000) {
        errors.notes = "Notes cannot exceed 1000 characters";
    }

    return errors;
};

export const hasEditValidationErrors = (
    errors: EditValidationErrors
): boolean => {
    return Object.keys(errors).length > 0;
};
