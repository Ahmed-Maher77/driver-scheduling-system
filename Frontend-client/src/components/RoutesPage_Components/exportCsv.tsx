import type { RouteRow } from "../../common/Types/Interfaces";

export const exportCsv = (
    routes: RouteRow[],
    filename: string = "routes.csv"
) => {
    const header = [
        "id",
        "startLocation",
        "endLocation",
        "distance_km",
        "status",
        "driver",
        "assignedAt",
    ];

    const rows = routes.map((r) => [
        r.id,
        r.startLocation,
        r.endLocation,
        r.distance,
        r.status,
        r.assignedDriver?.name || "unassigned",
        r.assignedAt,
    ]);

    const csv = [header, ...rows].map((a) => a.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};
