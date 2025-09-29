import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { DriverForm } from "../../../common/Types/Interfaces";
import { notify } from "../../functions/notify";

interface AddDriverResponse {
    message: string;
    driver_id: string;
    data?: any;
}

const useAddNewDriver = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        AddDriverResponse,
        Error,
        DriverForm
    >({
        mutationFn: (driverData: DriverForm) =>
            axiosInstance.post("/add-new-driver", driverData),

        onSuccess: () => {
            notify("success", "Driver added successfully");
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            queryClient.invalidateQueries({ queryKey: ["routes"] });
            queryClient.invalidateQueries({ queryKey: ["routes-summary"] });
            queryClient.invalidateQueries({
                queryKey: ["activityFeeds-summary"],
            });
            queryClient.invalidateQueries({ queryKey: ["activityFeeds"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
        },

        onError: (error: any) => {
            console.error("Error creating driver:", error.message);
            // Extract error message from backend response
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to create driver";
            notify("error", errorMessage);
        },
    });

    return {
        addDriver: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useAddNewDriver;
