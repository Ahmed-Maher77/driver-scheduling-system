export interface ValidationErrors {
    startLocation?: string;
    endLocation?: string;
    distance?: string;
    duration?: string;
    cost?: string;
    maxSpeed?: string;
}

export interface FormData {
    startLocation: string;
    endLocation: string;
    distance: number;
    duration: number;
    cost: number;
    maxSpeed: number;
}

export const validateForm = (formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Start Location validation
    if (!formData.startLocation.trim()) {
        errors.startLocation = "Start location is required";
    } else if (formData.startLocation.trim().length < 2) {
        errors.startLocation = "Start location must be at least 2 characters";
    }

    // End Location validation
    if (!formData.endLocation.trim()) {
        errors.endLocation = "End location is required";
    } else if (formData.endLocation.trim().length < 2) {
        errors.endLocation = "End location must be at least 2 characters";
    }

    // Check if start and end locations are the same
    if (
        formData.startLocation.trim() &&
        formData.endLocation.trim() &&
        formData.startLocation.trim().toLowerCase() ===
            formData.endLocation.trim().toLowerCase()
    ) {
        errors.endLocation =
            "End location must be different from start location";
    }

    // Distance validation
    if (formData.distance <= 0) {
        errors.distance = "Distance must be greater than 0";
    } else if (formData.distance > 10000) {
        errors.distance = "Distance cannot exceed 10,000 units";
    }

    // Duration validation
    if (formData.duration <= 0) {
        errors.duration = "Duration must be greater than 0";
    } else if (formData.duration > 1440) {
        // 24 hours in minutes
        errors.duration = "Duration cannot exceed 24 hours (1440 minutes)";
    }

    // Cost validation
    if (formData.cost <= 0) {
        errors.cost = "Cost must be greater than 0";
    } else if (formData.cost > 1000000) {
        errors.cost = "Cost cannot exceed 1,000,000";
    }

    // Max Speed validation
    if (formData.maxSpeed <= 0) {
        errors.maxSpeed = "Max speed must be greater than 0";
    } else if (formData.maxSpeed > 500) {
        errors.maxSpeed = "Max speed cannot exceed 500 km/h";
    }

    return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length > 0;
};
