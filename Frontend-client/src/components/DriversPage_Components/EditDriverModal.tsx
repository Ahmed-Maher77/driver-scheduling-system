import { useEffect, useState } from "react";
import ModalWrapper from "../RoutesPage_Components/SharedModalComponents/ModalWrapper";
import FormSection from "../RoutesPage_Components/SharedModalComponents/FormSection";
import ModalHeader from "../RoutesPage_Components/AddRouteModal_Components/ModalHeader";
import ModalActions from "../RoutesPage_Components/AddRouteModal_Components/ModalActions";
import type {
    DriverForm,
    EditDriverModalProps,
} from "../../common/Types/Interfaces";
import { notify } from "../../utils/functions/notify";
import {
    checkRouteAvailability,
    type RouteAvailability,
} from "../../utils/functions/checkRouteAvailability";
import {
    BasicInfoSection,
    PictureUploadSection,
    AddressSection,
    ContactChannelsSection,
    IdentitySection,
    LicenseSection,
    LicenseDocumentSection,
    VehicleSection,
    RouteAssignmentSection,
    NotesSection,
} from "./EditDriverModal_Components";
import "./AddDriverModal.scss";
import useGetDriverDetails from "../../utils/hooks/api/useGetDriverDetails";
import LoadingPageSpinner from "../LoadingPageSpinner/LoadingPageSpinner";
import useUpdateDriver from "../../utils/hooks/api/useUpdateDriver";
import { uploadFile } from "../../utils/functions/uploadFile";

const toForm = (d: any): DriverForm => ({
    name: d.name || "",
    picture: d.picture || null,
    phone: d.phone || "",
    address: d.address || "",
    contact_channels: {
        email: d.contact_channels?.email || "",
        facebook: d.contact_channels?.facebook || "",
        whatsapp: d.contact_channels?.whatsapp || "",
        linkedin: d.contact_channels?.linkedin || "",
    },
    country: d.country || "",
    city: d.city || "",
    status: d.status === "on_route" ? "available" : d.status,
    national_id: d.national_id || null,
    gender: d.gender || "Male",
    date_of_birth: d.date_of_birth || "",
    driving_license: {
        type: d.driving_license?.type || "",
        number: d.driving_license?.number || "",
        expiration: d.driving_license?.expiration || "",
        image: d.driving_license?.image || null,
    },
    vehicle: {
        type: d.vehicle?.type || "",
        make: d.vehicle?.make || "",
        model: d.vehicle?.model || "",
        year: d.vehicle?.year || "",
        color: d.vehicle?.color || "",
    },
    assignedRoute_id: d.assignedRoute_id || "",
    notes: d.notes || "",
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
    // Fetch driver details
    const { data: driverDetails, isLoading: isLoadingDriverDetails } =
        useGetDriverDetails({ driverId });
    const { updateDriver, isPending: isUpdatingDriver } = useUpdateDriver();

    // ================== Fetch Driver Details ==================
    useEffect(() => {
        if (driverDetails) {
            setForm(toForm(driverDetails));
            console.log("driverDetails:", driverDetails);
            console.log("form:", toForm(driverDetails));
        }
    }, [driverDetails]);

    // ================== Loading State ==================
    if (isLoadingDriverDetails) {
        return <LoadingPageSpinner message="Loading driver details..." />;
    }

    const isUnavailable = form?.status === "unavailable";

    // ================== Check Route Availability ==================
    const handleCheckRouteAvailability = async () => {
        // Check if route ID is entered
        if (!form?.assignedRoute_id) {
            notify("error", "Please enter a Route ID first");
            return;
        }
        try {
            setIsCheckingAvailability(true);
            setAvailabilityStatus("unknown");
            const status = await checkRouteAvailability(form.assignedRoute_id);
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
    const driver = drivers.find((x) => x.driver_id === driverId);

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

    // ================== Clean Data for API ==================
    const cleanDataForAPI = (data: any) => {
        const cleaned = { ...data };

        // Remove localhost URLs from picture
        if (
            cleaned.picture &&
            typeof cleaned.picture === "string" &&
            cleaned.picture.includes("localhost")
        ) {
            console.log("Removing localhost picture URL:", cleaned.picture);
            delete cleaned.picture;
        }

        // Remove localhost URLs from driving_license.image
        if (
            cleaned.driving_license?.image &&
            typeof cleaned.driving_license.image === "string" &&
            cleaned.driving_license.image.includes("localhost")
        ) {
            console.log(
                "Removing localhost license image URL:",
                cleaned.driving_license.image
            );
            delete cleaned.driving_license.image;
        }

        console.log("Cleaned data for API:", cleaned);
        return cleaned;
    };

    // ================== Upload Driver Files ==================
    const uploadDriverFiles = async (form: DriverForm) => {
        console.log("uploadDriverFiles - Full form:", form);
        console.log(
            "uploadDriverFiles - form.driving_license:",
            form.driving_license
        );
        console.log("form.picture type:", typeof form.picture);
        console.log("form.picture value:", form.picture);
        console.log(
            "form.driving_license.image type:",
            typeof form.driving_license.image
        );
        console.log(
            "form.driving_license.image value:",
            form.driving_license.image
        );

        const filesToUpload: File[] = [];

        // Collect files that need to be uploaded
        if (form.picture && typeof form.picture === "object") {
            console.log("Adding picture to upload:", form.picture);
            filesToUpload.push(form.picture);
        }
        if (
            form.driving_license.image &&
            typeof form.driving_license.image === "object"
        ) {
            console.log(
                "Adding license image to upload:",
                form.driving_license.image
            );
            filesToUpload.push(form.driving_license.image);
        }

        console.log("Files to upload:", filesToUpload);

        if (filesToUpload.length === 0) {
            console.log("No files to upload, returning original form");
            return form;
        }

        // Upload files and get URLs
        const uploadedFiles = await Promise.all(
            filesToUpload.map((file) => uploadFile(file))
        );

        console.log("Uploaded files:", uploadedFiles);

        // Create updated form with file URLs
        const updatedForm = { ...form };
        let fileIndex = 0;

        // Update picture if it was a File object
        if (form.picture && typeof form.picture === "object") {
            console.log(
                `Updating picture with file index ${fileIndex}:`,
                uploadedFiles[fileIndex]
            );
            updatedForm.picture = uploadedFiles[fileIndex].file.url;
            fileIndex++;
        } else {
            console.log(
                "Picture is not a File object, skipping upload. Type:",
                typeof form.picture,
                "Value:",
                form.picture
            );
        }

        // Update driving_license.image if it was a File object
        if (
            form.driving_license.image &&
            typeof form.driving_license.image === "object"
        ) {
            console.log(
                `Updating driving_license.image with file index ${fileIndex}:`,
                uploadedFiles[fileIndex]
            );
            updatedForm.driving_license = {
                ...updatedForm.driving_license,
                image: uploadedFiles[fileIndex].file.url,
            };
            fileIndex++;
        } else {
            console.log(
                "Driving license image is not a File object, skipping upload. Type:",
                typeof form.driving_license.image,
                "Value:",
                form.driving_license.image
            );
        }

        console.log("Updated form after upload:", updatedForm);
        return updatedForm;
    };

    // ================== Submit (Edit Driver) ==================
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // validate form
        if (!form.name || !form.phone)
            return notify("warning", "Name and Phone are required");
        // check if route is available
        if (!isUnavailable && form.assignedRoute_id) {
            const status = await checkRouteAvailability(form.assignedRoute_id);
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
            // Upload files if any
            const updatedForm = await uploadDriverFiles(form);

            const updatedDriverData = cleanDataForAPI({
                name: updatedForm.name,
                phone: updatedForm.phone,
                address: updatedForm.address,
                country: updatedForm.country,
                city: updatedForm.city,
                contact_channels: updatedForm.contact_channels,
                gender: updatedForm.gender,
                date_of_birth: updatedForm.date_of_birth,
                driving_license: { ...updatedForm.driving_license },
                vehicle: { ...updatedForm.vehicle },
                assignedRoute_id: updatedForm.assignedRoute_id,
                notes: updatedForm.notes,
                picture: updatedForm.picture,
                status: updatedForm.status,
            });

            console.log(
                "Sending to API - updatedDriverData:",
                updatedDriverData
            );
            console.log(
                "driving_license in API data:",
                updatedDriverData.driving_license
            );

            await updateDriver({ driverId, driverData: updatedDriverData });
            onClose();
        } catch (error) {
            console.error("Error updating driver:", error);
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
                        {/* <NationalIdDocumentSection
                            form={form}
                            update={update}
                        /> */}

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
                            routeAvailabilityStatus={
                                availabilityStatus as RouteAvailability
                            }
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
                            submitLabel={
                                loading || isUpdatingDriver
                                    ? "Saving..."
                                    : "Save Changes"
                            }
                        />
                    </FormSection>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EditDriverModal;
