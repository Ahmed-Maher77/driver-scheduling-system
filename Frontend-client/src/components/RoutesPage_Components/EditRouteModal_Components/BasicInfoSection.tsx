import React from "react";
import CustomSelect from "../CustomSelect";
import type { BasicInfoSectionProps } from "../../../common/Types/Interfaces";

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    routeId,
    status,
    onStatusChange,
    statusError,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Route ID */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Route ID</label>
                <input
                    type="text"
                    value={routeId}
                    readOnly={true}
                    className="main-input w-full read-only-input"
                    disabled
                />
            </div>

            {/* Status */}
            <div className="main-input-container">
                <CustomSelect
                    label="Status"
                    value={status}
                    onChange={onStatusChange}
                    options={[
                        { label: "Unassigned", value: "unassigned" },
                        { label: "Assigned", value: "assigned" },
                        { label: "In Progress", value: "in progress" },
                    ]}
                    fullWidth
                />
                {statusError && (
                    <p className="text-red-500 text-xs mt-1">{statusError}</p>
                )}
            </div>
        </div>
    );
};

export default BasicInfoSection;
