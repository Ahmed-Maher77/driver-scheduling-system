import React from "react";
import type { DatesSectionProps } from "../../../common/Types/Interfaces";

const DatesSection: React.FC<DatesSectionProps> = ({
    createdAt,
    updatedAt,
    assignedAt,
    onCreatedAtChange,
    onUpdatedAtChange,
    onAssignedAtChange,
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
                    onChange={(e) => onCreatedAtChange(e.target.value)}
                    className="main-input w-full"
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
                    onChange={(e) => onUpdatedAtChange(e.target.value || null)}
                    className="main-input w-full"
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
                    onChange={(e) => onAssignedAtChange(e.target.value || "")}
                    className="main-input w-full"
                />
            </div>
        </div>
    );
};

export default DatesSection;
