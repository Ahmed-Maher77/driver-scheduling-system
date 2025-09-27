import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type {
    ActivityFeedRow,
    ActivityFeedFilters,
    UseActivityFeedsActionsProps,
    UseActivityFeedsActionsReturn,
} from "../../../common/Types/Interfaces";

const useActivityFeedsActions = ({
    activityFeeds,
    refetch,
}: UseActivityFeedsActionsProps): UseActivityFeedsActionsReturn => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleViewRoute = (routeId: string) => {
        navigate(`/routes/${routeId}`);
    };

    const handleViewDriver = (driverId: string) => {
        navigate(`/drivers/${driverId}`);
    };

    const handleExport = () => {
        const exportActivityFeedsCsv = (
            feeds: ActivityFeedRow[],
            filename: string = "activity-feeds.csv"
        ) => {
            const header = [
                "ID",
                "Route ID",
                "Status",
                "Driver Name",
                "Driver ID",
                "Action Time",
            ];

            const rows = feeds.map((feed) => {
                const driver = feed.driver || feed.last_driver;
                const driverId =
                    driver?.id || feed.driver_id || feed.last_driver_id;
                const driverName = driver?.name || "Unknown";

                return [
                    feed._id?.slice(-8) || "",
                    feed.route_id || "",
                    feed.status || "",
                    driverName,
                    driverId || "",
                    new Date(feed.action_time).toLocaleString(),
                ];
            });

            const csv = [header, ...rows]
                .map((row) => row.join(","))
                .join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        };

        exportActivityFeedsCsv(activityFeeds);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await queryClient.invalidateQueries({
                queryKey: ["activityFeeds"],
            });
            await refetch();
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleFilterChange = (newFilters: ActivityFeedFilters) => {
        // TODO: Implement filtering logic
        console.log("Filter changed:", newFilters);
    };

    const handleClearFilters = () => {
        // TODO: Implement clear filters logic
        console.log("Clear filters");
    };

    return {
        isRefreshing,
        handleViewRoute,
        handleViewDriver,
        handleExport,
        handleRefresh,
        handleFilterChange,
        handleClearFilters,
    };
};

export default useActivityFeedsActions;
