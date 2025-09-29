import { useState, useEffect, useMemo } from "react";
import type {
    EditRouteModalProps,
    RouteRow,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import {
    validateEditForm,
    hasEditValidationErrors,
    type EditValidationErrors,
} from "./EditRouteModal_Components/validation";
import ModalWrapper from "./SharedModalComponents/ModalWrapper";
import FormSection from "./SharedModalComponents/FormSection";
import ModalHeader from "./AddRouteModal_Components/ModalHeader";
import ModalActions from "./AddRouteModal_Components/ModalActions";
import BasicInfoSection from "./EditRouteModal_Components/BasicInfoSection";
import LocationSection from "./AddRouteModal_Components/LocationSection";
import DriverSection from "./EditRouteModal_Components/DriverSection";
import DistanceDurationSection from "./AddRouteModal_Components/DistanceDurationSection";
import CostSpeedSection from "./AddRouteModal_Components/CostSpeedSection";
import NotesSection from "./EditRouteModal_Components/NotesSection";
import DatesSection from "./EditRouteModal_Components/DatesSection";
import { checkDriverAvailability } from "../../utils/functions/checkDriverAvailability";
import useUpdateRoute from "../../utils/hooks/api/useUpdateRoute";
import useGetRouteDetails from "../../utils/hooks/api/useGetRouteDetails";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useUnsavedChanges from "../../utils/hooks/useUnsavedChanges";
import { UnsavedChangesDialog } from "../UnsavedChangesDialog";

const EditRouteModal = ({
    isOpen,
    onClose,
    routeId,
    onRouteUpdated,
}: EditRouteModalProps) => {
    const [formData, setFormData] = useState<RouteRow>({
        id: "",
        start_location: "",
        end_location: "",
        status: "unassigned",
        assignedDriver: undefined,
        lastDriver: undefined,
        createdAt: "",
        updatedAt: null,
        assignedAt: "",
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

    const [validationErrors, setValidationErrors] =
        useState<EditValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availabilityStatus, setAvailabilityStatus] = useState<
        "unknown" | "available" | "unavailable" | "on_route"
    >("unknown");
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [wasUpdated, setWasUpdated] = useState(false);
    const [originalFormData, setOriginalFormData] = useState<RouteRow | null>(
        null
    );

    // Check if form has unsaved changes
    const hasUnsavedChanges = useMemo(() => {
        if (!formData || !originalFormData) return false;
        return JSON.stringify(formData) !== JSON.stringify(originalFormData);
    }, [formData, originalFormData]);

    // Unsaved changes hook
    const { showConfirmDialog, handleExitAttempt, confirmExit, cancelExit } =
        useUnsavedChanges({
            hasUnsavedChanges,
            message:
                "You have unsaved changes. Are you sure you want to leave?",
        });

    // Update Route
    const { updateRoute, isPending: isUpdatingRoute } = useUpdateRoute();
    const { data: routeDetails, isLoading: isLoadingRouteDetails } =
        useGetRouteDetails({ routeId });

    // Get Route Details
    useEffect(() => {
        if (routeDetails) {
            const routeData = {
                id: routeDetails.route_id,
                start_location: routeDetails.start_location,
                end_location: routeDetails.end_location,
                status: routeDetails.status,
                assignedDriver: routeDetails.assignedDriver,
                lastDriver: routeDetails.lastDriver || undefined,
                createdAt: routeDetails.created_at,
                updatedAt: routeDetails.updated_at,
                assignedAt: routeDetails.assigned_at,
                distance: routeDetails.distance,
                distanceUnit: routeDetails.distance_unit,
                duration: routeDetails.duration,
                timeUnit: routeDetails.time_unit,
                cost: routeDetails.cost,
                currency: routeDetails.currency,
                maxSpeed: routeDetails.max_speed,
                speedUnit: routeDetails.speed_unit,
                notes: routeDetails.notes,
            };
            setFormData(routeData);
            setOriginalFormData(routeData); // Set original form data for comparison
        }
    }, [routeDetails]);

    // Reset Modal on Close
    useEffect(() => {
        if (!isOpen && wasUpdated) {
            setFormData({
                id: "",
                start_location: "",
                end_location: "",
                status: "unassigned",
                assignedDriver: undefined,
                lastDriver: undefined,
                createdAt: "",
                updatedAt: null,
                assignedAt: "",
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
            setIsCheckingAvailability(false);
            setAvailabilityStatus("unknown");
            setWasUpdated(false);
        }
    }, [isOpen, wasUpdated]);

    // Handle Submit (Edit Route)
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        // Validate form data
        const errors = validateEditForm(formData);
        setValidationErrors(errors);
        if (hasEditValidationErrors(errors)) {
            notify(
                "error",
                "Please fix the validation errors before submitting"
            );
            setIsSubmitting(false);
            return;
        }

        // If assigning, verify availability via API at submit time (only if driver ID is provided)
        if (
            formData.status === "assigned" &&
            formData.assignedDriver?.id?.trim()
        ) {
            try {
                setIsCheckingAvailability(true);
                const status = await checkDriverAvailability(
                    formData.assignedDriver.id,
                    formData.id
                );
                setAvailabilityStatus(status);
                if (status === "available") {
                    // save route to api
                    const updatedRouteData = {
                        start_location: formData.start_location,
                        end_location: formData.end_location,
                        status: formData.status,
                        assignedDriver_id: formData.assignedDriver?.id || null,
                        lastDriver_id: formData.lastDriver?.id || null,
                        created_at: formData.createdAt,
                        updated_at: formData.updatedAt,
                        assigned_at: formData.assignedAt,
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
                        await updateRoute({
                            routeId: formData.id,
                            routeData: updatedRouteData,
                        });
                        onRouteUpdated?.();
                        setWasUpdated(true);
                        onClose();
                    } catch {
                        // Error is already handled by the mutation hook's onError
                        // Just reset the submitting state
                        setIsSubmitting(false);
                        setIsCheckingAvailability(false);
                        return;
                    }
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
            // No driver assignment or empty driver ID - proceed without availability check
            // If status is "assigned" but no driver ID, change to "unassigned"
            const finalStatus =
                formData.status === "assigned" &&
                !formData.assignedDriver?.id?.trim()
                    ? "unassigned"
                    : formData.status;

            const updatedRouteData = {
                start_location: formData.start_location,
                end_location: formData.end_location,
                status: finalStatus,
                assignedDriver_id: formData.assignedDriver?.id || null,
                lastDriver_id: formData.lastDriver?.id || null,
                created_at: formData.createdAt,
                updated_at: formData.updatedAt,
                assigned_at: formData.assignedAt,
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
                await updateRoute({
                    routeId: formData.id,
                    routeData: updatedRouteData,
                });
                onRouteUpdated?.();
                setWasUpdated(true);
                onClose();
            } catch {
                // Error is already handled by the mutation hook's onError
                // Just reset the submitting state
                setIsSubmitting(false);
                return;
            }
        }
    };

    // Close Modal
    const handleClose = () => {
        handleExitAttempt(() => {
            // Reset validation errors when closing
            setValidationErrors({});
            setIsSubmitting(false);
            setAvailabilityStatus("unknown");
            setIsCheckingAvailability(false);
            onClose();
        });
    };

    // Clear validation errors when user starts typing
    const clearFieldError = (field: keyof EditValidationErrors) => {
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <ModalWrapper isOpen={isOpen}>
                <div className="p-6">
                    <ModalHeader title="Edit Route" onClose={handleClose} />

                    {/* ================== Loading State ================== */}
                    {isLoadingRouteDetails && (
                        <LoadingSpinner message="Loading route details..." />
                    )}

                    {/* ================== Form Section ================== */}
                    <FormSection onSubmit={handleSubmit}>
                        {/* ================== Basic Info Section ================== */}
                        <BasicInfoSection
                            routeId={formData.id}
                            status={formData.status}
                            onStatusChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    status: value as
                                        | "assigned"
                                        | "unassigned"
                                        | "in progress",
                                }));
                                clearFieldError("status");
                            }}
                            statusError={validationErrors.status}
                        />

                        {/* ================== Note for user ================== */}
                        <p className="text-sm gray-c italic mb-5 mt-[-10px]">
                            <span className="font-semibold">Note:</span>{" "}
                            Assigned Driver fields only appear when status is
                            "assigned"
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
                            }}
                            onEndLocationChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    end_location: value,
                                }));
                                clearFieldError("endLocation");
                            }}
                            startLocationError={validationErrors.startLocation}
                            endLocationError={validationErrors.endLocation}
                        />

                        {/* ================== Driver Section ================== */}
                        <DriverSection
                            assignedDriver={formData.assignedDriver}
                            lastDriver={formData.lastDriver}
                            onAssignedDriverChange={(driver) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    assignedDriver: driver,
                                }));
                                clearFieldError("assignedDriver");
                                setAvailabilityStatus("unknown");
                            }}
                            onLastDriverChange={(driver) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    lastDriver: driver,
                                }));
                                clearFieldError("lastDriver");
                            }}
                            assignedDriverError={
                                validationErrors.assignedDriver
                            }
                            lastDriverError={validationErrors.lastDriver}
                            status={formData.status}
                            onCheckAvailability={async (driverId) => {
                                if (!driverId) return;
                                setIsCheckingAvailability(true);
                                try {
                                    const status =
                                        await checkDriverAvailability(
                                            driverId,
                                            formData.id
                                        );
                                    setAvailabilityStatus(status);
                                    if (status === "unavailable") {
                                        notify(
                                            "error",
                                            "Driver is unavailable"
                                        );
                                    } else if (status === "on_route") {
                                        notify(
                                            "error",
                                            "Driver is currently on a route"
                                        );
                                    } else {
                                        notify(
                                            "success",
                                            "Driver is available"
                                        );
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
                            distance={formData.distance || 0}
                            distanceUnit={formData.distanceUnit || "km"}
                            duration={formData.duration || 0}
                            timeUnit={formData.timeUnit || "minutes"}
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
                            cost={formData.cost || 0}
                            currency={formData.currency || "EGP"}
                            maxSpeed={formData.maxSpeed || 0}
                            speedUnit={formData.speedUnit || "km/h"}
                            onCostChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    cost: value,
                                }));
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
                            notes={formData.notes || ""}
                            onNotesChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    notes: value,
                                }));
                                clearFieldError("notes");
                            }}
                            notesError={validationErrors.notes}
                        />

                        {/* ================== Dates Section ================== */}
                        <DatesSection
                            createdAt={formData.createdAt}
                            updatedAt={formData.updatedAt || null}
                            assignedAt={formData.assignedAt || ""}
                        />

                        {/* ================== Modal Actions ================== */}
                        <ModalActions
                            onCancel={handleClose}
                            onSubmit={handleSubmit}
                            submitLabel={
                                isSubmitting || isUpdatingRoute
                                    ? "Saving..."
                                    : "Save Changes"
                            }
                            isSubmitting={isSubmitting || isUpdatingRoute}
                        />
                    </FormSection>
                </div>
            </ModalWrapper>

            {/* Unsaved Changes Dialog */}
            <UnsavedChangesDialog
                isOpen={showConfirmDialog}
                onConfirm={confirmExit}
                onCancel={cancelExit}
                message="You have unsaved changes. Are you sure you want to leave?"
                confirmText="Leave"
                cancelText="Stay"
            />
        </>
    );
};

export default EditRouteModal;
