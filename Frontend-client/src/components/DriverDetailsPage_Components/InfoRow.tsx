import { NavLink } from "react-router-dom";
import type { InfoRowProps } from "../../common/Types/Interfaces";

const InfoRow = ({ label, value, href, to }: InfoRowProps) => {
    return (
        <div className="flex flex-col">
            {/* Label */}
            <span className="gray-c-d text-xs md:text-sm lg:text-base font-medium">
                {label}
            </span>

            {/* Value - render based on priority: to > href > plain text */}
            {to && value ? (
                <NavLink to={to} className="text-sm social-link break-all">
                    {String(value)}
                </NavLink>
            ) : href && value ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm social-link break-all"
                >
                    {String(value)}
                </a>
            ) : (
                <span className="text-sm gray-c">{value ?? "-"}</span>
            )}
        </div>
    );
};

export default InfoRow;
