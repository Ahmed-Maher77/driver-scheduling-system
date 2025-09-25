import { NavLink } from "react-router-dom";
import type { SectionHeaderProps } from "../../../common/Types/Interfaces";



const SectionHeader = ({ title, to, label }: SectionHeaderProps) => {
    return (
        <div className="section-header flex justify-between items-center gap-2">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>

            {to && (
                <NavLink to={to} className="text-sm gray-c-d hover-gray-c-d  flex items-center gap-2 animated-hover-icon-container">
                    {label}
                    <i className="fa-solid fa-arrow-right animated-hover-icon"></i>
                </NavLink>
            )}
        </div>
    );
};

export default SectionHeader;
