import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { ActivityFeedFilters } from "../../../common/Types/Interfaces";

function useGetActivityFeeds({
    pageNumber,
    limit,
    filters = {
        status: "",
        driverName: "",
        dateFrom: "",
        dateTo: "",
    },
}: {
    pageNumber: number;
    limit: number;
    filters?: ActivityFeedFilters;
}) {
    const fetchActivityFeeds = async () => {
        try {
            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", pageNumber.toString());
            queryParams.append("limit", limit.toString());

            // Add filter parameters if they exist
            if (filters.status?.trim()) {
                queryParams.append("status", filters.status.trim());
            }
            if (filters.driverName?.trim()) {
                // driverName searches: driver name, driver ID, and route ID
                queryParams.append("driverName", filters.driverName.trim());
            }
            if (filters.dateFrom?.trim()) {
                queryParams.append("dateFrom", filters.dateFrom.trim());
            }
            if (filters.dateTo?.trim()) {
                queryParams.append("dateTo", filters.dateTo.trim());
            }

            const res = await axiosInstance.get(
                `/get-activity-feeds?${queryParams.toString()}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching activity feeds data: " +
                    error.message
            );
        }
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["activityFeeds", pageNumber, limit, filters],
        queryFn: fetchActivityFeeds,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message, refetch };
}
export default useGetActivityFeeds;
