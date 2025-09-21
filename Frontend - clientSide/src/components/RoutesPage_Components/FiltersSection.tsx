import CustomSelect from "./CustomSelect";
import Tooltip from "../Tooltip/Tooltip";
import type { FiltersSectionProps } from "../../common/Types/Interfaces";

const FiltersSection = ({
    showFilters,
    onToggleFilters,
    searchBy,
    setSearchBy,
}: FiltersSectionProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBy((prev) => ({ ...prev, routeId: e.target.value }));
    };
    const handleStatusChange = (value: string) => {
        setSearchBy((prev) => ({ ...prev, status: value }));
    };
    const handleDurationChange = (value: string) => {
        setSearchBy((prev) => ({ ...prev, duration: value }));
    };

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
                className={`routes-filters-actions white-bg p-4 py-6 rounded-lg shadow-md my-4 mb-10 flex flex-col xl:flex-row gap-4 xl:items-center w-full ${
                    showFilters ? "" : "hidden"
                }`}
            >
                <div className="flex flex-col gap-2 main-input-container has-icon lg:min-w-[400px] w-full">
                    <label className="block gray-c-d text-sm">
                        Search by Route ID or Driver name...
                    </label>
                    <input
                        type="text"
                        placeholder="Search by Route ID or Driver name..."
                        className="main-input w-full"
                        value={searchBy.routeId}
                        onChange={handleSearchChange}
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
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
                            {
                                label: "Unassigned",
                                value: "unassigned",
                            },
                            {
                                label: "In Progress",
                                value: "in progress",
                            },
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
            </div>
        </>
    );
};

export default FiltersSection;
