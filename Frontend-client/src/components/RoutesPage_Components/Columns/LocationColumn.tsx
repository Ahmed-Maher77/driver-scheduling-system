import type { TableColumn, RouteRow } from "../../../common/Types/Interfaces";

export const locationColumn: TableColumn<RouteRow> = {
    key: "location",
    label: "Location",
    render: (row) => (
        <span>
            {row.startLocation} <span className="gray-c">→</span>{" "}
            {row.endLocation}
        </span>
    ),
    align: "left",
};
