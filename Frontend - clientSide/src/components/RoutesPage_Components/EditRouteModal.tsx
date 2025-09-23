import { useState, useEffect } from "react";
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

const EditRouteModal = ({ isOpen, onClose, routeId }: EditRouteModalProps) => {
    const [formData, setFormData] = useState<RouteRow>({
        id: "",
        startLocation: "",
        endLocation: "",
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

    useEffect(() => {
        if (routeId) {
            // get route from api
            // setFormData(routeData);
            // invalidate the routes
        }
    }, [routeId]);

    const handleSubmit = (e?: React.FormEvent) => {
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

        // save route to api
        // formData
        notify("success", "Route edited successfully");
        onClose();
    };

    const handleClose = () => {
        // Reset validation errors when closing
        setValidationErrors({});
        setIsSubmitting(false);
        onClose();
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

    if (!isOpen || !routeId) return null;

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                <ModalHeader title="Edit Route" onClose={handleClose} />

                <FormSection onSubmit={handleSubmit}>
                    {/* Basic Info Section */}
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

                    {/* Note for user */}
                    <p className="text-sm gray-c italic mb-5 mt-[-10px]">
                        <span className="font-semibold">Note:</span> {" "}
                        Assigned Driver fields only appear when status is "assigned"
                    </p>

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
                        lastDriver={formData.lastDriver}
                        onAssignedDriverChange={(driver) => {
                            setFormData((prev) => ({
                                ...prev,
                                assignedDriver: driver,
                            }));
                            clearFieldError("assignedDriver");
                        }}
                        onLastDriverChange={(driver) => {
                            setFormData((prev) => ({
                                ...prev,
                                lastDriver: driver,
                            }));
                            clearFieldError("lastDriver");
                        }}
                        assignedDriverError={validationErrors.assignedDriver}
                        lastDriverError={validationErrors.lastDriver}
                        status={formData.status}
                    />

                    {/* Distance Duration Section */}
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

                    {/* Cost Speed Section */}
                    <CostSpeedSection
                        cost={formData.cost || 0}
                        currency={formData.currency || "EGP"}
                        maxSpeed={formData.maxSpeed || 0}
                        speedUnit={formData.speedUnit || "km/h"}
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

                    {/* Dates Section */}
                    <DatesSection
                        createdAt={formData.createdAt}
                        updatedAt={formData.updatedAt || null}
                        assignedAt={formData.assignedAt || ""}
                    />

                    {/* Modal Actions */}
                    <ModalActions
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        submitLabel={
                            isSubmitting ? "Saving..." : "Save Changes"
                        }
                        isSubmitting={isSubmitting}
                    />
                </FormSection>
            </div>
        </ModalWrapper>
    );
};

export default EditRouteModal;
