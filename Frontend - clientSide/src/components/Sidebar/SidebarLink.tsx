import { NavLink } from "react-router-dom";
import type { SidebarLinkProps } from "../../common/Types/Interfaces";
import Tooltip from "../Tooltip/Tooltip";

const SidebarLink: React.FC<SidebarLinkProps> = ({
    to,
    title,
    iconClass,
    compressSidebar,
    onClick,
    label,
}) => (
    <li>
        <NavLink
            onClick={onClick}
            to={to}
            title={title}
            className={`px-[12px] py-[10px] flex items-center tooltip-container ${
                compressSidebar ? "lg:justify-center" : ""
            }`}
        >
            <i className={`${iconClass} text-[1.3rem] me-[20px] ${compressSidebar ? "lg:me-0" : "lg:me-[20px]"}`}></i>
            <span className={compressSidebar ? "lg:hidden inline" : "inline"}>
                {label}
            </span>
			<Tooltip content={label} direction="top" />
        </NavLink>
    </li>
);

export default SidebarLink;
