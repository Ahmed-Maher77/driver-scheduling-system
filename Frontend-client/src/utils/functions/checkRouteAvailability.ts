import axiosInstance from "../hooks/api/axios-utils";

export type RouteAvailability =
    | "assigned"
    | "unassigned"
    | "in progress"
    | "unknown";

interface RouteAvailabilityResponse {
    routeStatus: RouteAvailability;
}

// API call to check route availability by ID
export async function checkRouteAvailability(
    routeId: string
): Promise<RouteAvailability> {
    try {
        const response = await axiosInstance.get(
            `/check-route-availability/${routeId}`
        );
        const data: RouteAvailabilityResponse = response.data;
        return data.routeStatus;
    } catch (error: any) {
        console.error("Error checking route availability:", error);
        // Return 'unknown' as fallback if API call fails
        return "unknown";
    }
}
