import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import { notify } from "../../functions/notify";
import type { DeleteSelectedDriversResponse } from "../../../common/Types/Interfaces";

const useDeleteSelectedDrivers = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        DeleteSelectedDriversResponse,
        Error,
        string[]
    >({
        mutationFn: async (driverIds: string[]) => {
            const res = await axiosInstance.delete(`/delete-bulk-drivers`, {
                data: { driver_ids: driverIds },
            });
            return res.data;
        },

        onSuccess: (response) => {
            notify(
                "success",
                `${response.deleted_count} drivers deleted successfully`
            );
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
            console.error("Error deleting drivers:", error.message);
        },
    });

    return {
        deleteSelectedDrivers: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useDeleteSelectedDrivers;
