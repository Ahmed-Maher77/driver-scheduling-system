import type { PictureUploadSectionProps } from "../../../common/Types/Interfaces";
import { FileInfoWithRemove } from "../../FileUpload";

const PictureUploadSection = ({ form, update }: PictureUploadSectionProps) => {
    const isExistingImage = form.picture && typeof form.picture === "string";
    const isNewFile = form.picture && typeof form.picture === "object";

    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Profile Picture</h4>
            <div className="main-input-container">
                {/* Label */}
                <label className="block gray-c-d text-sm mb-2">Picture</label>

                {/* Existing Image Display */}
                {isExistingImage && (
                    <div className="mb-4">
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <img
                                src={form.picture as string}
                                alt="Current profile picture"
                                className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                    Current Picture
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
                    className={`file-upload-container picture-upload ${
                        form.picture ? "upload-success" : ""
                    }`}
                >
                    {/* File Upload Label */}
                    <label className="file-upload-label file-upload-border">
                        {/* File Input */}
                        <input
                            type="file"
                            className="file-upload-input w-full"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                update("picture", file);
                            }}
                        />
                        <div className="file-upload-text">
                            <i className="fa-solid fa-camera file-upload-icon"></i>
                            <span className="file-upload-main-text">
                                {isExistingImage
                                    ? "Replace Picture"
                                    : isNewFile
                                    ? "Picture Selected"
                                    : "Upload Picture"}
                            </span>
                            <span className="file-upload-sub-text">
                                {isExistingImage
                                    ? "Click to replace current picture"
                                    : "Click to upload or drag and drop"}
                            </span>
                        </div>
                    </label>

                    {/* File Info with Remove Button */}
                    {isNewFile && (
                        <FileInfoWithRemove
                            file={form.picture as File}
                            onRemove={() => update("picture", null)}
                            className="mt-2"
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default PictureUploadSection;
