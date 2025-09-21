import SectionHeader from "../../Headings/SectionHeader/SectionHeader";
import "./RoutesContainer.scss";
import ResponsiveTable from "../../ResponsiveTable/ResponsiveTable";
import type { RouteItem } from "../../../common/Types/Interfaces";

const routesData: RouteItem[] = [
    {
        id: "RT001",
        startLocation: "Warehouse A",
        endLocation: "City Center",
        status: "assigned",
        assignedDriver: {
            id: "DR001",
            name: "Ethan Harper"
        },
    },
    {
        id: "RT002",
        startLocation: "Warehouse B",
        endLocation: "Suburb North",
        status: "unassigned",
        assignedDriver: {
            id: null,
            name: null
        }
    },
    {
        id: "RT002",
        startLocation: "Warehouse C",
        endLocation: "Suburb North",
        status: "inProgress",
        assignedDriver: {
            id: null,
            name: null
        }
    },
    {
        id: "RT003",
        startLocation: "Warehouse C",
        endLocation: "Suburb South",
        status: "assigned",
        assignedDriver: {
            id: "DR003",
            name: "Noah White"
        },
    },
];

const RoutesContainer = () => {
    const columns = [
        { key: "id", label: "Route Id" },
        {
            key: "startLocation",
            label: "Start Location"
        },
        { key: "endLocation", label: "End Location" },
        {
            key: "status",
            label: "Status",
            render: (row: RouteItem) => renderStatusBadge(row.status),
        },
        {
            key: "assignedDriver",
            label: "Assigned Driver",
        },
        {
            key: "seeDetails",
            label: "See Details",
        },
    ];

    // Render Status Badge
    const renderStatusBadge = (status: string) => {
        const cls =
            status === "assigned"
                ? "status-assigned"
                : status === "unassigned"
                    ? "status-unassigned"
                    : "status-inProgress";
        return <span className={`status-badge ${cls}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
    };

    return (
        <div className="routes-container white-bg p-4 rounded-lg shadow-md">
            <SectionHeader title="Routes" to="/routes" label="See All" />

            <ResponsiveTable<RouteItem>
                columns={columns}
                rows={routesData}
                stickyHeader
                className="mt-4"
                tableClassName="w-full"
                cellAlign="center"
                seeDetails={true}
            />
        </div>
    );
};

export default RoutesContainer;
