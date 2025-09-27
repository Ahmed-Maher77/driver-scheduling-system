import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import type {
    ActivityFeedRow,
    ActivityFeedsTableProps,
    TableColumn,
} from "../../common/Types/Interfaces";


const ActivityFeedsTable = ({
    activityFeeds,
    onViewRoute,
    onViewDriver,
    isLoading = false,
}: ActivityFeedsTableProps) => {
    const columns: TableColumn<Record<string, unknown>>[] = [
        {
            key: "_id",
            label: "ID",
            render: (row: Record<string, unknown>) => {
                const feed = row as ActivityFeedRow;
                return <span>{feed._id?.slice(-8)}</span>;
            },
            align: "left" as const,
        },
        {
            key: "route_id",
            label: "Route ID",
            render: (row: Record<string, unknown>) => {
                const feed = row as ActivityFeedRow;
                return (
                    <button
                        onClick={() => onViewRoute?.(feed.route_id)}
                        className="blue-c hover-blue-c font-medium cursor-pointer"
                    >
                        {feed.route_id}
                    </button>
                );
            },
            align: "left" as const,
        },
        {
            key: "status",
            label: "Status",
            render: (row: Record<string, unknown>) => {
                const feed = row as ActivityFeedRow;
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
                                : status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                        </span>
                    );
                };
                return renderStatusBadge(feed.status);
            },
            align: "center" as const,
        },
        {
            key: "driver",
            label: "Driver",
            render: (row: Record<string, unknown>) => {
                const feed = row as ActivityFeedRow;
                const driver = feed.driver || feed.last_driver;
                const driverId =
                    driver?.id || feed.driver_id || feed.last_driver_id;
                const driverName = driver?.name || driverId;

                if (!driverId || !driverName)
                    return <span className="gray-c">Unassigned</span>;

                return (
                    <button
                        onClick={() => onViewDriver?.(driverId)}
                        className="blue-c hover-blue-c font-medium cursor-pointer"
                        title="View driver"
                    >
                        {driverName}
                    </button>
                );
            },
            align: "left" as const,
        },
        {
            key: "action_time",
            label: "Action Time",
            render: (row: Record<string, unknown>) => {
                const feed = row as ActivityFeedRow;
                return (
                    <span className="text-sm">
                        {new Date(feed.action_time).toLocaleString()}
                    </span>
                );
            },
            align: "center" as const,
        },
    ];

    return (
        <ResponsiveTable
            columns={columns}
            rows={activityFeeds as Record<string, unknown>[]}
            stickyHeader
            tableClassName="w-full"
            cellAlign="center"
            isLoading={isLoading}
        />
    );
};

export default ActivityFeedsTable;
