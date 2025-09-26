import type { TableColumn, RouteRow } from "../../../common/Types/Interfaces";

export const locationColumn: TableColumn<RouteRow> = {
    key: "location",
    label: "Location",
    render: (row) => (
        <span style={{ minWidth: "280px", display: "inline-block" }}>
            {row.start_location} <span className="gray-c">→</span>{" "}
            {row.end_location}
        </span>
    ),
    align: "left",
};
