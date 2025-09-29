import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import { notify } from "../../functions/notify";
import type {
    RouteRow,
    UpdateRouteResponse,
} from "../../../common/Types/Interfaces";

const useUpdateRoute = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        UpdateRouteResponse,
        Error,
        { routeId: string | undefined; routeData: RouteRow }
    >({
        mutationFn: ({
            routeId,
            routeData,
        }: {
            routeId: string | undefined;
            routeData: RouteRow;
        }) => axiosInstance.put(`/edit-route/${routeId}`, routeData),

        onSuccess: (_, variables) => {
            notify("success", "Route updated successfully");
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["routes"] });
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            queryClient.invalidateQueries({ queryKey: ["routes-summary"] });
            queryClient.invalidateQueries({
                queryKey: ["activityFeeds-summary"],
            });
            queryClient.invalidateQueries({ queryKey: ["activityFeeds"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            // Invalidate specific route details
            queryClient.invalidateQueries({
                queryKey: ["route-details", variables.routeId],
            });
        },

        onError: (error: any) => {
            console.error("Error updating route:", error.message);
            // Extract error message from backend response
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to update route";
            notify("error", errorMessage);
        },
    });

    return {
        updateRoute: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useUpdateRoute;
