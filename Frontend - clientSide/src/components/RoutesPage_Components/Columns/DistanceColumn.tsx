import type { TableColumn, RouteRow } from "../../../common/Types/Interfaces";

export const distanceColumn: TableColumn<RouteRow> = {
    key: "distance",
    label: "Distance",
    render: (row) => `${row.distance.toFixed(1)} km`,
    align: "center",
};
