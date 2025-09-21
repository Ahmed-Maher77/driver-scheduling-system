import { useState } from "react";
import type { AddRouteModalProps } from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import ModalWrapper from "./SharedModalComponents/ModalWrapper";
import FormSection from "./SharedModalComponents/FormSection";
import ModalHeader from "./AddRouteModal_Components/ModalHeader";
import ModalActions from "./AddRouteModal_Components/ModalActions";
import BasicInfoSection from "./AddRouteModal_Components/BasicInfoSection";
import LocationSection from "./AddRouteModal_Components/LocationSection";
import DistanceDurationSection from "./AddRouteModal_Components/DistanceDurationSection";
import CostSpeedSection from "./AddRouteModal_Components/CostSpeedSection";
import {
    validateForm,
    hasValidationErrors,
    type ValidationErrors,
} from "./AddRouteModal_Components/validation";

const AddRouteModal = ({ isOpen, onClose, onAddRoute }: AddRouteModalProps) => {
    const [formData, setFormData] = useState({
        startLocation: "",
        endLocation: "",
        distance: 0,
        distanceUnit: "km",
        duration: 0,
        timeUnit: "minutes",
        cost: 0,
        currency: "EGP",
        maxSpeed: 0,
        speedUnit: "km/h",
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {}
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e?: React.FormEvent) => {
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

        // Call the onAddRoute function with the form data
        onAddRoute(formData);
        onClose();
    };

    const handleClose = () => {
        // Reset form data and validation errors when closing
        setFormData({
            startLocation: "",
            endLocation: "",
            distance: 0,
            distanceUnit: "km",
            duration: 0,
            timeUnit: "minutes",
            cost: 0,
            currency: "EGP",
            maxSpeed: 0,
            speedUnit: "km/h",
        });
        setValidationErrors({});
        setIsSubmitting(false);
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

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                <ModalHeader title="Add New Route" onClose={handleClose} />

                <FormSection onSubmit={handleSubmit}>
                    <BasicInfoSection />

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

                    <ModalActions
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        submitLabel={isSubmitting ? "Adding..." : "Add Route"}
                        isSubmitting={isSubmitting}
                    />
                </FormSection>
            </div>
        </ModalWrapper>
    );
};

export default AddRouteModal;
