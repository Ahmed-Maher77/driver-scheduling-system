import React from "react";
import type { DriverSectionProps } from "../../../common/Types/Interfaces";

const DriverSection: React.FC<DriverSectionProps> = ({
    assignedDriver,
    lastDriver,
    onAssignedDriverChange,
    onLastDriverChange,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {/* Assigned Driver */}
            <div className="main-input-container w-full">
                {/* Assigned Driver Label */}
                <label className="block gray-c-d text-sm mb-2">
                    Assigned Driver
                </label>

                {/* Driver ID and Name */}
                <div className="flex gap-2 w-full flex-wrap">
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
            </div>

            {/* Last Driver */}
            <div className="main-input-container w-full">
                {/* Last Driver Label */}
                <label className="block gray-c-d text-sm mb-2">
                    Last Driver
                </label>

                {/* Driver ID and Name */}
                <div className="flex gap-2 w-full flex-wrap">
                    {/* Driver ID */}
                    <input
                        type="text"
                        placeholder="Driver ID"
                        value={lastDriver?.id || ""}
                        onChange={(e) =>
                            onLastDriverChange({
                                id: e.target.value,
                                name: lastDriver?.name || "",
                            })
                        }
                        className="main-input flex-1"
                    />
                    {/* Driver Name */}
                    <input
                        type="text"
                        placeholder="Driver Name"
                        value={lastDriver?.name || ""}
                        onChange={(e) =>
                            onLastDriverChange({
                                id: lastDriver?.id || "",
                                name: e.target.value,
                            })
                        }
                        className="main-input flex-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default DriverSection;
