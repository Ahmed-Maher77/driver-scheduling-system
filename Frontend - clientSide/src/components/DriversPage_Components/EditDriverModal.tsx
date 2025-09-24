import { useEffect, useState } from "react";
import ModalWrapper from "../RoutesPage_Components/SharedModalComponents/ModalWrapper";
import FormSection from "../RoutesPage_Components/SharedModalComponents/FormSection";
import ModalHeader from "../RoutesPage_Components/AddRouteModal_Components/ModalHeader";
import ModalActions from "../RoutesPage_Components/AddRouteModal_Components/ModalActions";
import type {
    DriverForm,
    DriverRow,
    EditDriverModalProps,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import { checkRouteAvailability, type RouteAvailability } from "../../utils/functions/checkRouteAvailability";
import {
    BasicInfoSection,
    PictureUploadSection,
    AddressSection,
    ContactChannelsSection,
    IdentitySection,
    NationalIdDocumentSection,
    LicenseSection,
    LicenseDocumentSection,
    VehicleSection,
    RouteAssignmentSection,
    NotesSection,
} from "./EditDriverModal_Components";
import "./AddDriverModal.scss";

const toForm = (d: DriverRow): DriverForm => ({
    name: d.name,
    picture: null, // Will be loaded from API
    phone: d.phone || "",
    address: (d as any).address || "",
    contact_channels: {
        email: (d as any).email || "",
        facebook: (d as any).facebook || "",
        whatsapp: (d as any).whatsapp || "",
        linkedin: (d as any).linkedin || "",
    },
    country: (d as any).country || "",
    city: (d as any).city || "",
    status: d.status === "on_route" ? "available" : d.status,
    national_id: null, // Will be loaded from API
    gender: (d as any).gender || "Male",
    dateOfBirth: (d as any).dateOfBirth || "",
    drivingLicense: {
        type: d.licenseType || "",
        number: (d as any).licenseNumber || "",
        expiration: (d as any).licenseExpiration || "",
        image: null, // Will be loaded from API
    },
    vehicle: {
        type: d.vehicleType || "",
        make: (d as any).vehicleMake || "",
        model: (d as any).vehicleModel || "",
        year: (d as any).vehicleYear || "",
        color: (d as any).vehicleColor || "",
    },
    assignedRouteId: d.assignedRouteId || "",
    notes: (d as any).notes || "",
});

const EditDriverModal = ({
    isOpen,
    onClose,
    driverId,
    drivers,
}: EditDriverModalProps) => {
    const [form, setForm] = useState<DriverForm | null>(null);
    const [loading, setLoading] = useState(false);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [availabilityStatus, setAvailabilityStatus] = useState<
        "unknown" | "assigned" | "unassigned" | "in progress"
    >("unknown");

    // ================== Fetch Driver Details ==================
    useEffect(() => {
        if (!isOpen || !driverId) return;

        // TODO: Replace with API call
        // const fetchDriverDetails = async () => {
        //     setLoading(true);
        //     try {
        //         const response = await fetch(`/api/drivers/${driverId}`);
        //         const driverData = await response.json();
        //         setForm(toForm(driverData));
        //     } catch (error) {
        //         notify("error", "Failed to load driver details");
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchDriverDetails();

        // Current: Using local data
        const d = drivers.find((x) => x.id === driverId);
        setForm(d ? toForm(d) : null);
    }, [driverId, drivers, isOpen]);

    const isUnavailable = form?.status === "unavailable";

    // ================== Check Route Availability ==================
    const handleCheckRouteAvailability = async () => {
        // Check if route ID is entered
        if (!form?.assignedRouteId) {
            notify("error", "Please enter a Route ID first");
            return;
        }
        try {
            setIsCheckingAvailability(true);
            setAvailabilityStatus("unknown");
            const status = await checkRouteAvailability(form.assignedRouteId);
            if (status === "unassigned") {
                setAvailabilityStatus("unassigned");
                notify("success", "Route is available for assignment");
            } else if (status === "assigned") {
                setAvailabilityStatus("assigned");
                notify(
                    "error",
                    "This route is already assigned to another driver"
                );
            } else if (status === "in progress") {
                setAvailabilityStatus("in progress");
                notify("error", "This route is currently in progress");
            } else {
                setAvailabilityStatus("unknown");
                notify("error", "Route is unavailable");
            }
        } catch {
            notify("error", "Failed to check route availability");
            setAvailabilityStatus("unknown");
        } finally {
            setIsCheckingAvailability(false);
        }
    };

    if (!isOpen) return null;
    const driver = drivers.find((x) => x.id === driverId);

    // ================== Loading State ==================
    if (loading) {
        return (
            <ModalWrapper isOpen={isOpen}>
                <div className="p-6">
                    <ModalHeader title="Edit Driver" onClose={onClose} />
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">
                                Loading driver details...
                            </p>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        );
    }

    if (!form || !driver) return null;

    // ================== Update Field ==================
    const update = (path: string, value: string | File | null) => {
        setForm((prev) => {
            if (!prev) return prev;
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
    };

    // ================== Submit (Edit Driver) ==================
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // validate form
        if (!form.name || !form.phone)
            return notify("warning", "Name and Phone are required");
        // check if route is available
        if (!isUnavailable && form.assignedRouteId) {
            const status = await checkRouteAvailability(form.assignedRouteId);
            if (status === "in progress") {
                return notify("error", "Route is currently in progress");
            } else if (status === "assigned") {
                return notify(
                    "error",
                    "Route is already assigned to another driver"
                );
            }
        }
        setLoading(true);
        try {
            // TODO: Replace with API call
            // const updatedDriverData = {
            //     name: form.name,
            //     phone: form.phone,
            //     address: form.address,
            //     country: form.country,
            //     city: form.city,
            //     contact_channels: form.contact_channels,
            //     gender: form.gender,
            //     dateOfBirth: form.dateOfBirth,
            //     drivingLicense: form.drivingLicense,
            //     vehicle: form.vehicle,
            //     assignedRouteId: form.assignedRouteId,
            //     notes: form.notes,
            //     national_id: form.national_id,
            //     picture: form.picture,
            //     status: form.status,
            // }
            // updateDriver(updatedDriverData)

            notify("success", "Driver updated successfully");
            onClose();
        } catch {
            notify("error", "Failed to update driver");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper isOpen={isOpen}>
            <div className="p-6">
                {/* ================== Modal Header ================== */}
                <ModalHeader title="Edit Driver" onClose={onClose} />

                {/* ================== Modal Content ================== */}
                <div className="add-driver-modal-wrapper">
                    <FormSection onSubmit={submit} className="space-y-6">
                        {/* Basic Info Section */}
                        <BasicInfoSection
                            driver={driver}
                            form={form}
                            update={update}
                        />

                        {/* Picture Upload Section */}
                        <PictureUploadSection form={form} update={update} />

                        {/* Address Section */}
                        <AddressSection form={form} update={update} />

                        {/* Contact Channels Section */}
                        <ContactChannelsSection form={form} update={update} />

                        {/* Identity Section */}
                        <IdentitySection form={form} update={update} />

                        {/* National ID Document Section */}
                        <NationalIdDocumentSection
                            form={form}
                            update={update}
                        />

                        {/* License Section */}
                        <LicenseSection form={form} update={update} />

                        {/* License Document Section */}
                        <LicenseDocumentSection form={form} update={update} />

                        {/* Vehicle Section */}
                        <VehicleSection form={form} update={update} />

                        {/* Route Assignment Section */}
                        <RouteAssignmentSection
                            form={form}
                            isUnavailable={isUnavailable}
                            isCheckingAvailability={isCheckingAvailability}
                            routeAvailabilityStatus={availabilityStatus as RouteAvailability}
                            update={update}
                            onCheckAvailability={handleCheckRouteAvailability}
                            onRouteIdChange={() =>
                                setAvailabilityStatus("unknown")
                            }
                        />

                        {/* Notes Section */}
                        <NotesSection form={form} update={update} />

                        {/* Modal Actions */}
                        <ModalActions
                            onCancel={onClose}
                            submitLabel={loading ? "Saving..." : "Save Changes"}
                        />
                    </FormSection>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EditDriverModal;
