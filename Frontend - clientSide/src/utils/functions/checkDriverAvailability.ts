export type DriverAvailability = "available" | "unavailable" | "on_route";

// Mockable API call to check driver availability by ID
export async function checkDriverAvailability(
    driverId: string
): Promise<DriverAvailability> {
    // TODO: replace with real API request
    // Example:
    // const res = await fetch(`/api/drivers/${driverId}/availability`);
    // const data = await res.json();
    // return data.status as DriverAvailability;

    // Temporary mock logic
    await new Promise((r) => setTimeout(r, 600));
    const id = driverId.toLowerCase();
    if (id.endsWith("0")) return "unavailable";
    if (id.endsWith("5")) return "on_route";
    return "available";
}
