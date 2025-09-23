import { useState } from "react";
import type {
    AddRouteModalProps,
    ValidationErrors,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import ModalWrapper from "./SharedModalComponents/ModalWrapper";
import FormSection from "./SharedModalComponents/FormSection";
import ModalHeader from "./AddRouteModal_Components/ModalHeader";
import ModalActions from "./AddRouteModal_Components/ModalActions";
import BasicInfoSection from "./AddRouteModal_Components/BasicInfoSection";
import LocationSection from "./AddRouteModal_Components/LocationSection";
import DriverSection from "./AddRouteModal_Components/DriverSection";
import DistanceDurationSection from "./AddRouteModal_Components/DistanceDurationSection";
import CostSpeedSection from "./AddRouteModal_Components/CostSpeedSection";
import NotesSection from "./AddRouteModal_Components/NotesSection";
import {
    validateForm,
    hasValidationErrors,
} from "./AddRouteModal_Components/validation";
import { checkDriverAvailability } from "../../utils/functions/checkDriverAvailability";

const AddRouteModal = ({ isOpen, onClose, onAddRoute }: AddRouteModalProps) => {
    const [formData, setFormData] = useState({
        startLocation: "",
        endLocation: "",
        status: "unassigned",
        assignedDriver: { id: "" } as {
            id?: string;
            name?: string;
        },
        distance: 0,
        distanceUnit: "km",
        duration: 0,
        timeUnit: "minutes",
        cost: 0,
        currency: "EGP",
        maxSpeed: 0,
        speedUnit: "km/h",
        notes: "",
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {}
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availabilityStatus, setAvailabilityStatus] = useState<
        "unknown" | "available" | "unavailable" | "on_route"
    >("unknown");
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        // Validate form data
        const errors = validateForm(formData);
        setValidationErrors(errors);

        if (hasValidationErrors(errors)) {
            notify(
                "error",
                "Please fix the validation errors before submitting"
            );
            setIsSubmitting(false);
            return;
        }

        // If assigning, verify availability via API at submit time
        if (formData.status === "assigned" && formData.assignedDriver?.id) {
            try {
                setIsCheckingAvailability(true);
                const status = await checkDriverAvailability(
                    formData.assignedDriver.id
                );
                setAvailabilityStatus(status);
                if (status === "available") {
                    onAddRoute(formData);
                } else if (status === "unavailable") {
                    notify("error", "This driver is unavailable");
                    setIsSubmitting(false);
                    setIsCheckingAvailability(false);
                    return;
                } else if (status === "on_route") {
                    notify(
                        "error",
                        "This driver currently has another route assigned"
                    );
                    setIsSubmitting(false);
                    setIsCheckingAvailability(false);
                    return;
                }
            } finally {
                setIsCheckingAvailability(false);
            }
        } else {
            onAddRoute(formData);
        }
        onClose();
    };

    const handleClose = () => {
        // Reset form data and validation errors when closing
        setFormData({
            startLocation: "",
            endLocation: "",
            status: "unassigned",
            assignedDriver: { id: "" } as {
                id?: string;
                name?: string;
            },
            distance: 0,
            distanceUnit: "km",
            duration: 0,
            timeUnit: "minutes",
            cost: 0,
            currency: "EGP",
            maxSpeed: 0,
            speedUnit: "km/h",
            notes: "",
        });
        setValidationErrors({});
        setIsSubmitting(false);
        setAvailabilityStatus("unknown");
        setIsCheckingAvailability(false);
        onClose();
    };

    // Clear validation errors when user starts typing
    const clearFieldError = (field: keyof ValidationErrors) => {
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                <ModalHeader title="Add New Route" onClose={handleClose} />

                <FormSection onSubmit={handleSubmit}>
                    {/* Basic Info Section */}
                    <BasicInfoSection
                        routeId="Auto-generated by backend"
                        status={formData.status}
                        onStatusChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                status: value,
                            }));
                            clearFieldError("status");
                        }}
                        statusError={validationErrors.status}
                    />

                    {/* Note for user */}
                    <p className="text-sm gray-c italic mb-5 mt-[-10px]">
                        <span className="font-semibold">Note:</span> Assigned
                        Driver fields only appear when status is "assigned"
                    </p>

                    {/* Location Section */}
                    <LocationSection
                        startLocation={formData.startLocation}
                        endLocation={formData.endLocation}
                        onStartLocationChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                startLocation: value,
                            }));
                            clearFieldError("startLocation");
                        }}
                        onEndLocationChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                endLocation: value,
                            }));
                            clearFieldError("endLocation");
                        }}
                        startLocationError={validationErrors.startLocation}
                        endLocationError={validationErrors.endLocation}
                    />

                    {/* Driver Section */}
                    <DriverSection
                        assignedDriver={formData.assignedDriver}
                        onAssignedDriverChange={(driver) => {
                            setFormData((prev) => ({
                                ...prev,
                                assignedDriver: driver,
                            }));
                            clearFieldError("assignedDriver");
                            setAvailabilityStatus("unknown");
                        }}
                        assignedDriverError={validationErrors.assignedDriver}
                        status={formData.status}
                        onCheckAvailability={async (driverId) => {
                            if (!driverId) return;
                            setIsCheckingAvailability(true);
                            try {
                                const status = await checkDriverAvailability(
                                    driverId
                                );
                                setAvailabilityStatus(status);
                                if (
                                    status === "unavailable" ||
                                    status === "on_route"
                                ) {
                                    notify(
                                        "error",
                                        status === "unavailable"
                                            ? "Driver is unavailable"
                                            : "Driver is currently on a route"
                                    );
                                } else {
                                    notify("success", "Driver is available");
                                }
                            } finally {
                                setIsCheckingAvailability(false);
                            }
                        }}
                        availabilityStatus={availabilityStatus}
                        isCheckingAvailability={isCheckingAvailability}
                    />

                    {/* Distance Duration Section */}
                    <DistanceDurationSection
                        distance={formData.distance}
                        distanceUnit={formData.distanceUnit}
                        duration={formData.duration}
                        timeUnit={formData.timeUnit}
                        onDistanceChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                distance: value,
                            }));
                            clearFieldError("distance");
                        }}
                        onDistanceUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                distanceUnit: value,
                            }))
                        }
                        onDurationChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                duration: value,
                            }));
                            clearFieldError("duration");
                        }}
                        onTimeUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                timeUnit: value,
                            }))
                        }
                        distanceError={validationErrors.distance}
                        durationError={validationErrors.duration}
                    />

                    {/* Cost Speed Section */}
                    <CostSpeedSection
                        cost={formData.cost}
                        currency={formData.currency}
                        maxSpeed={formData.maxSpeed}
                        speedUnit={formData.speedUnit}
                        onCostChange={(value) => {
                            setFormData((prev) => ({ ...prev, cost: value }));
                            clearFieldError("cost");
                        }}
                        onCurrencyChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                currency: value,
                            }))
                        }
                        onMaxSpeedChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                maxSpeed: value,
                            }));
                            clearFieldError("maxSpeed");
                        }}
                        onSpeedUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                speedUnit: value,
                            }))
                        }
                        costError={validationErrors.cost}
                        maxSpeedError={validationErrors.maxSpeed}
                    />

                    {/* Notes Section */}
                    <NotesSection
                        notes={formData.notes}
                        onNotesChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                notes: value,
                            }));
                            clearFieldError("notes");
                        }}
                        notesError={validationErrors.notes}
                    />

                    {/* Modal Actions */}
                    <ModalActions
                        onCancel={handleClose}
                        submitLabel={isSubmitting ? "Adding..." : "Add Route"}
                        isSubmitting={isSubmitting}
                    />
                </FormSection>
            </div>
        </ModalWrapper>
    );
};

export default AddRouteModal;
