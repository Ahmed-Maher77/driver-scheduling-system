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
}: DriverFiltersSectionProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>("0px");

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
                    className="routes-filters-actions white-bg p-4 py-6 pb-2 rounded-lg rounded-b-none shadow-md flex flex-col gap-4 xl:items-center w-full transform transition-transform duration-300 ease-out"
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
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
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
                            />
                            <i className="fa-solid fa-car-side"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriversFiltersSection;
