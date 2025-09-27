import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";

function useGetActivityFeeds({
    pageNumber,
    limit,
}: {
    pageNumber: number;
    limit: number;
}) {
    const fetchActivityFeeds = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-activity-feeds?page=${pageNumber}&limit=${limit}`
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
        queryKey: ["activityFeeds", pageNumber, limit],
        queryFn: fetchActivityFeeds,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message, refetch };
}
export default useGetActivityFeeds;
