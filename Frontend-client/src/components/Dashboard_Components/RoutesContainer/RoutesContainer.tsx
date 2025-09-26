import "./RoutesContainer.scss";
import ResponsiveTable from "../../ResponsiveTable/ResponsiveTable";
import type { RouteItem } from "../../../common/Types/Interfaces";
import useGetRoutesSummary from "../../../utils/hooks/api/useGetRoutesSummary";
import { useEffect } from "react";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";

// const routesData: RouteItem[] = [
//     {
//         id: "RT001",
//         startLocation: "Warehouse A",
//         endLocation: "City Center",
//         status: "assigned",
//         assignedDriver: {
//             id: "DR001",
//             name: "Ethan Harper"
//         },
//     },
//     {
//         id: "RT002",
//         startLocation: "Warehouse B",
//         endLocation: "Suburb North",
//         status: "unassigned",
//         assignedDriver: {
//             id: null,
//             name: null
//         }
//     },
//     {
//         id: "RT002",
//         startLocation: "Warehouse C",
//         endLocation: "Suburb North",
//         status: "in progress",
//         assignedDriver: {
//             id: null,
//             name: null
//         }
//     },
//     {
//         id: "RT003",
//         startLocation: "Warehouse C",
//         endLocation: "Suburb South",
//         status: "assigned",
//         assignedDriver: {
//             id: "DR003",
//             name: "Noah White"
//         },
//     },
// ];

const RoutesContainer = () => {
    const {
        data: fetchedRoutesSummaryData,
        isLoading,
        error,
    } = useGetRoutesSummary();

    useEffect(() => {
        console.log("fetchedRoutesSummaryData", fetchedRoutesSummaryData);
    }, [fetchedRoutesSummaryData]);

    const columns = [
        { key: "route_id", label: "Route Id" },
        {
            key: "start_location",
            label: "Start Location",
        },
        { key: "end_location", label: "End Location" },
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
        return (
            <span className={`status-badge ${cls}`}>
                {status === "in progress"
                    ? "In Progress"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const routesCount = fetchedRoutesSummaryData?.data?.length || 0;

    return (
        <div className="routes-container white-bg p-4 rounded-lg shadow-md">
            <SectionHeader
                title="Routes"
                to="/routes"
                label="See All"
                count={routesCount}
                countColor="green"
            />

            <ResponsiveTable<RouteItem>
                columns={columns}
                rows={fetchedRoutesSummaryData?.data}
                stickyHeader
                className="mt-4"
                tableClassName="w-full"
                cellAlign="center"
                seeDetails={true}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
};

export default RoutesContainer;
