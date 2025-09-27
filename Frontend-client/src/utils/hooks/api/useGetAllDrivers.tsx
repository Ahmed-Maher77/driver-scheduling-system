import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { DriverFilters, UseGetAllDriversProps } from "../../../common/Types/Interfaces";


function useGetAllDrivers({
    pageNumber,
    limit,
    filters = {},
}: UseGetAllDriversProps & { filters?: DriverFilters }) {
    const fetchDrivers = async () => {
        try {
            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", pageNumber.toString());
            queryParams.append("limit", limit.toString());

            // Add filter parameters if they exist
            if (filters.driverIdOrName?.trim()) {
                queryParams.append(
                    "driverIdOrName",
                    filters.driverIdOrName.trim()
                );
            }
            if (filters.status?.trim()) {
                queryParams.append("status", filters.status.trim());
            }
            if (filters.vehicleType?.trim()) {
                queryParams.append("vehicleType", filters.vehicleType.trim());
            }
            if (filters.licenseType?.trim()) {
                queryParams.append("licenseType", filters.licenseType.trim());
            }

            const res = await axiosInstance.get(
                `/get-all-drivers?${queryParams.toString()}`
            );
            return res.data;
        } catch (error: any) {
            throw new Error(
                "An Error occured while fetching drivers data: " + error.message
            );
        }
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["drivers", pageNumber, limit, filters],
        queryFn: fetchDrivers,
        staleTime: 10000, // Data stays fresh for 10 seconds
    });

    return { data, isLoading, error: error?.message };
}
export default useGetAllDrivers;
