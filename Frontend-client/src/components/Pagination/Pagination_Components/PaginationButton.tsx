import React from "react";
import type { PaginationButtonProps } from "../../../common/Types/Interfaces";


const PaginationButton: React.FC<PaginationButtonProps> = ({
    onClick,
    disabled = false,
    children,
    isActive = false,
    title,
    className = "",
}) => {
    const baseClasses =
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer";

    const activeClasses = isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white border border-gray-300 hover:border-blue-300 hover:shadow-sm";

    const disabledClasses = disabled
        ? "text-gray-400 cursor-not-allowed bg-gray-100"
        : activeClasses;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabledClasses} ${className}`}
            title={title}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
