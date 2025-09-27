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

    const [filters, setFilters] = useState<ActivityFeedFilters>({
        status: "",
        driverName: "",
        dateFrom: "",
        dateTo: "",
    });

    useEffect(() => {
        if (contentRef.current) {
            const h = contentRef.current.scrollHeight;
            setMaxHeight(showFilters ? `${h}px` : "0px");
        }
    }, [showFilters]);

    const handleFilterChange = (
        key: keyof ActivityFeedFilters,
        value: string
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
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
                className="activity-feeds-filters white-bg px-1 rounded-lg rounded-b-none shadow-md flex flex-col gap-4 xl:items-center w-full transform transition-transform duration-300 ease-out"
                style={{
                    transform: showFilters
                        ? "translateY(0)"
                        : "translateY(-6px)",
                }}
            >
                {/* Clear All Button */}
                {hasActiveFilters && (
                    <div className="flex justify-end w-full">
                        <button
                            onClick={handleClearFilters}
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Driver Name Filter */}
                <div className="flex flex-col gap-2 main-input-container w-full lg:min-w-[400px]">
                    <label className="block gray-c-d text-sm">
                        Driver Name
                    </label>
                    <input
                        type="text"
                        value={filters.driverName}
                        onChange={(e) =>
                            handleFilterChange("driverName", e.target.value)
                        }
                        placeholder="Search by driver name..."
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
