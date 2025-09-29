import { useState, useEffect, useRef, useMemo } from "react";
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
import { uploadFile } from "../../utils/functions/uploadFile";
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
import useAddNewDriver from "../../utils/hooks/api/useAddNewDriver";
import useUnsavedChanges from "../../utils/hooks/useUnsavedChanges";
import { UnsavedChangesDialog } from "../UnsavedChangesDialog";

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
    date_of_birth: "",
    driving_license: { type: "", number: "", expiration: "", image: null },
    vehicle: { type: "", make: "", model: "", year: "", color: "" },
    assignedRoute_id: "",
    notes: "",
};

const AddDriverModal = ({ isOpen, onClose }: AddDriverModalProps) => {
    const [form, setForm] = useState<DriverForm>(initialForm);
    const isUnavailable = form.status === "unavailable";
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [routeAvailabilityStatus, setRouteAvailabilityStatus] = useState<
        "unknown" | "assigned" | "unassigned" | "in progress"
    >("unknown");
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Check if form has unsaved changes (any field filled)
    const hasUnsavedChanges = useMemo(() => {
        if (!form) return false;

        // Check if any field has been filled (not empty or null)
        const hasName = Boolean(form.name && form.name.trim() !== "");
        const hasPhone = Boolean(form.phone && form.phone.trim() !== "");
        const hasAddress = Boolean(form.address && form.address.trim() !== "");
        const hasEmail = Boolean(
            form.contact_channels?.email &&
                form.contact_channels.email.trim() !== ""
        );
        const hasFacebook = Boolean(
            form.contact_channels?.facebook &&
                form.contact_channels.facebook.trim() !== ""
        );
        const hasWhatsapp = Boolean(
            form.contact_channels?.whatsapp &&
                form.contact_channels.whatsapp.trim() !== ""
        );
        const hasLinkedin = Boolean(
            form.contact_channels?.linkedin &&
                form.contact_channels.linkedin.trim() !== ""
        );
        const hasPicture = form.picture !== null;
        const hasNationalId = form.national_id !== null;
        const hasLicenseImage = form.driving_license?.image !== null;
        const hasLicenseType = Boolean(
            form.driving_license?.type &&
                form.driving_license.type.trim() !== ""
        );
        const hasLicenseNumber = Boolean(
            form.driving_license?.number &&
                form.driving_license.number.trim() !== ""
        );
        const hasVehicleType = Boolean(
            form.vehicle?.type && form.vehicle.type.trim() !== ""
        );
        const hasVehicleMake = Boolean(
            form.vehicle?.make && form.vehicle.make.trim() !== ""
        );
        const hasVehicleModel = Boolean(
            form.vehicle?.model && form.vehicle.model.trim() !== ""
        );
        const hasVehicleYear = Boolean(
            form.vehicle?.year && form.vehicle.year.trim() !== ""
        );
        const hasVehicleColor = Boolean(
            form.vehicle?.color && form.vehicle.color.trim() !== ""
        );
        const hasNotes = Boolean(form.notes && form.notes.trim() !== "");
        const hasAssignedRoute = Boolean(
            form.assignedRoute_id && form.assignedRoute_id.trim() !== ""
        );

        return (
            hasName ||
            hasPhone ||
            hasAddress ||
            hasEmail ||
            hasFacebook ||
            hasWhatsapp ||
            hasLinkedin ||
            hasPicture ||
            hasNationalId ||
            hasLicenseImage ||
            hasLicenseType ||
            hasLicenseNumber ||
            hasVehicleType ||
            hasVehicleMake ||
            hasVehicleModel ||
            hasVehicleYear ||
            hasVehicleColor ||
            hasNotes ||
            hasAssignedRoute
        );
    }, [form]);

    // Unsaved changes hook
    const { showConfirmDialog, handleExitAttempt, confirmExit, cancelExit } =
        useUnsavedChanges({
            hasUnsavedChanges,
            message:
                "You have filled some fields. Are you sure you want to leave?",
        });

    // Add Driver
    const { addDriver, isPending: isSubmitting } = useAddNewDriver();

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
        // clear submit error when user starts typing
        if (submitError) {
            setSubmitError(null);
        }
    };

    // ================== Validation ==================
    const validateForm = (form: DriverForm): Record<string, string> => {
        const errors: Record<string, string> = {};

        if (!form.name) errors["name"] = "Name is required";
        if (!form.phone) errors["phone"] = "Phone is required";
        if (!form.gender) errors["gender"] = "Gender is required";
        if (!form.date_of_birth)
            errors["date_of_birth"] = "Date of birth is required";
        if (!form.driving_license.type)
            errors["driving_license.type"] = "License type is required";
        if (!form.driving_license.number)
            errors["driving_license.number"] = "License number is required";
        if (!form.driving_license.expiration)
            errors["driving_license.expiration"] = "Expiration is required";
        if (!form.driving_license.image)
            errors["driving_license.image"] = "License image is required";
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
        if (!form.assignedRoute_id) {
            notify("error", "Please enter a Route ID first");
            return;
        }
        setIsCheckingAvailability(true);
        setRouteAvailabilityStatus("unknown");
        await checkRouteAvailabilityStatus(form.assignedRoute_id);
        setIsCheckingAvailability(false);
    };

    // ================== Upload Files ==================
    const uploadDriverFiles = async (form: DriverForm): Promise<DriverForm> => {
        try {
            const filesToUpload: { file: File; field: string }[] = [];

            // Collect files that need to be uploaded with field mapping
            if (form.picture && typeof form.picture === "object") {
                filesToUpload.push({ file: form.picture, field: "picture" });
            }
            if (form.national_id && typeof form.national_id === "object") {
                filesToUpload.push({
                    file: form.national_id,
                    field: "national_id",
                });
            }
            if (
                form.driving_license.image &&
                typeof form.driving_license.image === "object"
            ) {
                filesToUpload.push({
                    file: form.driving_license.image,
                    field: "driving_license.image",
                });
            }

            if (filesToUpload.length === 0) {
                return form;
            }

            // Upload files sequentially to avoid overwhelming the server
            const uploadedFiles: { [key: string]: string } = {};

            for (const { file, field } of filesToUpload) {
                try {
                    const result = await uploadFile(file);
                    uploadedFiles[field] = result.url;
                } catch (error: any) {
                    console.error(`Failed to upload ${field}:`, error);
                    throw new Error(
                        `Failed to upload ${field}: ${error.message}`
                    );
                }
            }

            // Create updated form with file URLs
            const updatedForm = { ...form };

            // Update fields with uploaded file URLs
            if (uploadedFiles.picture) {
                updatedForm.picture = uploadedFiles.picture;
            }
            if (uploadedFiles.national_id) {
                updatedForm.national_id = uploadedFiles.national_id;
            }
            if (uploadedFiles["driving_license.image"]) {
                updatedForm.driving_license = {
                    ...updatedForm.driving_license,
                    image: uploadedFiles["driving_license.image"],
                };
            }

            return updatedForm;
        } catch (error: any) {
            console.error("Error in uploadDriverFiles:", error);
            throw new Error(`File upload failed: ${error.message}`);
        }
    };

    // ================== Submit (Add Driver) ==================
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setSubmitError(null); // Clear any previous errors

        // Validate form
        const nextErrors = validateForm(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            notify(
                "error",
                "Please fix the validation errors before submitting"
            );
            return;
        }

        // If assigning a route, verify availability
        if (form.assignedRoute_id) {
            const isRouteAvailable = await checkRouteAvailabilityStatus(
                form.assignedRoute_id
            );
            if (!isRouteAvailable) {
                return;
            }
        }

        // Proceed with submission
        try {
            // Upload files first
            notify("info", "Uploading files...");
            const formWithUploadedFiles = await uploadDriverFiles(form);

            // Submit driver data with uploaded file URLs
            await addDriver(formWithUploadedFiles);

            // Only close modal on success
            onClose();
            setForm(initialForm);
            setErrors({});
            notify("success", "Driver added successfully");
        } catch (error: any) {
            // Handle error and show it in the modal
            const errorMessage = error?.response?.data?.details?.duplicate_field
                ? `${error?.response?.data?.message} - A driver with the same ${error?.response?.data?.details?.duplicate_field} already exists`
                : error?.response?.data?.message ||
                  error?.message ||
                  "Failed to add driver";
            setSubmitError(errorMessage);
            return;
        }
    };

    // ================== Close Modal ==================
    const handleClose = () => {
        handleExitAttempt(() => {
            setSubmitError(null);
            onClose();
        });
    };

    return (
        <>
            <ModalWrapper isOpen={isOpen}>
                <div ref={modalRef} className="p-6">
                    <ModalHeader title="Add Driver" onClose={handleClose} />

                    {/* ================== Error Display ================== */}
                    {submitError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-center">
                                <i className="fa-solid fa-exclamation-triangle text-red-500 mr-2"></i>
                                <p className="text-red-700 text-sm font-medium">
                                    {submitError === "Duplicate entry detected"
                                        ? "A driver with the same information already exists"
                                        : submitError}
                                </p>
                            </div>
                        </div>
                    )}

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
                                <span className="font-semibold">Note:</span>{" "}
                                "Assign to Route" only appears when status is
                                "available" and the route is available.
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
                                routeAvailabilityStatus={
                                    routeAvailabilityStatus
                                }
                                update={update}
                                onCheckAvailability={
                                    handleCheckRouteAvailability
                                }
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
                                            : "Adding Driver..."
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

            {/* Unsaved Changes Dialog */}
            <UnsavedChangesDialog
                isOpen={showConfirmDialog}
                onConfirm={confirmExit}
                onCancel={cancelExit}
                message="You have filled some fields. Are you sure you want to leave?"
                confirmText="Leave"
                cancelText="Stay"
            />
        </>
    );
};

export default AddDriverModal;
