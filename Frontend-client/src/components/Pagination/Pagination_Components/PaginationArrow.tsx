import React from "react";
import type { PaginationArrowProps } from "../../../common/Types/Interfaces";


const PaginationArrow: React.FC<PaginationArrowProps> = ({
    direction,
    onClick,
    disabled,
    title,
}) => {
    const baseClasses =
        "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";

    const disabledClasses = disabled
        ? "text-gray-400 cursor-not-allowed bg-gray-100"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white border border-gray-300 hover:border-blue-300 hover:shadow-sm cursor-pointer";

    const iconClass =
        direction === "previous"
            ? "fa-solid fa-chevron-left"
            : "fa-solid fa-chevron-right";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabledClasses}`}
            title={title}
        >
            <i className={iconClass}></i>
        </button>
    );
};

export default PaginationArrow;
