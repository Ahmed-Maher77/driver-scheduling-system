import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type {
    DriverForm,
    UpdateDriverResponse,
} from "../../../common/Types/Interfaces";
import { notify } from "../../functions/notify";

const useUpdateDriver = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        UpdateDriverResponse,
        Error,
        { driverId: string; driverData: DriverForm; showNotification?: boolean }
    >({
        mutationFn: ({
            driverId,
            driverData,
        }: {
            driverId: string;
            driverData: DriverForm;
        }) => axiosInstance.put(`/edit-driver/${driverId}`, driverData),

        onSuccess: (_, variables) => {
            // Only show notification if showNotification is not explicitly set to false
            if (variables.showNotification !== false) {
                notify("success", "Driver updated successfully");
            }
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            queryClient.invalidateQueries({ queryKey: ["routes"] });
            queryClient.invalidateQueries({ queryKey: ["routes-summary"] });
            queryClient.invalidateQueries({
                queryKey: ["activityFeeds-summary"],
            });
            queryClient.invalidateQueries({ queryKey: ["activityFeeds"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            // Invalidate specific driver details
            queryClient.invalidateQueries({
                queryKey: ["driver-details", variables.driverId],
            });
        },

        onError: (error: any) => {
            console.error("Error updating driver:", error.message);
            // Extract error message from backend response
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to update driver";
            notify("error", errorMessage);
        },
    });

    return {
        updateDriver: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useUpdateDriver;
