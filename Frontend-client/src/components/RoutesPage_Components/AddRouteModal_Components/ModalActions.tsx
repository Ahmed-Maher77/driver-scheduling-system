import React from "react";
import type { ModalActionsProps } from "../../../common/Types/Interfaces";

const ModalActions: React.FC<ModalActionsProps> = ({
    onCancel,
    submitLabel,
    cancelLabel = "Cancel",
    isSubmitting = false,
}) => {
    return (
        <div className="flex justify-end gap-3 pt-4 border-t">
            {/* Cancel Button */}
            <button
                type="button"
                onClick={onCancel}
                className="main-btn button-black-bg px-6 py-2"
            >
                {cancelLabel}
            </button>

            {/* Submit Button */}
            <button
                type="submit"
                className={`main-btn blue-bg px-6 py-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
            >
                {submitLabel}
            </button>
        </div>
    );
};

export default ModalActions;
