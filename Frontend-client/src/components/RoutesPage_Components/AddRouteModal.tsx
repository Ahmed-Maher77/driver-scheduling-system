import { useState, useEffect, useRef } from "react";
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
        start_location: "",
        end_location: "",
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
    const [submitError, setSubmitError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Scroll to top when error is displayed
    useEffect(() => {
        if (submitError && modalRef.current) {
            // Small delay to ensure the error div is rendered
            setTimeout(() => {
                modalRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }, [submitError]);

    // Handle Submit (Add Route)
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null); // Clear any previous errors
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
                    const submittedData = {
                        start_location: formData.start_location,
                        end_location: formData.end_location,
                        status: formData.status,
                        assignedDriver_id: formData.assignedDriver?.id,
                        distance: formData.distance,
                        distance_unit: formData.distanceUnit,
                        duration: formData.duration,
                        time_unit: formData.timeUnit,
                        cost: formData.cost,
                        currency: formData.currency,
                        max_speed: formData.maxSpeed,
                        speed_unit: formData.speedUnit,
                        notes: formData.notes,
                    };

                    try {
                        await onAddRoute(submittedData);
                        // Reset form and close modal on success
                        setFormData({
                            start_location: "",
                            end_location: "",
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
                        setAvailabilityStatus("unknown");
                        setIsCheckingAvailability(false);
                        setSubmitError(null);
                        onClose();
                    } catch (error: any) {
                        // Handle error and show it in the modal
                        const errorMessage =
                            error?.response?.data?.message ||
                            error?.message ||
                            "Failed to add route";
                        setSubmitError(errorMessage);
                        setIsSubmitting(false);
                        setIsCheckingAvailability(false);
                        return;
                    }
                } else if (status === "unavailable") {
                    setSubmitError("This driver is unavailable");
                    setIsSubmitting(false);
                    setIsCheckingAvailability(false);
                    return;
                } else if (status === "on_route") {
                    setSubmitError(
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
            const submittedData = {
                start_location: formData.start_location,
                end_location: formData.end_location,
                status: formData.status,
                assignedDriver_id: formData.assignedDriver?.id,
                distance: formData.distance,
                distance_unit: formData.distanceUnit,
                duration: formData.duration,
                time_unit: formData.timeUnit,
                cost: formData.cost,
                currency: formData.currency,
                max_speed: formData.maxSpeed,
                speed_unit: formData.speedUnit,
                notes: formData.notes,
            };

            try {
                await onAddRoute(submittedData);
                // Reset form and close modal on success
                setFormData({
                    start_location: "",
                    end_location: "",
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
                setAvailabilityStatus("unknown");
                setIsCheckingAvailability(false);
                setSubmitError(null);
                onClose();
            } catch (error: any) {
                // Handle error and show it in the modal
                const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to add route";
                setSubmitError(errorMessage);
                setIsSubmitting(false);
                return;
            }
        }
        setIsSubmitting(false);
    };

    // Close Modal
    const handleClose = () => {
        // Reset form data and validation errors when closing
        setFormData({
            start_location: "",
            end_location: "",
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
        setSubmitError(null);
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

    // Clear submit error when user starts typing
    const clearSubmitError = () => {
        if (submitError) {
            setSubmitError(null);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper isOpen={isOpen}>
            <div ref={modalRef} className="p-6">
                <ModalHeader title="Add New Route" onClose={handleClose} />

                {/* ================== Error Display ================== */}
                {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center">
                            <i className="fa-solid fa-exclamation-triangle text-red-500 mr-2"></i>
                            <p className="text-red-700 text-sm font-medium">
                                {submitError === "Duplicate entry detected"
                                    ? "A route with the same start and end location already exists"
                                    : submitError}
                            </p>
                        </div>
                    </div>
                )}

                <FormSection onSubmit={handleSubmit}>
                    {/* ================== Basic Info Section ================== */}
                    <BasicInfoSection
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

                    {/* ================== Note for user ================== */}
                    <p className="text-sm gray-c italic mb-5 mt-[-10px]">
                        <span className="font-semibold">Note:</span> Assigned
                        Driver fields only appear when status is "assigned"
                    </p>

                    {/* ================== Location Section ================== */}
                    <LocationSection
                        startLocation={formData.start_location}
                        endLocation={formData.end_location}
                        onStartLocationChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                start_location: value,
                            }));
                            clearFieldError("startLocation");
                            clearSubmitError();
                        }}
                        onEndLocationChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                end_location: value,
                            }));
                            clearFieldError("endLocation");
                            clearSubmitError();
                        }}
                        startLocationError={validationErrors.startLocation}
                        endLocationError={validationErrors.endLocation}
                    />

                    {/* ================== Driver Section ================== */}
                    <DriverSection
                        assignedDriver={formData.assignedDriver}
                        onAssignedDriverChange={(driver) => {
                            setFormData((prev) => ({
                                ...prev,
                                assignedDriver: driver,
                            }));
                            clearFieldError("assignedDriver");
                            clearSubmitError();
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

                    {/* ================== Distance Duration Section ================== */}
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

                    {/* ================== Cost Speed Section ================== */}
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

                    {/* ================== Notes Section ================== */}
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

                    {/* ================== Modal Actions ================== */}
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
