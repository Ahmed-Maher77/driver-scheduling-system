import axiosInstance from "../hooks/api/axios-utils";

export type DriverAvailability = "available" | "unavailable" | "on_route";

interface DriverAvailabilityResponse {
    driverStatus: DriverAvailability;
}

// API call to check driver availability by ID
export async function checkDriverAvailability(
    driverId: string
): Promise<DriverAvailability> {
    try {
        const response = await axiosInstance.get(
            `/check-driver-availability/${driverId}`
        );
        const data: DriverAvailabilityResponse = response.data;
        return data.driverStatus;
    } catch (error: any) {
        console.error("Error checking driver availability:", error);
        // Return 'unavailable' as fallback if API call fails
        return "unavailable";
    }
}
