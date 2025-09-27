import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import { notify } from "../../functions/notify";
import type { DeleteDriverResponse } from "../../../common/Types/Interfaces";

const useDeleteDriver = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        DeleteDriverResponse,
        Error,
        string
    >({
        mutationFn: (driverId: string) =>
            axiosInstance.delete(`/delete-driver/${driverId}`),

        onSuccess: () => {
            notify("success", "Driver deleted successfully");
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

        onError: (error) => {
            console.error("Error deleting driver:", error.message);
        },
    });

    return {
        deleteDriver: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useDeleteDriver;
