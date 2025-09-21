import { useState, useEffect } from "react";
import type {
    EditRouteModalProps,
    RouteRow,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import ModalWrapper from "./SharedModalComponents/ModalWrapper";
import FormSection from "./SharedModalComponents/FormSection";
import ModalHeader from "./AddRouteModal_Components/ModalHeader";
import ModalActions from "./AddRouteModal_Components/ModalActions";
import BasicInfoSection from "./EditRouteModal_Components/BasicInfoSection";
import LocationSection from "./AddRouteModal_Components/LocationSection";
import DriverSection from "./EditRouteModal_Components/DriverSection";
import DistanceDurationSection from "./AddRouteModal_Components/DistanceDurationSection";
import CostSpeedSection from "./AddRouteModal_Components/CostSpeedSection";
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
    });

    useEffect(() => {
        if (routeId) {
            // get route from api
            // setFormData(routeData);
            // invalidate the routes
        }
    }, [routeId]);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        // save route to api
        notify("success", "Route edited sucessfully");
        onClose();
    };

    if (!isOpen || !routeId) return null;

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                <ModalHeader title="Edit Route" onClose={onClose} />

                <FormSection onSubmit={handleSubmit}>
                    <BasicInfoSection
                        routeId={formData.id}
                        status={formData.status}
                        onStatusChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                status: value as
                                    | "assigned"
                                    | "unassigned"
                                    | "in progress",
                            }))
                        }
                    />

                    <LocationSection
                        startLocation={formData.startLocation}
                        endLocation={formData.endLocation}
                        onStartLocationChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                startLocation: value,
                            }))
                        }
                        onEndLocationChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                endLocation: value,
                            }))
                        }
                    />

                    <DriverSection
                        assignedDriver={formData.assignedDriver}
                        lastDriver={formData.lastDriver}
                        onAssignedDriverChange={(driver) =>
                            setFormData((prev) => ({
                                ...prev,
                                assignedDriver: driver,
                            }))
                        }
                        onLastDriverChange={(driver) =>
                            setFormData((prev) => ({
                                ...prev,
                                lastDriver: driver,
                            }))
                        }
                    />

                    <DistanceDurationSection
                        distance={formData.distance || 0}
                        distanceUnit={formData.distanceUnit || "km"}
                        duration={formData.duration || 0}
                        timeUnit={formData.timeUnit || "minutes"}
                        onDistanceChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                distance: value,
                            }))
                        }
                        onDistanceUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                distanceUnit: value,
                            }))
                        }
                        onDurationChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                duration: value,
                            }))
                        }
                        onTimeUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                timeUnit: value,
                            }))
                        }
                    />

                    <CostSpeedSection
                        cost={formData.cost || 0}
                        currency={formData.currency || "EGP"}
                        maxSpeed={formData.maxSpeed || 0}
                        speedUnit={formData.speedUnit || "km/h"}
                        onCostChange={(value) =>
                            setFormData((prev) => ({ ...prev, cost: value }))
                        }
                        onCurrencyChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                currency: value,
                            }))
                        }
                        onMaxSpeedChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                maxSpeed: value,
                            }))
                        }
                        onSpeedUnitChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                speedUnit: value,
                            }))
                        }
                    />

                    <DatesSection
                        createdAt={formData.createdAt}
                        updatedAt={formData.updatedAt || null}
                        assignedAt={formData.assignedAt || ""}
                        onCreatedAtChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                createdAt: value,
                            }))
                        }
                        onUpdatedAtChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                updatedAt: value,
                            }))
                        }
                        onAssignedAtChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                assignedAt: value,
                            }))
                        }
                    />

                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSubmit}
                        submitLabel="Save Changes"
                    />
                </FormSection>
            </div>
        </ModalWrapper>
    );
};

export default EditRouteModal;
