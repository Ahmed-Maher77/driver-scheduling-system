import type { PictureUploadSectionProps } from "../../../common/Types/Interfaces";

const PictureUploadSection = ({ form, update }: PictureUploadSectionProps) => {
    return (
        <section className="mt-9">
            <h4 className="font-semibold mb-2">Profile Picture</h4>
            <div className="main-input-container">
                {/* Label */}
                <label className="block gray-c-d text-sm mb-2">Picture</label>

                {/* File Upload Container */}
                <div
                    className={`file-upload-container picture-upload ${
                        form.picture ? "upload-success" : ""
                    }`}
                >
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

                    {/* File Upload Label */}
                    <label className="file-upload-label file-upload-border">
                        <div className="file-upload-text">
                            <i className="fa-solid fa-camera file-upload-icon"></i>
                            <span className="file-upload-main-text">
                                {form.picture
                                    ? "Picture Selected"
                                    : "Upload Picture"}
                            </span>
                            <span className="file-upload-sub-text">
                                Click to upload or drag and drop
                            </span>
                        </div>
                    </label>

                    {/* File Info */}
                    {form.picture && typeof form.picture === "object" && (
                        <div className="file-info">
                            <i className="fa-solid fa-check-circle file-info-icon"></i>
                            <span className="file-info-name">
                                {form.picture.name}
                            </span>
                            <span className="file-info-size">
                                {(form.picture.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PictureUploadSection;
