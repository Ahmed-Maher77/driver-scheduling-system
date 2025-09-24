import type { DriverRow } from "../../common/Types/Interfaces";

export const exportDriversCsv = (
    drivers: DriverRow[],
    filename: string = "drivers.csv"
) => {
    const header = [
        "id",
        "name",
        "phone",
        "status",
        "assignedRouteId",
        "vehicleType",
        "licenseType",
    ];

    const rows = drivers.map((d) => [
        d.id,
        d.name,
        d.phone || "",
        d.status,
        d.assignedRouteId || "",
        d.vehicleType || "",
        d.licenseType || "",
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
