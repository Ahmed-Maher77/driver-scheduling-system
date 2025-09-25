import { NavLink } from "react-router-dom";

export interface DetailsCellProps {
    id: string;
}

const DetailsCell = ({ id }: DetailsCellProps) => {
    return (
        <td key={`details-${id}`} className="p-4 text-center">
            <NavLink to={`/routes/${id}`} className="blue-c hover-blue-c">
                <i className="fa-solid fa-eye text-xl"></i>
            </NavLink>
        </td>
    );
};

export default DetailsCell;
