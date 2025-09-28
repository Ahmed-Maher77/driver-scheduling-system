import { useState } from "react";
import { createPortal } from "react-dom";
import type { DriverDocumentsProps } from "../../common/Types/Interfaces";

const DriverDocuments = ({ nationalId, license }: DriverDocumentsProps) => {
    const hasDocuments = nationalId || license;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageTitle, setImageTitle] = useState<string>("");

    const handleImageClick = (imageUrl: string, title: string) => {
        setSelectedImage(imageUrl);
        setImageTitle(title);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setImageTitle("");
    };

    return (
        <section className="white-bg p-4 rounded-lg shadow-md mt-5">
            {/* ================== Title ================== */}
            <h4 className="font-semibold mb-3 text-xs md:text-base lg:text-lg">
                Documents
            </h4>

            {/* ================== Documents Grid ================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* National ID */}
                <div className="flex flex-col">
                    <span className="gray-c-d text-xs md:text-sm lg:text-base mb-2">
                        National ID
                    </span>
                    {nationalId ? (
                        <div
                            className="relative driver-document-container group cursor-pointer border-3 border-gray-300 rounded overflow-hidden"
                            onClick={() =>
                                handleImageClick(nationalId, "National ID")
                            }
                        >
                            <img
                                src={nationalId}
                                alt="National ID"
                                className="w-full h-[300px]  hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                    console.error(
                                        "National ID image failed to load:",
                                        nationalId
                                    );
                                    // Show placeholder instead of hiding
                                    e.currentTarget.style.display = "none";
                                    const parent =
                                        e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.innerHTML = `
                                            <div class="w-full h-[300px] border-3 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                                                <div class="text-center">
                                                    <i class="fa-solid fa-file-image text-gray-400 text-2xl mb-2"></i>
                                                    <p class="text-gray-500 text-sm">Image failed to load</p>
                                                </div>
                                            </div>
                                        `;
                                    }
                                }}
                            />
                            <div className="absolute driver-document-preview inset-0 transition-all duration-200 flex items-center justify-center">
                                <i className="fa-solid fa-expand text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[300px] border-3 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <i className="fa-solid fa-file-image text-gray-400 text-2xl mb-2"></i>
                                <p className="text-gray-500 text-sm">
                                    No National ID uploaded
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Driving License */}
                <div className="flex flex-col">
                    <span className="gray-c-d text-xs md:text-sm lg:text-base mb-2">
                        Driving License
                    </span>
                    {license ? (
                        <div
                            className="relative driver-document-container group cursor-pointer border-3 border-gray-300 rounded overflow-hidden"
                            onClick={() =>
                                handleImageClick(license, "Driving License")
                            }
                        >
                            <img
                                src={license}
                                alt="Driving License"
                                className="w-full h-[300px]  hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                    console.error(
                                        "Driving License image failed to load:",
                                        license
                                    );
                                    // Show placeholder instead of hiding
                                    e.currentTarget.style.display = "none";
                                    const parent =
                                        e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.innerHTML = `
                                            <div class="w-full h-[300px] border-3 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                                                <div class="text-center">
                                                    <i class="fa-solid fa-id-card text-gray-400 text-2xl mb-2"></i>
                                                    <p class="text-gray-500 text-sm">Image failed to load</p>
                                                </div>
                                            </div>
                                        `;
                                    }
                                }}
                            />
                            <div className="absolute inset-0 driver-document-preview transition-all duration-200 flex items-center justify-center">
                                <i className="fa-solid fa-expand text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[300px] border-3 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <i className="fa-solid fa-id-card text-gray-400 text-2xl mb-2"></i>
                                <p className="text-gray-500 text-sm">
                                    No License uploaded
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ================== No Documents Message ================== */}
            {!hasDocuments && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center">
                        <i className="fa-solid fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        <p className="text-yellow-700 text-sm">
                            No documents have been uploaded for this driver.
                        </p>
                    </div>
                </div>
            )}

            {/* ================== Image Modal ================== */}
            {selectedImage &&
                createPortal(
                    <div
                        className="fixed inset-0 flex items-center justify-center z-[9999] p-4 "
                        onClick={closeModal}
                        style={{ backgroundColor: "#00000060" }}
                    >
                        <div className="relative max-w-4xl max-h-full">
                            <button
                                onClick={closeModal}
                                className="absolute cursor-pointer right-[-43px] top-[-18px] text-white hover:text-gray-300 text-[1.7rem] z-10"
                            >
                                <i className="fa-solid fa-times"></i>
                            </button>
                            <div className="bg-white rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-4 text-center">
                                    {imageTitle}
                                </h3>
                                <img
                                    src={selectedImage}
                                    alt={imageTitle}
                                    className="max-w-full max-h-[80vh] object-contain rounded"
                                />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
};

export default DriverDocuments;
