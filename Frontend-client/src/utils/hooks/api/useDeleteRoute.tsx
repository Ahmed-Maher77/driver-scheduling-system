import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import { notify } from "../../functions/notify";

interface DeleteRouteResponse {
    message: string;
    route_id: string;
    data?: any;
}

const useDeleteRoute = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        DeleteRouteResponse,
        Error,
        string
    >({
        mutationFn: (routeId: string) =>
            axiosInstance.delete(`/delete-route/${routeId}`),

        onSuccess: () => {
            notify("success", "Route deleted successfully");
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
            notify("error", `Failed to delete route: ${error.message}`);
            console.error("Error deleting route:", error.message);
        },
    });

    return {
        deleteRoute: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useDeleteRoute;
