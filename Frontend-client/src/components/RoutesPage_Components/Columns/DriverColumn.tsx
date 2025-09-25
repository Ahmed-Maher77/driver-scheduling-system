import { NavLink } from "react-router-dom";
import type { TableColumn, RouteRow } from "../../../common/Types/Interfaces";

export const driverColumn: TableColumn<RouteRow> = {
    key: "driver",
    label: "Driver",
    render: (row) =>
        row.assignedDriver?.name ? (
            <NavLink
                to={`/drivers/${row.assignedDriver.id}`}
                className="blue-c hover-blue-c font-medium"
                title="View driver"
            >
                {row.assignedDriver.name}
            </NavLink>
        ) : (
            <span className="gray-c">Unassigned</span>
        ),
    align: "left",
};
