import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import type {
    TableColumn,
    DriverRow,
    DriversTableProps,
} from "../../common/Types/Interfaces";
import defaultDriverPicture from "../../assets/images/person.png";

const DriversTable = ({
    drivers,
    selected,
    selectedCount,
    allSelected,
    onToggleAll,
    onToggleOne,
    onViewDriver,
    onEditDriver,
    onDeleteDriver,
    isLoading,
    error,
}: DriversTableProps) => {
    const headerCheckboxRef = useRef<HTMLInputElement>(null);

    // Update header checkbox indeterminate state
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate =
                selectedCount > 0 && !allSelected;
        }
    }, [selectedCount, allSelected]);

    // ================== Columns ==================
    const columns: TableColumn<DriverRow>[] = [
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
                    checked={!!selected[row.driver_id]}
                    onChange={() => onToggleOne(row.driver_id)}
                />
            ),
            align: "center",
        },
        { key: "driver_id", label: "Driver ID", align: "left" },
        {
            key: "picture",
            label: "Picture",
            render: (row) => (
                <img
                    src={
                        typeof row.picture === "string" && row.picture
                            ? row.picture
                            : defaultDriverPicture
                    }
                    alt={row.name}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                />
            ),
            align: "center",
        },
        { key: "name", label: "Name", align: "left" },
        {
            key: "assignedRoute",
            label: "Assigned Route",
            render: (row) =>
                row.assignedRoute ? (
                    <NavLink
                        to={`/routes/${row.assignedRoute.id}`}
                        className="blue-c hover-blue-c cursor-pointer font-medium"
                    >
                        {row.assignedRoute.id}
                    </NavLink>
                ) : (
                    <span className="gray-c">Unassigned</span>
                ),
            align: "center",
        },
        { key: "vehicle_type", label: "Vehicle Type", align: "center" },
        {
            key: "status",
            label: "Status",
            render: (row) => {
                const cls =
                    row.status === "available"
                        ? "status-assigned"
                        : row.status === "unavailable"
                        ? "status-unassigned"
                        : "status-inProgress";
                const label =
                    row.status === "on_route"
                        ? "On Route"
                        : row.status.charAt(0).toUpperCase() +
                          row.status.slice(1);
                return <span className={`status-badge ${cls}`}>{label}</span>;
            },
            align: "center",
        },
        { key: "license_type", label: "License Type", align: "center" },
        { key: "phone", label: "Phone", align: "center" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex items-center gap-3 justify-center">
                    <button
                        title="View"
                        className="blue-c hover-blue-c cursor-pointer"
                        onClick={() => onViewDriver(row.driver_id)}
                    >
                        <i className="fa-solid fa-eye cursor-pointer"></i>
                    </button>
                    <button
                        title="Edit"
                        className="blue-c hover-blue-c cursor-pointer"
                        onClick={() => onEditDriver(row.driver_id)}
                    >
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                        title="Delete"
                        className="red-c hover-red-c cursor-pointer"
                        onClick={() => onDeleteDriver(row.driver_id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
            align: "center",
        },
    ];

    return (
        <ResponsiveTable<DriverRow>
            columns={columns}
            rows={drivers}
            stickyHeader
            tableClassName="w-full"
            cellAlign="center"
            isLoading={isLoading}
            error={error}
        />
    );
};

export default DriversTable;
