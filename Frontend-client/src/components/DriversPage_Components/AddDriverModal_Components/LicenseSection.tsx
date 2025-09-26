import type { DriverForm } from "../../../common/Types/Interfaces";

interface LicenseSectionProps {
    form: DriverForm;
    errors: Record<string, string>;
    update: (path: string, value: string | File | null) => void;
}

const LicenseSection = ({ form, errors, update }: LicenseSectionProps) => {
    return (
        <section>
            <h4 className="font-semibold mb-2">Driving License</h4>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* ================== Type ================== */}
                    <div className="main-input-container">
                        <label className="block gray-c-d text-sm mb-2">
                            Type <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`main-input w-full ${
                                errors["driving_license.type"]
                                    ? "border-red-500"
                                    : ""
                            }`}
                            placeholder="e.g., A, B, C"
                            value={form.driving_license.type}
                            onChange={(e) =>
                                update("driving_license.type", e.target.value)
                            }
                        />
                        {errors["driving_license.type"] && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors["driving_license.type"]}
                            </p>
                        )}
                    </div>

                    {/* ================== Number ================== */}
                    <div className="main-input-container">
                        <label className="block gray-c-d text-sm mb-2">
                            Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`main-input w-full ${
                                errors["driving_license.number"]
                                    ? "border-red-500"
                                    : ""
                            }`}
                            placeholder="License number"
                            value={form.driving_license.number}
                            onChange={(e) =>
                                update("driving_license.number", e.target.value)
                            }
                        />
                        {errors["driving_license.number"] && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors["driving_license.number"]}
                            </p>
                        )}
                    </div>

                    {/* ================== Expiration ================== */}
                    <div className="main-input-container">
                        <label className="block gray-c-d text-sm mb-2">
                            Expiration <span className="text-red-500">*</span>
                        </label>
                        <input
                            className={`main-input w-full ${
                                errors["driving_license.expiration"]
                                    ? "border-red-500"
                                    : ""
                            }`}
                            type="date"
                            placeholder="YYYY-MM-DD"
                            value={form.driving_license.expiration}
                            onChange={(e) =>
                                update(
                                    "driving_license.expiration",
                                    e.target.value
                                )
                            }
                        />
                        {errors["driving_license.expiration"] && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors["driving_license.expiration"]}
                            </p>
                        )}
                    </div>
                    <div />
                </div>

                {/* ================== License Image ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        License Image <span className="text-red-500">*</span>
                    </label>
                    <div
                        className={`file-upload-container document-upload required-upload ${
                            errors["driving_license.image"]
                                ? "upload-error"
                                : ""
                        } ${
                            form.driving_license.image ? "upload-success" : ""
                        }`}
                    >
                        <input
                            className="file-upload-input w-full"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                update(
                                    "driving_license.image",
                                    e.target.files?.[0] || null
                                )
                            }
                            id="driving_licenseImage"
                        />
                        <label
                            htmlFor="driving_licenseImage"
                            className="file-upload-label file-upload-border"
                        >
                            <svg
                                className="file-upload-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21,15 16,10 5,21" />
                            </svg>
                            <div className="file-upload-text">
                                <span className="file-upload-main-text">
                                    {form.driving_license.image
                                        ? "Change License Image"
                                        : "Upload License Image"}
                                </span>
                                <span className="file-upload-sub-text">
                                    PNG or JPG up to 5MB
                                </span>
                            </div>
                        </label>
                        {form.driving_license.image && (
                            <div className="file-info">
                                <svg
                                    className="file-info-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 12l2 2 4-4" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                                <span className="file-info-name">
                                    {(form.driving_license.image as File).name}
                                </span>
                                <span className="file-info-size">
                                    {Math.round(
                                        (form.driving_license.image as File)
                                            .size / 1024
                                    )}{" "}
                                    KB
                                </span>
                            </div>
                        )}
                    </div>
                    {errors["driving_license.image"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["driving_license.image"]}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LicenseSection;
