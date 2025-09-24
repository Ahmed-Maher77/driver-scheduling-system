import type { TableColumn, RouteRow } from "../../../common/Types/Interfaces";

export const statusColumn: TableColumn<RouteRow> = {
    key: "status",
    label: "Status",
    render: (row) => {
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
        return renderStatusBadge(row.status);
    },
    align: "center",
};
