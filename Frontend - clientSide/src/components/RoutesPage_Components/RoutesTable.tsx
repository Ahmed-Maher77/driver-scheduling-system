import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import type { TableColumn, RouteRow, RoutesTableProps } from "../../common/Types/Interfaces";

const RoutesTable = ({
    routes,
    selected,
    selectedCount,
    allSelected,
    onToggleAll,
    onToggleOne,
    onViewRoute,
    onEditRoute,
    onDeleteRoute,
}: RoutesTableProps) => {
    const headerCheckboxRef = useRef<HTMLInputElement>(null);

    // Update header checkbox indeterminate state
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedCount > 0 && !allSelected;
        }
    }, [selectedCount, allSelected]);

    const columns: TableColumn<RouteRow>[] = [
        // Select Column
        {
            key: "select",
            label: (
                <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    className={`checkbox ${
                        selectedCount > 0 && !allSelected ? "indeterminate" : ""
                    }`}
                    checked={allSelected}
                    onChange={onToggleAll}
                />
            ) as unknown as string,
            render: (row) => (
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={!!selected[row.id]}
                    onChange={() => onToggleOne(row.id)}
                />
            ),
            align: "center",
        },
        // Route ID Column
        { key: "id", label: "Route ID", align: "left" },
        // Location Column
        {
            key: "location",
            label: "Location",
            render: (row) => (
                <span>
                    {row.startLocation} <span className="gray-c">→</span>{" "}
                    {row.endLocation}
                </span>
            ),
            align: "left",
        },
        // Distance Column
        {
            key: "distance",
            label: "Distance",
            render: (row) => `${row.distance.toFixed(1)} km`,
            align: "center",
        },
        // Status Column
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span
                    className={`status-badge ${
                        row.status === "assigned"
                            ? "status-assigned"
                            : row.status === "unassigned"
                            ? "status-unassigned"
                            : "status-inProgress"
                    }`}
                >
                    {row.status}
                </span>
            ),
            align: "center",
        },
        // Driver Column
        {
            key: "driver",
            label: "Driver",
            render: (row) =>
                row.assignedDriver?.name ? (
                    <span className="flex items-center gap-2">
                        {row.assignedDriver.name}
                        {row.assignedDriver.id && (
                            <NavLink
                                to={`/drivers/${row.assignedDriver.id}`}
                                className="blue-c hover-blue-c"
                                title="View driver"
                            >
                                <i className="fa-solid fa-up-right-from-square text-sm"></i>
                            </NavLink>
                        )}
                    </span>
                ) : (
                    <span className="gray-c">Unassigned</span>
                ),
            align: "left",
        },
        // Assigned At Column
        { key: "assignedAt", label: "Assigned At", align: "center" },
        // Actions Column
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex items-center gap-3 justify-center">
                    {/* View Button */}
                    <button
                        title="View"
                        className="blue-c hover-blue-c cursor-pointer"
                        onClick={() => onViewRoute(row.id)}
                    >
                        <i className="fa-solid fa-eye cursor-pointer"></i>
                    </button>
                    {/* Edit Button */}
                    <button
                        title="Edit"
                        className="blue-c hover-blue-c cursor-pointer"
                        onClick={() => onEditRoute(row.id)}
                    >
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    {/* Delete Button */}
                    <button
                        title="Delete"
                        className="red-c hover-red-c cursor-pointer"
                        onClick={() => onDeleteRoute(row.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
            align: "center",
        },
    ];

    return (
        <ResponsiveTable<RouteRow>
            columns={columns}
            rows={routes}
            stickyHeader
            tableClassName="w-full"
            cellAlign="center"
        />
    );
};

export default RoutesTable;
