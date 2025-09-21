import React from "react";
import CustomSelect from "../CustomSelect";
import type { CostSpeedSectionProps } from "../../../common/Types/Interfaces";

const CostSpeedSection: React.FC<CostSpeedSectionProps> = ({
    cost,
    currency,
    maxSpeed,
    speedUnit,
    onCostChange,
    onCurrencyChange,
    onMaxSpeedChange,
    onSpeedUnitChange,
    costError,
    maxSpeedError,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Cost</label>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="number"
                        step="0.01"
                        value={cost}
                        onChange={(e) =>
                            onCostChange(parseFloat(e.target.value) || 0)
                        }
                        className={`main-input flex-1 ${
                            costError ? "border-red-500" : ""
                        }`}
                    />
                    <CustomSelect
                        value={currency}
                        onChange={onCurrencyChange}
                        options={[
                            { label: "EGP", value: "EGP" },
                            { label: "USD", value: "USD" },
                            { label: "EUR", value: "EUR" },
                        ]}
                        className="w-fit"
                    />
                </div>
                {costError && (
                    <p className="text-red-500 text-xs mt-1">{costError}</p>
                )}
            </div>

            {/* Max Speed */}
            <div className="main-input-container">
                <label className="block gray-c-d text-sm mb-2">Max Speed</label>
                <div className="flex gap-2 flex-wrap">
                    <input
                        type="number"
                        value={maxSpeed}
                        onChange={(e) =>
                            onMaxSpeedChange(parseInt(e.target.value) || 0)
                        }
                        className={`main-input flex-1 ${
                            maxSpeedError ? "border-red-500" : ""
                        }`}
                    />
                    <CustomSelect
                        value={speedUnit}
                        onChange={onSpeedUnitChange}
                        options={[
                            { label: "km/h", value: "km/h" },
                            { label: "mph", value: "mph" },
                        ]}
                        className="w-fit"
                    />
                </div>
                {maxSpeedError && (
                    <p className="text-red-500 text-xs mt-1">{maxSpeedError}</p>
                )}
            </div>
        </div>
    );
};

export default CostSpeedSection;
