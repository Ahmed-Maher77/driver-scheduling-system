import React from "react";
import type { DriverSectionProps } from "../../../common/Types/Interfaces";

const DriverSection: React.FC<DriverSectionProps> = ({
    assignedDriver,
    onAssignedDriverChange,
    assignedDriverError,
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
                        Assigned Driver{" "}
                        <span className="text-gray-400">(Optional)</span>
                    </label>

                    {/* Driver ID */}
                    <div className="flex gap-4 w-full flex-wrap">
                        {/* Driver ID */}
                        <input
                            type="text"
                            placeholder="Driver ID"
                            value={assignedDriver?.id || ""}
                            onChange={(e) =>
                                onAssignedDriverChange({
                                    id: e.target.value,
                                    name: "", // No name field in AddRouteModal
                                })
                            }
                            className="main-input flex-1"
                        />
                        {/* Check Availability Button */}
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
                    {/* Availability Status */}
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
                    {/* Error Message */}
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
