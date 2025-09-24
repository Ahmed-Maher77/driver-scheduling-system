import type { NationalIdDocumentSectionProps } from "../../../common/Types/Interfaces";

const NationalIdDocumentSection = ({
    form,
    update,
}: NationalIdDocumentSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">National ID Document</h4>
            <div className="main-input-container">
                {/* Label */}
                <label className="block gray-c-d text-sm mb-2">
                    National ID Document
                </label>

                {/* File Upload Container */}
                <div
                    className={`file-upload-container document-upload required-upload ${
                        form.national_id ? "upload-success" : ""
                    }`}
                >
                    {/* File Input */}
                    <input
                        type="file"
                        className="file-upload-input w-full"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            update("national_id", file);
                        }}
                    />

                    {/* File Upload Label */}
                    <label className="file-upload-label file-upload-border">
                        <div className="file-upload-text">
                            <i className="fa-solid fa-id-card file-upload-icon"></i>
                            <span className="file-upload-main-text">
                                {form.national_id
                                    ? "Document Selected"
                                    : "Upload National ID"}
                            </span>
                            <span className="file-upload-sub-text">
                                Click to upload or drag and drop
                            </span>
                        </div>
                    </label>

                    {/* File Info */}
                    {form.national_id &&
                        typeof form.national_id === "object" && (
                            <div className="file-info">
                                <i className="fa-solid fa-check-circle file-info-icon"></i>
                                <span className="file-info-name">
                                    {form.national_id.name}
                                </span>
                                <span className="file-info-size">
                                    {(form.national_id.size / 1024).toFixed(1)}{" "}
                                    KB
                                </span>
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
};

export default NationalIdDocumentSection;
