import CustomSelect from "./CustomSelect";
import Tooltip from "../Tooltip/Tooltip";
import type { FiltersSectionProps } from "../../common/Types/Interfaces";
import { useEffect, useRef, useState } from "react";

const FiltersSection = ({
    showFilters,
    onToggleFilters,
    searchBy,
    setSearchBy,
    clearFilters,
}: FiltersSectionProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBy((prev) => ({
            ...prev,
            routeIdOrDriverName: e.target.value,
        }));
    };
    const handleStatusChange = (value: string) => {
        setSearchBy((prev) => ({ ...prev, status: value }));
    };
    const handleDurationChange = (value: string) => {
        setSearchBy((prev) => ({ ...prev, duration: value }));
    };

    // Handle input blur to hide icon when content exists
    const handleInputBlur = (inputName: string, value: string) => {
        if (value.trim() !== "") {
            setHiddenIcons((prev) => new Set(prev).add(inputName));
        } else {
            setHiddenIcons((prev) => {
                const newSet = new Set(prev);
                newSet.delete(inputName);
                return newSet;
            });
        }
    };

    // Handle input focus to show icon again
    const handleInputFocus = (inputName: string) => {
        setHiddenIcons((prev) => {
            const newSet = new Set(prev);
            newSet.delete(inputName);
            return newSet;
        });
    };

    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");
    const [hiddenIcons, setHiddenIcons] = useState<Set<string>>(new Set());

    // Check if any filters are active
    const hasActiveFilters =
        searchBy.routeIdOrDriverName.trim() !== "" ||
        (searchBy.status.trim() !== "" && searchBy.status !== "all") ||
        (searchBy.duration.trim() !== "" && searchBy.duration !== "any");

    useEffect(() => {
        if (contentRef.current) {
            // measure content height and set max-height for smooth transition
            const h = contentRef.current.scrollHeight;
            setMaxHeight(showFilters ? `${h}px` : "0px");
        }
    }, [showFilters]);

    return (
        <>
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

            <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight, opacity: showFilters ? 1 : 0 }}
            >
                <div
                    ref={contentRef}
                    className="routes-filters-actions relative white-bg p-4 py-6 pb-2 rounded-lg rounded-b-none shadow-md flex flex-col xl:flex-row gap-4 xl:items-center w-full transform transition-transform duration-300 ease-out"
                    style={{
                        transform: showFilters
                            ? "translateY(0)"
                            : "translateY(-6px)",
                    }}
                >
                    <div className="flex flex-col gap-2 main-input-container has-icon lg:min-w-[400px] w-full">
                        <label className="block gray-c-d text-sm">
                            Search by Route ID or Driver name...
                        </label>
                        <input
                            type="text"
                            placeholder="Search by Route ID or Driver name..."
                            className="main-input w-full"
                            value={searchBy.routeIdOrDriverName}
                            onChange={handleSearchChange}
                            onBlur={(e) =>
                                handleInputBlur(
                                    "routeIdOrDriverName",
                                    e.target.value
                                )
                            }
                            onFocus={() =>
                                handleInputFocus("routeIdOrDriverName")
                            }
                        />
                        {!hiddenIcons.has("routeIdOrDriverName") && (
                            <i className="fa-solid fa-magnifying-glass"></i>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                        <CustomSelect
                            className=""
                            label="Status"
                            value={searchBy.status || "all"}
                            onChange={handleStatusChange}
                            options={[
                                { label: "All", value: "all" },
                                { label: "Assigned", value: "assigned" },
                                { label: "Unassigned", value: "unassigned" },
                                { label: "In Progress", value: "in progress" },
                            ]}
                        />
                        <CustomSelect
                            className=""
                            label="Duration"
                            value={searchBy.duration || "any"}
                            onChange={handleDurationChange}
                            options={[
                                { label: "Any duration", value: "any" },
                                { label: "Less than 15 min", value: "<15" },
                                { label: "15 - 30 min", value: "15-30" },
                                { label: "More than 30 min", value: ">30" },
                            ]}
                        />
                    </div>

                    {/* Clear All Button */}
                    {hasActiveFilters && (
                        <div className="absolute right-[8px] top-0 pt-2 border-t border-gray-200">
                            <button
                                onClick={clearFilters}
                                className="px-2 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                                title="Clear All Filters"
                            >
                                <i className="fa-solid fa-times"></i>
                                Clear All Filters
                            </button>
                        </div>
                    )}
                    
                </div>
            </div>
        </>
    );
};

export default FiltersSection;
