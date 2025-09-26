import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import { notify } from "../../functions/notify";
import type { DeleteSelectedRoutesResponse } from "../../../common/Types/Interfaces";

const useDeleteSelectedRoutes = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        DeleteSelectedRoutesResponse,
        Error,
        string[]
    >({
        mutationFn: async (routeIds: string[]) => {
            const res = await axiosInstance.delete("/delete-bulk-routes", {
                data: { route_ids: routeIds },
            });
            return res.data;
        },

        onSuccess: (response) => {
            notify(
                "success",
                `Successfully deleted ${response.deleted_count} routes`
            );
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["routes"] });
            queryClient.invalidateQueries({ queryKey: ["routes-summary"] });
            queryClient.invalidateQueries({
                queryKey: ["activityFeeds-summary"],
            });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
        },

        onError: (error) => {
            notify(
                "error",
                `Failed to delete selected routes: ${error.message}`
            );
            console.error("Error deleting selected routes:", error.message);
        },
    });

    return {
        deleteSelectedRoutes: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useDeleteSelectedRoutes;
