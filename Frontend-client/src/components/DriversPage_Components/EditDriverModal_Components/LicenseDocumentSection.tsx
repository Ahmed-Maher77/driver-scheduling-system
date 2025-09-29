import type { LicenseDocumentSectionProps } from "../../../common/Types/Interfaces";
import { FileInfoWithRemove } from "../../FileUpload";

const LicenseDocumentSection = ({
    form,
    update,
}: LicenseDocumentSectionProps) => {
    const isExistingImage =
        form.driving_license.image &&
        typeof form.driving_license.image === "string";
    const isNewFile =
        form.driving_license.image &&
        typeof form.driving_license.image === "object";

    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">License Document</h4>
            <div className="main-input-container">
                {/* Label */}
                <label className="block gray-c-d text-sm mb-2">
                    License Image
                </label>

                {/* Existing Image Display */}
                {isExistingImage && (
                    <div className="mb-4">
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <img
                                src={form.driving_license.image as string}
                                alt="Current license document"
                                className="w-16 h-16 object-cover rounded border-2 border-gray-300"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Current License Document
                                </p>
                                <p className="text-xs text-gray-500">
                                    Click below to replace
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* File Upload Container */}
                <div
                    className={`file-upload-container document-upload required-upload ${
                        form.driving_license.image ? "upload-success" : ""
                    }`}
                >
                    {/* File Upload Label */}
                    <label className="file-upload-label file-upload-border">
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
                        <div className="file-upload-text">
                            <i className="fa-solid fa-id-card file-upload-icon" style={{ marginBottom: "15px" }}></i>
                            <span className="file-upload-main-text">
                                {isExistingImage
                                    ? "Replace License"
                                    : isNewFile
                                    ? "Document Selected"
                                    : "Upload License"}
                            </span>
                            <span className="file-upload-sub-text">
                                {isExistingImage
                                    ? "Click to replace current document"
                                    : "Click to upload or drag and drop"}
                            </span>
                        </div>
                    </label>

                    {/* File Info with Remove Button */}
                    {isNewFile && (
                        <FileInfoWithRemove
                            file={form.driving_license.image as File}
                            onRemove={() =>
                                update("driving_license.image", null)
                            }
                            className="mt-2"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default LicenseDocumentSection;
