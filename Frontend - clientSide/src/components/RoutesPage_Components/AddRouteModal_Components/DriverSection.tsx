import React from "react";
import type { DriverSectionProps } from "../../../common/Types/Interfaces";

const DriverSection: React.FC<DriverSectionProps> = ({
    assignedDriver,
    onAssignedDriverChange,
    assignedDriverError,
    status,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {/* Assigned Driver - Only show when status is "assigned" */}
            {status === "assigned" && (
                <div className="main-input-container w-full">
                    {/* Assigned Driver Label */}
                    <label className="block gray-c-d text-sm mb-2">
                        Assigned Driver <span className="text-gray-400">(Optional)</span>
                    </label>

                    {/* Driver ID and Name */}
                    <div className="flex gap-4 w-full flex-wrap">
                        {/* Driver ID */}
                        <input
                            type="text"
                            placeholder="Driver ID"
                            value={assignedDriver?.id || ""}
                            onChange={(e) =>
                                onAssignedDriverChange({
                                    id: e.target.value,
                                    name: assignedDriver?.name || "",
                                })
                            }
                            className="main-input flex-1"
                        />
                        {/* Driver Name */}
                        <input
                            type="text"
                            placeholder="Driver Name"
                            value={assignedDriver?.name || ""}
                            onChange={(e) =>
                                onAssignedDriverChange({
                                    id: assignedDriver?.id || "",
                                    name: e.target.value,
                                })
                            }
                            className="main-input flex-1"
                        />
                    </div>
                    {assignedDriverError && (
                        <p className="text-red-500 text-xs mt-1">
                            {assignedDriverError}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DriverSection;
