import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";

interface UseGetAllDriversProps {
    pageNumber: number;
    limit: number;
}

function useGetAllDrivers({ pageNumber, limit }: UseGetAllDriversProps) {
    const fetchDrivers = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-all-drivers?page=${pageNumber}&limit=${limit}`
            );
            console.log("API Response:", res.data); // Debug log
            return res.data;
        } catch (error: any) {
            console.error("API Error:", error); // Debug log
            throw new Error(
                "An Error occured while fetching drivers data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["drivers", pageNumber, limit],
        queryFn: fetchDrivers,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetAllDrivers;
