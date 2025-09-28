import { useEffect, useRef, useState } from "react";
import CustomSelect from "../RoutesPage_Components/CustomSelect";
import type {
    ActivityFeedFilters,
    ActivityFeedsFiltersProps,
} from "../../common/Types/Interfaces";

const ActivityFeedsFilters = ({
    showFilters,
    onFilterChange,
    onClearFilters,
}: ActivityFeedsFiltersProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");

    // Initialize filters from URL params
    const [filters, setFilters] = useState<ActivityFeedFilters>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");
        return {
            status:
                status === "assigned" ||
                status === "unassigned" ||
                status === "in progress"
                    ? status
                    : "",
            driverName: urlParams.get("driverName") || "",
            dateFrom: urlParams.get("dateFrom") || "",
            dateTo: urlParams.get("dateTo") || "",
        };
    });

    useEffect(() => {
        if (contentRef.current) {
            const h = contentRef.current.scrollHeight;
            setMaxHeight(showFilters ? `${h}px` : "0px");
        }
    }, [showFilters]);

    // Debounce for driver name input
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFilterChange(filters);
        }, 300); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [filters, onFilterChange]);

    const handleFilterChange = (
        key: keyof ActivityFeedFilters,
        value: string
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // For non-text inputs, update immediately
        if (key !== "driverName") {
            onFilterChange(newFilters);
        }
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            status: "",
            driverName: "",
            dateFrom: "",
            dateTo: "",
        };
        setFilters(clearedFilters);
        onClearFilters();
    };

    const hasActiveFilters = Object.values(filters).some(
        (value) => value !== ""
    );

    return (
        <div
            className="overflow-hidden white-bg rounded-lg rounded-b-none transition-all duration-300 ease-out"
            style={{ maxHeight, opacity: showFilters ? 1 : 0 }}
        >
            <div
                ref={contentRef}
                className="activity-feeds-filters relative white-bg px-1 pt-3 rounded-lg rounded-b-none shadow-md flex flex-col gap-4 xl:items-center w-full transform transition-transform duration-300 ease-out"
                style={{
                    transform: showFilters
                        ? "translateY(0)"
                        : "translateY(-6px)",
                }}
            >
                {/* Clear All Button */}
                {hasActiveFilters && (
                    <div className="absolute right-[8px] top-0 border-gray-200 z-10">
                        <button
                            onClick={handleClearFilters}
                            className="px-2 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                            title="Clear All Filters"
                        >
                            <i className="fa-solid fa-times"></i>
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Search Filter */}
                <div className="flex flex-col gap-2 main-input-container w-full lg:min-w-[400px]">
                    <label className="block gray-c-d text-sm">Search</label>
                    <input
                        type="text"
                        value={filters.driverName}
                        onChange={(e) =>
                            handleFilterChange("driverName", e.target.value)
                        }
                        placeholder="Search by driver name, driver ID, or route ID..."
                        className="main-input w-full"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {/* Status Filter */}
                    <CustomSelect
                        className="w-full"
                        label="Status"
                        value={filters.status || "all"}
                        onChange={(value) =>
                            handleFilterChange(
                                "status",
                                value === "all" ? "" : value
                            )
                        }
                        options={[
                            { label: "All Status", value: "all" },
                            { label: "Assigned", value: "assigned" },
                            { label: "Unassigned", value: "unassigned" },
                            { label: "In Progress", value: "in progress" },
                        ]}
                    />

                    {/* Date From Filter */}
                    <div className="flex flex-col gap-2 main-input-container w-full">
                        <label className="block gray-c-d text-sm">
                            From Date
                        </label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) =>
                                handleFilterChange("dateFrom", e.target.value)
                            }
                            className="main-input w-full"
                        />
                    </div>

                    {/* Date To Filter */}
                    <div className="flex flex-col gap-2 main-input-container w-full">
                        <label className="block gray-c-d text-sm">
                            To Date
                        </label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) =>
                                handleFilterChange("dateTo", e.target.value)
                            }
                            className="main-input w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityFeedsFilters;
