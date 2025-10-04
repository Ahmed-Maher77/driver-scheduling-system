import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { UseGetRoutesByMonthProps } from "../../../common/Types/Interfaces";


function useGetRoutesByMonth({ month, year }: UseGetRoutesByMonthProps) {
    const fetchRoutesByMonth = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-assigned-routes-by-month?month=${month}&year=${year}`
            );
            return res.data;
        } catch (error: any) {
            console.log(error)
            throw new Error(
                "An Error occured while fetching routes by month data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["routes-by-month", month, year],
        queryFn: fetchRoutesByMonth,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetRoutesByMonth;
