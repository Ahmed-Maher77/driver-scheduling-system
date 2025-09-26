import { NavLink } from "react-router-dom";
import type { AssignedDriverCellProps } from "../../common/Types/Interfaces";

const AssignedDriverCell = ({ driver, cellKey }: AssignedDriverCellProps) => {
    return (
        <td key={cellKey} className="p-4">
            {driver?.name ? (
                <NavLink
                    to={`/drivers/${driver?.id}`}
                    className="blue-c hover-blue-c ml-2 inline-block font-medium"
                >
                    {driver?.name}
                </NavLink>
            ) : (
                <span className="gray-c">Unassigned</span>
            )}
        </td>
    );
};

export default AssignedDriverCell;
