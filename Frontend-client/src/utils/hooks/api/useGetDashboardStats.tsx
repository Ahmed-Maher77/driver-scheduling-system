import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";

function useGetDashboardStats() {
    const fetchDashboardStats = async () => {
        try {
            const res = await axiosInstance.get(`/get-dashboard-stats`);
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching dashboard statistics data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: fetchDashboardStats,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetDashboardStats;
