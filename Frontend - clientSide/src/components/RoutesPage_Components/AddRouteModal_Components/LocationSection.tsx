import React from "react";
import type { LocationSectionProps } from "../../../common/Types/Interfaces";

const LocationSection: React.FC<LocationSectionProps> = ({
    startLocation,
    endLocation,
    onStartLocationChange,
    onEndLocationChange,
    startLocationError,
    endLocationError,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Location */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    Start Location <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => onStartLocationChange(e.target.value)}
                    className={`main-input w-full ${
                        startLocationError ? "border-red-500" : ""
                    }`}
                    required
                />
                {startLocationError && (
                    <p className="text-red-500 text-xs mt-1">
                        {startLocationError}
                    </p>
                )}
            </div>

            {/* End Location */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">
                    End Location <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => onEndLocationChange(e.target.value)}
                    className={`main-input w-full ${
                        endLocationError ? "border-red-500" : ""
                    }`}
                    required
                />
                {endLocationError && (
                    <p className="text-red-500 text-xs mt-1">
                        {endLocationError}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LocationSection;
