import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios-utils";
import type { AddRouteItemProps, AddRouteResponse } from "../../../common/Types/Interfaces";
import { notify } from "../../functions/notify";


const useAddNewRoute = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, error, data } = useMutation<
        AddRouteResponse,
        Error,
        AddRouteItemProps
    >({
        mutationFn: (routeData: AddRouteItemProps) =>
            axiosInstance.post("/add-new-route", routeData),

        onSuccess: () => {
            notify("success", "Route added successfully");
            // Invalidate relevant queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["routes"] });
            queryClient.invalidateQueries({ queryKey: ["routes-summary"] });
            queryClient.invalidateQueries({
                queryKey: ["activityFeeds-summary"],
            });
            queryClient.invalidateQueries({ queryKey: ["activityFeeds"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
        },

        onError: (error) => {
            console.error("Error creating route:", error.message);
        },
    });

    return {
        addRoute: mutateAsync,
        isPending,
        error,
        data,
    };
};

export default useAddNewRoute;
