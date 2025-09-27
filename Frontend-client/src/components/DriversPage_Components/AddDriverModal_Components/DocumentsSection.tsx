import type { DriverForm } from "../../../common/Types/Interfaces";

interface DocumentsSectionProps {
    form: DriverForm;
    errors: Record<string, string>;
    update: (path: string, value: string | File | null) => void;
}

const DocumentsSection = ({ form, errors, update }: DocumentsSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Documents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ================== National ID ================== */}
                <div className="main-input-container">
                    <label className="block gray-c-d text-sm mb-2">
                        National ID (Image/PDF){" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div
                        className={`file-upload-container document-upload required-upload w-full ${
                            errors["national_id"] ? "upload-error" : ""
                        } ${form.national_id ? "upload-success" : ""}`}
                    >
                        <input
                            className="file-upload-input w-full"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) =>
                                update(
                                    "national_id",
                                    e.target.files?.[0] || null
                                )
                            }
                            id="national_id"
                        />
                        {/* File Upload Label */}
                        <label
                            htmlFor="national_id"
                            className="file-upload-label file-upload-border"
                        >
                            <svg
                                className="file-upload-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10,9 9,9 8,9" />
                            </svg>
                            <div className="file-upload-text">
                                <span className="file-upload-main-text">
                                    {form.national_id
                                        ? "Change National ID"
                                        : "Upload National ID"}
                                </span>
                                <span className="file-upload-sub-text">
                                    PNG, JPG or PDF up to 5MB
                                </span>
                            </div>
                        </label>
                        {/* File Info */}
                        {form.national_id && (
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
                                    {(form.national_id as File).name}
                                </span>
                                <span className="file-info-size">
                                    {Math.round(
                                        (form.national_id as File).size / 1024
                                    )}{" "}
                                    KB
                                </span>
                            </div>
                        )}
                    </div>
                    {errors["national_id"] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors["national_id"]}
                        </p>
                    )}
                </div>

                {/* ================== Picture ================== */}
                <div className="main-input-container w-full">
                    <label className="block gray-c-d text-sm mb-2">
                        Picture (optional)
                    </label>
                    <div
                        className={`file-upload-container picture-upload ${
                            form.picture ? "upload-success" : ""
                        }`}
                    >
                        {/* File Input */}
                        <input
                            className="file-upload-input w-full"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                update("picture", e.target.files?.[0] || null)
                            }
                            id="picture"
                        />
                        {/* File Upload Label */}
                        <label
                            htmlFor="picture"
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
                                    {form.picture
                                        ? "Change Picture"
                                        : "Upload Picture"}
                                </span>
                                <span className="file-upload-sub-text">
                                    PNG or JPG up to 5MB
                                </span>
                            </div>
                        </label>
                        {/* File Info */}
                        {form.picture && (
                            <div className="file-info">
                                <svg
                                    className="file-info-icon text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 12l2 2 4-4" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                                <span className="file-info-name">
                                    {(form.picture as File).name}
                                </span>
                                <span className="file-info-size">
                                    {Math.round(
                                        (form.picture as File).size / 1024
                                    )}{" "}
                                    KB
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div />
            </div>
        </section>
    );
};

export default DocumentsSection;
