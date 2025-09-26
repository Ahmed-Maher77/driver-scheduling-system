import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { UseGetAllDriversProps } from "../../../common/Types/Interfaces";

function useGetAllRoutes({ pageNumber, limit }: UseGetAllDriversProps) {
    const fetchRoutes = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-all-routes?page=${pageNumber}&limit=${limit}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching routes data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["routes", pageNumber, limit],
        queryFn: fetchRoutes,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetAllRoutes;
