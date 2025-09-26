import React from "react";
import type { DeleteConfirmationModalProps } from "../../common/Types/Interfaces";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmButtonText = "Delete",
    cancelButtonText = "Cancel",
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000070] backdrop-blur-[1px] flex items-center justify-center z-[999]">
            <div className="white-bg p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                {/* Title */}
                <h3 className="text-lg font-semibold gray-c-d mb-4">{title}</h3>

                {/* Message */}
                <p className="gray-c mb-12">{message}</p>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        className="main-btn button-black-bg px-4 py-2"
                    >
                        {cancelButtonText}
                    </button>
                    {/* Confirm Button */}
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`main-btn red-bg px-4 py-2 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Deleting...
                            </div>
                        ) : (
                            confirmButtonText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
