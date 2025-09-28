import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { UseGetRouteDetailsProps } from "../../../common/Types/Interfaces";

function useGetRouteDetails({ routeId }: UseGetRouteDetailsProps) {
    const fetchRouteDetails = async () => {
        try {
            const res = await axiosInstance.get(
                `/get-route-details/${routeId}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                error.response.data.message ||
                    `An Error occured while fetching route details: ${error.message}`
            );
        }
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["route-details", routeId],
        queryFn: fetchRouteDetails,
        staleTime: 10000, // Data stays fresh for 10 seconds
        enabled: !!routeId, // Only run query if routeId exists
    });

    return { data, isLoading, error: error?.message, refetch };
}
export default useGetRouteDetails;
