import React from "react";
import type { DriverSectionProps } from "../../../common/Types/Interfaces";

const DriverSection: React.FC<DriverSectionProps> = ({
    assignedDriver,
    lastDriver,
    onAssignedDriverChange,
    assignedDriverError,
    lastDriverError,
    status,
    onCheckAvailability,
    availabilityStatus = "unknown",
    isCheckingAvailability = false,
}) => {
    // Track if driver ID has changed from the original API value
    const [hasDriverChanged, setHasDriverChanged] = React.useState(false);
    const [originalDriverId, setOriginalDriverId] = React.useState(
        assignedDriver?.id || ""
    );
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Initialize with API data
    React.useEffect(() => {
        if (assignedDriver?.id && !isInitialized) {
            setOriginalDriverId(assignedDriver.id);
            setIsInitialized(true);
            setHasDriverChanged(false);
        }
    }, [assignedDriver?.id, isInitialized]);

    // Track changes after initialization
    React.useEffect(() => {
        if (isInitialized && assignedDriver?.id !== originalDriverId) {
            setHasDriverChanged(true);
        } else if (isInitialized && assignedDriver?.id === originalDriverId) {
            setHasDriverChanged(false);
        }
    }, [assignedDriver?.id, originalDriverId, isInitialized]);
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {/* ================== Assigned Driver [Only show when status is "assigned"] ================== */}
            {status === "assigned" && (
                <div className="main-input-container w-full">
                    {/* Assigned Driver Label */}
                    <label className="block gray-c-d text-sm mb-2">
                        Assigned Driver
                    </label>

                    {/* ================== Driver ID and Name ================== */}
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
                        {/* Driver Name - Only show if driver hasn't changed AND has a name from API */}
                        {!hasDriverChanged && assignedDriver?.name && (
                            <input
                                type="text"
                                placeholder="Driver Name"
                                value={assignedDriver.name}
                                readOnly
                                className="main-input flex-1 bg-gray-100 cursor-not-allowed read-only-input"
                            />
                        )}
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
                    {/* Assigned Driver Error */}
                    {assignedDriverError && (
                        <p className="text-red-500 text-xs mt-1">
                            {assignedDriverError}
                        </p>
                    )}
                </div>
            )}

            {/* ================== Last Driver - Only show if there's a fetched value ================== */}
            {lastDriver?.id && (
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
                            readOnly
                            className="main-input flex-1 bg-gray-100 cursor-not-allowed read-only-input"
                        />
                        {/* Driver Name */}
                        <input
                            type="text"
                            placeholder="Driver Name"
                            value={lastDriver?.name || ""}
                            readOnly
                            className="main-input flex-1 bg-gray-100 cursor-not-allowed read-only-input"
                        />
                    </div>
                    {/* Last Driver Error */}
                    {lastDriverError && (
                        <p className="text-red-500 text-xs mt-1">
                            {lastDriverError}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DriverSection;
