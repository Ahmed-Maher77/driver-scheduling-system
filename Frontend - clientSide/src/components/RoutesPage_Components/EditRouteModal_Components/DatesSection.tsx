import React from "react";
import type { DatesSectionProps } from "../../../common/Types/Interfaces";

const DatesSection: React.FC<DatesSectionProps> = ({
    createdAt,
    updatedAt,
    assignedAt,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Created At */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    Created At
                </label>
                <input
                    type="date"
                    value={createdAt}
                    readOnly={true}
                    className="main-input w-full read-only-input"
                />
            </div>

            {/* Updated At */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    Updated At
                </label>
                <input
                    type="date"
                    value={updatedAt || ""}
                    readOnly={true}
                    className="main-input w-full read-only-input"
                />
            </div>

            {/* Assigned At */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    Assigned At
                </label>
                <input
                    type="date"
                    value={assignedAt || ""}
                    readOnly={true}
                    className="main-input w-full read-only-input"
                />
            </div>
        </div>
    );
};

export default DatesSection;
