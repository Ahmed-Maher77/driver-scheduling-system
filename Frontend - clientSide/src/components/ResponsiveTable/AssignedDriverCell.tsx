import { NavLink } from "react-router-dom";

export interface AssignedDriverCellProps {
    driver?: { id?: string; name?: string };
    cellKey: string;
}

const AssignedDriverCell = ({ driver, cellKey }: AssignedDriverCellProps) => {
    if (!driver) return null;
    return (
        <td key={cellKey} className="p-4">
            {driver.name ? (
                <>
                    {driver.name}
                    {driver.id && (
                        <NavLink
                            to={`/drivers/${driver.id}`}
                            className="blue-c hover-blue-c ml-2 inline-block"
                        >
                            <i className="fa-solid fa-up-right-from-square text-sm"></i>
                        </NavLink>
                    )}
                </>
            ) : (
                <span className="gray-c">Unassigned</span>
            )}
        </td>
    );
};

export default AssignedDriverCell;
