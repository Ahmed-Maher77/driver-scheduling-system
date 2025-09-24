import { useState } from "react";
import ModalWrapper from "../RoutesPage_Components/SharedModalComponents/ModalWrapper";
import FormSection from "../RoutesPage_Components/SharedModalComponents/FormSection";
import ModalHeader from "../RoutesPage_Components/AddRouteModal_Components/ModalHeader";
import ModalActions from "../RoutesPage_Components/AddRouteModal_Components/ModalActions";
import type {
    AddDriverModalProps,
    DriverForm,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import {
    checkRouteAvailability,
    type RouteAvailability,
} from "../../utils/functions/checkRouteAvailability";
import {
    BasicInfoSection,
    AddressSection,
    ContactsSection,
    DocumentsSection,
    LicenseSection,
    VehicleSection,
    RouteAssignmentSection,
    NotesSection,
} from "./AddDriverModal_Components";
import "./AddDriverModal.scss";

const initialForm: DriverForm = {
    name: "",
    picture: null,
    phone: "",
    address: "",
    contact_channels: {
        email: "",
        facebook: "",
        whatsapp: "",
        linkedin: "",
    },
    country: "",
    city: "",
    status: "available",
    national_id: null,
    gender: "Male",
    dateOfBirth: "",
    drivingLicense: { type: "", number: "", expiration: "", image: null },
    vehicle: { type: "", make: "", model: "", year: "", color: "" },
    assignedRouteId: "",
    notes: "",
};

const AddDriverModal = ({ isOpen, onClose }: AddDriverModalProps) => {
    const [form, setForm] = useState<DriverForm>(initialForm);
    const isUnavailable = form.status === "unavailable";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [routeAvailabilityStatus, setRouteAvailabilityStatus] = useState<
        "unknown" | "assigned" | "unassigned" | "in progress"
    >("unknown");
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

    // ================== Update Field ==================
    const update = (path: string, value: string | File | null) => {
        setForm((prev) => {
            const next: DriverForm = { ...prev };
            const keys = path.split(".");
            let ref: unknown = next;
            for (let i = 0; i < keys.length - 1; i++) {
                ref = (ref as Record<string, unknown>)[keys[i]] as unknown;
            }
            (ref as Record<string, unknown>)[keys[keys.length - 1]] =
                value as unknown as never;
            return next;
        });
        // clear field error on change
        setErrors((prev) => {
            if (!prev[path]) return prev;
            const copy = { ...prev };
            delete copy[path];
            return copy;
        });
    };

    // ================== Validation ==================
    const validateForm = (form: DriverForm): Record<string, string> => {
        const errors: Record<string, string> = {};

        if (!form.name) errors["name"] = "Name is required";
        if (!form.phone) errors["phone"] = "Phone is required";
        if (!form.gender) errors["gender"] = "Gender is required";
        if (!form.dateOfBirth)
            errors["dateOfBirth"] = "Date of birth is required";
        if (!form.drivingLicense.type)
            errors["drivingLicense.type"] = "License type is required";
        if (!form.drivingLicense.number)
            errors["drivingLicense.number"] = "License number is required";
        if (!form.drivingLicense.expiration)
            errors["drivingLicense.expiration"] = "Expiration is required";
        if (!form.drivingLicense.image)
            errors["drivingLicense.image"] = "License image is required";
        if (!form.vehicle.type)
            errors["vehicle.type"] = "Vehicle type is required";
        if (!form.vehicle.make) errors["vehicle.make"] = "Make is required";
        if (!form.vehicle.model) errors["vehicle.model"] = "Model is required";
        if (!form.vehicle.year) errors["vehicle.year"] = "Year is required";
        if (!form.vehicle.color) errors["vehicle.color"] = "Color is required";

        return errors;
    };

    // ================== Check Route Availability ==================
    const checkRouteAvailabilityStatus = async (
        routeId: string
    ): Promise<boolean> => {
        try {
            const routeStatus = await checkRouteAvailability(routeId);
            setRouteAvailabilityStatus(routeStatus as RouteAvailability);
            if (routeStatus === "assigned") {
                notify("error", "Route is already assigned to another driver");
                return false;
            } else if (routeStatus === "in progress") {
                notify("error", "Route is currently in progress");
                return false;
            } else if (routeStatus === "unassigned") {
                notify("success", "Route is available for assignment");
                return true;
            } else {
                notify("error", "Route is unavailable");
                return false;
            }
        } catch {
            notify("error", "Failed to check route availability");
            setRouteAvailabilityStatus("unknown");
            return false;
        }
    };

    // ================== Handle [Check Availability] Button Click ==================
    const handleCheckRouteAvailability = async () => {
        if (!form.assignedRouteId) {
            notify("error", "Please enter a Route ID first");
            return;
        }
        setIsCheckingAvailability(true);
        setRouteAvailabilityStatus("unknown");
        await checkRouteAvailabilityStatus(form.assignedRouteId);
        setIsCheckingAvailability(false);
    };

    // ================== Submit (Add Driver) ==================
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        // Validate form
        const nextErrors = validateForm(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            notify(
                "error",
                "Please fix the validation errors before submitting"
            );
            setIsSubmitting(false);
            return;
        }

        // If assigning a route, verify availability
        if (form.assignedRouteId) {
            const isRouteAvailable = await checkRouteAvailabilityStatus(
                form.assignedRouteId
            );
            if (!isRouteAvailable) {
                setIsSubmitting(false);
                return;
            }
        }

        // Proceed with submission
        try {
            // onAddDriver(form);
            // call api to add driver
            // addNewDriver()
            notify("success", "Driver added successfully");
            onClose();
            setForm(initialForm);
            setErrors({});
        } catch {
            notify("error", "Something went wrong while adding driver");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ================== Close Modal ==================
    const handleClose = () => {
        setIsSubmitting(false);
        onClose();
    };

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                <ModalHeader title="Add Driver" onClose={handleClose} />
                <div className="add-driver-modal-wrapper">
                    <FormSection onSubmit={submit} className="space-y-6">
                        {/* ================== Basic Information ================== */}
                        <BasicInfoSection
                            form={form}
                            errors={errors}
                            update={update}
                        />

                        {/* ================== Note for user ================== */}
                        <p className="text-sm gray-c italic mb-5 mt-[-10px]">
                            <span className="font-semibold">Note:</span> "Assign
                            to Route" only appears when status is "available"
                            and the route is available.
                        </p>

                        {/* ================== Address ================== */}
                        <AddressSection form={form} update={update} />

                        {/* ================== Contacts ================== */}
                        <ContactsSection form={form} update={update} />

                        {/* ================== Documents ================== */}
                        <DocumentsSection
                            form={form}
                            errors={errors}
                            update={update}
                        />

                        {/* ================== Driving License ================== */}
                        <LicenseSection
                            form={form}
                            errors={errors}
                            update={update}
                        />

                        {/* ================== Vehicle ================== */}
                        <VehicleSection
                            form={form}
                            errors={errors}
                            update={update}
                        />

                        {/* ================== Assign to Route ================== */}
                        <RouteAssignmentSection
                            form={form}
                            isUnavailable={isUnavailable}
                            isCheckingAvailability={isCheckingAvailability}
                            routeAvailabilityStatus={routeAvailabilityStatus}
                            update={update}
                            onCheckAvailability={handleCheckRouteAvailability}
                            onRouteIdChange={() =>
                                setRouteAvailabilityStatus("unknown")
                            }
                        />

                        {/* ================== Notes ================== */}
                        <NotesSection form={form} update={update} />

                        {/* ================== Modal Actions ================== */}
                        <ModalActions
                            onCancel={handleClose}
                            submitLabel={
                                isSubmitting || isCheckingAvailability
                                    ? isCheckingAvailability
                                        ? "Checking..."
                                        : "Adding..."
                                    : "Add Driver"
                            }
                            isSubmitting={
                                isSubmitting || isCheckingAvailability
                            }
                        />
                    </FormSection>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default AddDriverModal;
