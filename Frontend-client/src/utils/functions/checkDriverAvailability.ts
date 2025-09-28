import axiosInstance from "../hooks/api/axios-utils";

export type DriverAvailability = "available" | "unavailable" | "on_route";

interface DriverAvailabilityResponse {
    driverStatus: DriverAvailability;
    reason?: string;
}

// API call to check driver availability by ID
export async function checkDriverAvailability(
    driverId: string,
    routeId?: string
): Promise<DriverAvailability> {
    try {
        const params = routeId ? { routeId } : {};
        const response = await axiosInstance.get(
            `/check-driver-availability/${driverId}`,
            { params }
        );
        const data: DriverAvailabilityResponse = response.data;
        return data.driverStatus;
    } catch (error: any) {
        console.error("Error checking driver availability:", error);
        // Return 'unavailable' as fallback if API call fails
        return "unavailable";
    }
}
