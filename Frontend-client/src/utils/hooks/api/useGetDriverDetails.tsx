import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { UseGetDriverDetailsProps } from "../../../common/Types/Interfaces";

function useGetDriverDetails({ driverId }: UseGetDriverDetailsProps) {
    const fetchDriverDetails = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-driver-details/${driverId}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                error.response.data.message || `An Error occured while fetching driver details: ${error.message}`
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["driver-details", driverId],
        queryFn: fetchDriverDetails,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetDriverDetails;
