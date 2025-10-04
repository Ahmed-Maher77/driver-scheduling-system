import { useEffect, useMemo, useRef, useState } from "react";
import CustomSelect from "../RoutesPage_Components/CustomSelect";
import Tooltip from "../Tooltip/Tooltip";
import type {
    DriverFiltersSectionProps,
    DriverStatus,
} from "../../common/Types/Interfaces";

const DriversFiltersSection = ({
    showFilters,
    onToggleFilters,
    searchBy,
    setSearchBy,
    clearFilters,
}: DriverFiltersSectionProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");
    const [hiddenIcons, setHiddenIcons] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (contentRef.current) {
            const h = contentRef.current.scrollHeight;
            setMaxHeight(showFilters ? `${h}px` : "0px");
        }
    }, [showFilters]);

    const statusOptions = useMemo(
        () => [
            { label: "All", value: "" },
            { label: "Available", value: "available" },
            { label: "Unavailable", value: "unavailable" },
            { label: "On Route", value: "on_route" },
        ],
        []
    );
    const licenseOptions = useMemo(
        () => [
            { label: "Any License", value: "" },
            { label: "A", value: "A" },
            { label: "B", value: "B" },
            { label: "C", value: "C" },
            { label: "D", value: "D" },
        ],
        []
    );

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

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return (
            searchBy.driverIdOrName.trim() !== "" ||
            searchBy.status.trim() !== "" ||
            searchBy.vehicleType.trim() !== "" ||
            searchBy.licenseType.trim() !== ""
        );
    }, [searchBy]);

    return (
        <>
            {/* ===================== Filters & Actions Heading ================== */}
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

            {/* ===================== Filters & Actions Content ================== */}
            <div
                className="overflow-hidden white-bg rounded-lg rounded-b-none transition-all duration-300 ease-out"
                style={{ maxHeight, opacity: showFilters ? 1 : 0 }}
            >
                <div
                    ref={contentRef}
                    className={`routes-filters-actions relative white-bg p-4 py-6 pb-2 ${hasActiveFilters? "max-sm:pt-15": ""} rounded-lg rounded-b-none shadow-md flex flex-col gap-4 xl:items-center w-full transform transition-transform duration-300 ease-out`}
                    style={{
                        transform: showFilters
                            ? "translateY(0)"
                            : "translateY(-6px)",
                    }}
                >
                    {/* Driver ID or Name Filter */}
                    <div className="flex flex-col gap-2 main-input-container has-icon lg:min-w-[400px] w-full">
                        <label className="block gray-c-d text-sm">
                            Search by Driver ID or Name...
                        </label>
                        <input
                            type="text"
                            placeholder="Search by Driver ID or Name..."
                            className="main-input w-full"
                            value={searchBy.driverIdOrName}
                            onChange={(e) =>
                                setSearchBy((prev) => ({
                                    ...prev,
                                    driverIdOrName: e.target.value,
                                }))
                            }
                            onBlur={(e) =>
                                handleInputBlur(
                                    "driverIdOrName",
                                    e.target.value
                                )
                            }
                            onFocus={() => handleInputFocus("driverIdOrName")}
                        />
                        {!hiddenIcons.has("driverIdOrName") && (
                            <i className="fa-solid fa-magnifying-glass"></i>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                        {/* Status Filter */}
                        <CustomSelect
                            className="min-w-[180px]"
                            label="Status"
                            value={searchBy.status || ""}
                            onChange={(v) =>
                                setSearchBy((prev) => ({
                                    ...prev,
                                    status: v as DriverStatus | "",
                                }))
                            }
                            options={statusOptions}
                        />

                        {/* License Type Filter */}
                        <CustomSelect
                            className="min-w-[180px]"
                            label="License Type"
                            value={searchBy.licenseType || ""}
                            onChange={(v) =>
                                setSearchBy((prev) => ({
                                    ...prev,
                                    licenseType: v as string,
                                }))
                            }
                            options={licenseOptions}
                        />

                        {/* Vehicle Type Filter */}
                        <div className="flex flex-col gap-2 w-full main-input-container has-icon lg:min-w-[220px]">
                            <label className="block gray-c-d text-sm">
                                Vehicle Type
                            </label>
                            <input
                                className="main-input w-full"
                                placeholder="e.g., Car, Van, Truck"
                                value={searchBy.vehicleType}
                                onChange={(e) =>
                                    setSearchBy((prev) => ({
                                        ...prev,
                                        vehicleType: e.target.value,
                                    }))
                                }
                                onBlur={(e) =>
                                    handleInputBlur(
                                        "vehicleType",
                                        e.target.value
                                    )
                                }
                                onFocus={() => handleInputFocus("vehicleType")}
                            />
                            {!hiddenIcons.has("vehicleType") && (
                                <i className="fa-solid fa-car-side"></i>
                            )}
                        </div>
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

export default DriversFiltersSection;
