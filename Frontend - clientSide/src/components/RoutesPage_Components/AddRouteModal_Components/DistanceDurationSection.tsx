import React from "react";
import CustomSelect from "../CustomSelect";
import type { DistanceDurationSectionProps } from "../../../common/Types/Interfaces";

const DistanceDurationSection: React.FC<DistanceDurationSectionProps> = ({
    distance,
    distanceUnit,
    duration,
    timeUnit,
    onDistanceChange,
    onDistanceUnitChange,
    onDurationChange,
    onTimeUnitChange,
    distanceError,
    durationError,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Distance */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Distance</label>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="number"
                        step="0.1"
                        value={distance}
                        onChange={(e) =>
                            onDistanceChange(parseFloat(e.target.value) || 0)
                        }
                        className={`main-input flex-1 ${
                            distanceError ? "border-red-500" : ""
                        }`}
                    />
                    <CustomSelect
                        value={distanceUnit}
                        onChange={onDistanceUnitChange}
                        options={[
                            { label: "km", value: "km" },
                            { label: "mile", value: "mile" },
                        ]}
                        className="w-20"
                    />
                </div>
                {distanceError && (
                    <p className="text-red-500 text-xs mt-1">{distanceError}</p>
                )}
            </div>

            {/* Duration */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Duration</label>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) =>
                            onDurationChange(parseInt(e.target.value) || 0)
                        }
                        className={`main-input flex-1 ${
                            durationError ? "border-red-500" : ""
                        }`}
                    />
                    <CustomSelect
                        value={timeUnit}
                        onChange={onTimeUnitChange}
                        options={[
                            { label: "minutes", value: "minutes" },
                            { label: "hours", value: "hours" },
                        ]}
                        className="w-fit"
                    />
                </div>
                {durationError && (
                    <p className="text-red-500 text-xs mt-1">{durationError}</p>
                )}
            </div>
        </div>
    );
};

export default DistanceDurationSection;
