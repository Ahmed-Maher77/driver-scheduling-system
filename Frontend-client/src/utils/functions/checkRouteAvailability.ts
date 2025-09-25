export type RouteAvailability =
    | "assigned"
    | "unassigned"
    | "in progress"
    | "unknown";

// Mockable API call to check route availability by ID
export async function checkRouteAvailability(
    routeId: string
): Promise<RouteAvailability> {
    // TODO: replace with real API request
    // Example:
    // const res = await fetch(`/api/routes/${routeId}/availability`);
    // const data = await res.json();
    // return data.status as RouteAvailability;

    // Temporary mock logic
    await new Promise((r) => setTimeout(r, 600));
    const id = routeId.toLowerCase();

    // Mock different route statuses based on ID
    if (id.endsWith("1")) return "assigned";
    if (id.endsWith("2")) return "in progress";
    if (id.endsWith("3")) return "unassigned";

    // Default to assigned for other IDs
    return "assigned";
}
