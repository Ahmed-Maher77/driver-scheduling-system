// import { useState } from "react";
import type { ActivityFeedsControlsProps } from "../../common/Types/Interfaces";
import Tooltip from "../Tooltip/Tooltip";

const ActivityFeedsControls = ({
    onToggleFilters,
    showFilters,
    selectedCount,
    onExport,
    onRefresh,
    isRefreshing = false,
}: ActivityFeedsControlsProps) => {
    return (
        <div className="controls-section mb-6">
            {/* ===================== Filters & Actions Heading ================== */}
            {/* Right side - Actions */}
            <div className="flex items-center gap-4 mb-5 mt-8 justify-end">
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className={`px-4 py-3 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors max-sm:text-sm font-medium ${
                        isRefreshing
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                >
                    <i
                        className={`fa-solid fa-refresh mr-2 ${
                            isRefreshing ? "animate-spin" : ""
                        }`}
                    ></i>
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>

                <button
                    onClick={onExport}
                    className="p-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors max-sm:text-sm font-medium cursor-pointer"
                >
                    <i className="fa-solid fa-download mr-2"></i>
                    Export CSV
                </button>
            </div>

            <h3
                className="text-lg gray-c-d hover-gray-c-d font-semibold flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out mb-3 w-fit tooltip-container"
                onClick={onToggleFilters}
            >
                Filters & Actions
                <i
                    className={`fa-solid fa-chevron-down trans-3 ${
                        showFilters ? "rotate-180" : ""
                    } text-sm`}
                ></i>
                <Tooltip
                    content={`${
                        showFilters ? "Hide" : "Show"
                    } (Filteration) Bar`}
                    direction="top"
                />
            </h3>

            {/* Selection info */}
            {selectedCount > 0 && (
                <div className="mb-3">
                    <span className="text-sm text-gray-600">
                        {selectedCount} item{selectedCount !== 1 ? "s" : ""}{" "}
                        selected
                    </span>
                </div>
            )}
        </div>
    );
};

export default ActivityFeedsControls;
