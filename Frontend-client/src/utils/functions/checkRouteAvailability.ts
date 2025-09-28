import axiosInstance from "../hooks/api/axios-utils";

export type RouteAvailability =
    | "assigned"
    | "unassigned"
    | "in progress"
    | "unknown";

interface RouteAvailabilityResponse {
    routeStatus: RouteAvailability;
    reason?: string;
}

// API call to check route availability by ID
export async function checkRouteAvailability(
    routeId: string,
    driverId?: string
): Promise<RouteAvailability> {
    try {
        const params = driverId ? { driverId } : {};
        const response = await axiosInstance.get(
            `/check-route-availability/${routeId}`,
            { params }
        );
        const data: RouteAvailabilityResponse = response.data;
        return data.routeStatus;
    } catch (error: any) {
        console.error("Error checking route availability:", error);
        // Return 'unknown' as fallback if API call fails
        return "unknown";
    }
}
