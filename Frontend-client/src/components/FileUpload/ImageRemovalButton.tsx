import React from "react";
import "./FileUpload.scss";

interface ImageRemovalButtonProps {
    onRemove: () => void;
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "danger" | "secondary" | "outline";
    disabled?: boolean;
    tooltip?: string;
}

const ImageRemovalButton: React.FC<ImageRemovalButtonProps> = ({
    onRemove,
    className = "",
    size = "md",
    variant = "danger",
    disabled = false,
    tooltip = "Remove image",
}) => {
    const sizeClasses = {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
    };

    const variantClasses = {
        danger: "bg-red-500 hover:bg-red-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        outline:
            "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50",
    };

    const baseClasses = `
        rounded-full flex items-center justify-center
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        group relative
    `;

    const combinedClasses = `
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
    `.trim();

    return (
        <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className={combinedClasses}
            title={tooltip}
            aria-label={tooltip}
        >
            <i className="fa-solid fa-times"></i>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                    bg-gray-900 text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    pointer-events-none whitespace-nowrap z-10"
                >
                    {tooltip}
                    <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2
                        w-0 h-0 border-l-4 border-r-4 border-t-4
                        border-l-transparent border-r-transparent border-t-gray-900"
                    ></div>
                </div>
            )}
        </button>
    );
};

export default ImageRemovalButton;
