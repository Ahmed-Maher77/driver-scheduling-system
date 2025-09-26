import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";

function useGetSummaryOfActivityFeeds() {
    const fetchActivityFeedsSummary = async () => {
        try {
            const res = await axiosInstance.get(`/get-activity-feeds/summary`);
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching activity feeds summary data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["activityFeeds-summary"],
        queryFn: fetchActivityFeedsSummary,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetSummaryOfActivityFeeds;
