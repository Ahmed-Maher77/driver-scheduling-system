import React from "react";
import type { UnsavedChangesDialogProps } from "../../common/Types/Interfaces";

const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    message = "You have unsaved changes. Are you sure you want to leave?",
    confirmText = "Leave",
    cancelText = "Stay",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4">
            <div
                className="fixed inset-0"
                style={{ backgroundColor: "#00000060" }}
                onClick={onCancel}
            />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="p-6">
                    {/* ========================= Title ========================= */}
                    <div className="flex items-center mb-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-2xl"></i>
                        </div>
                        {/* Title */}
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-gray-900">
                                Unsaved Changes
                            </h3>
                        </div>
                    </div>

                    {/* ========================= Message ========================= */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600">{message}</p>
                    </div>

                    {/* ========================= Buttons ========================= */}
                    <div className="flex justify-end space-x-3">
                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {cancelText}
                        </button>
                        {/* Confirm Button */}
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnsavedChangesDialog;
