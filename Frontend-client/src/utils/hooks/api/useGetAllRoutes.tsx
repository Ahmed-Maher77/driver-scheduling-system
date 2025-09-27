import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type {
    UseGetAllDriversProps,
    SearchBy,
} from "../../../common/Types/Interfaces";

function useGetAllRoutes({
    pageNumber,
    limit,
    filters = {
        routeIdOrDriverName: "",
        status: "",
        duration: "",
    },
}: UseGetAllDriversProps & { filters?: SearchBy }) {
    const fetchRoutes = async () => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append("page", pageNumber.toString());
            queryParams.append("limit", limit.toString());

            // Add filter parameters if they exist
            if (filters.routeIdOrDriverName?.trim()) {
                queryParams.append(
                    "routeIdOrDriverName",
                    filters.routeIdOrDriverName.trim()
                );
            }
            if (filters.status?.trim() && filters.status !== "all") {
                queryParams.append("status", filters.status.trim());
            }
            if (filters.duration?.trim() && filters.duration !== "any") {
                queryParams.append("duration", filters.duration.trim());
            }

            const res = await axiosInstance.get(
                `/get-all-routes?${queryParams.toString()}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching routes data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["routes", pageNumber, limit, filters],
        queryFn: fetchRoutes,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetAllRoutes;
