import React from "react";
import type { DriverSectionProps } from "../../../common/Types/Interfaces";

const DriverSection: React.FC<DriverSectionProps> = ({
    assignedDriver,
    lastDriver,
    onAssignedDriverChange,
    onLastDriverChange,
    assignedDriverError,
    lastDriverError,
    status,
    onCheckAvailability,
    availabilityStatus = "unknown",
    isCheckingAvailability = false,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {/* Assigned Driver - Only show when status is "assigned" */}
            {status === "assigned" && (
                <div className="main-input-container w-full">
                    {/* Assigned Driver Label */}
                    <label className="block gray-c-d text-sm mb-2">
                        Assigned Driver
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
                        <button
                            type="button"
                            className="main-btn green-bg px-4 py-2"
                            onClick={() =>
                                onCheckAvailability?.(assignedDriver?.id)
                            }
                            disabled={
                                isCheckingAvailability || !assignedDriver?.id
                            }
                        >
                            {isCheckingAvailability
                                ? "Checking..."
                                : "Check Availability"}
                        </button>
                    </div>
                    {availabilityStatus !== "unknown" && (
                        <p
                            className={`text-xs mt-1 ${
                                availabilityStatus === "available"
                                    ? "green-c"
                                    : "red-c"
                            }`}
                        >
                            {availabilityStatus === "available"
                                ? "Driver is available"
                                : availabilityStatus === "on_route"
                                ? "Driver is currently on a route"
                                : "Driver is unavailable"}
                        </p>
                    )}
                    {assignedDriverError && (
                        <p className="text-red-500 text-xs mt-1">
                            {assignedDriverError}
                        </p>
                    )}
                </div>
            )}

            {/* Last Driver */}
            <div className="main-input-container w-full">
                {/* Last Driver Label */}
                <label className="block gray-c-d text-sm mb-2">
                    Last Driver
                </label>

                {/* Driver ID and Name */}
                <div className="flex gap-4 w-full flex-wrap">
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
                {lastDriverError && (
                    <p className="text-red-500 text-xs mt-1">
                        {lastDriverError}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DriverSection;
