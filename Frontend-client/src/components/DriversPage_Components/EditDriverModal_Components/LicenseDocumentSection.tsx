import type { LicenseDocumentSectionProps } from "../../../common/Types/Interfaces";

const LicenseDocumentSection = ({
    form,
    update,
}: LicenseDocumentSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">License Document</h4>
            <div className="main-input-container">
                {/* Label */}
                <label className="block gray-c-d text-sm mb-2">
                    License Image
                </label>

                {/* File Upload Container */}
                <div
                    className={`file-upload-container document-upload required-upload ${
                        form.driving_license.image ? "upload-success" : ""
                    }`}
                >
                    {/* File Input */}
                    <input
                        type="file"
                        className="file-upload-input w-full"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            update("driving_license.image", file);
                        }}
                    />

                    {/* File Upload Label */}
                    <label className="file-upload-label file-upload-border">
                        <div className="file-upload-text">
                            <i className="fa-solid fa-id-card file-upload-icon"></i>
                            <span className="file-upload-main-text">
                                {form.driving_license.image
                                    ? "Document Selected"
                                    : "Upload License"}
                            </span>
                            <span className="file-upload-sub-text">
                                Click to upload or drag and drop
                            </span>
                        </div>
                    </label>

                    {/* File Info */}
                    {form.driving_license.image &&
                        typeof form.driving_license.image === "object" && (
                            <div className="file-info">
                                <i className="fa-solid fa-check-circle file-info-icon"></i>
                                <span className="file-info-name">
                                    {form.driving_license.image.name}
                                </span>
                                <span className="file-info-size">
                                    {(
                                        form.driving_license.image.size / 1024
                                    ).toFixed(1)}{" "}
                                    KB
                                </span>
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
};

export default LicenseDocumentSection;
