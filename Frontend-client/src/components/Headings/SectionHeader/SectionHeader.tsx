import { NavLink } from "react-router-dom";
import type { SectionHeaderProps } from "../../../common/Types/Interfaces";

const SectionHeader = ({
    title,
    to,
    label,
    count,
    countColor = "blue",
}: SectionHeaderProps) => {
    const getCountBadgeClass = (color: string) => {
        const colorMap = {
            blue: "bg-blue-100 text-blue-800",
            green: "bg-green-100 text-green-800",
            purple: "bg-purple-100 text-purple-800",
            red: "bg-red-100 text-red-800",
            yellow: "bg-yellow-100 text-yellow-800",
            gray: "bg-gray-100 text-gray-800",
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    };

    return (
        <div className="section-header flex justify-between items-center gap-2">
            <h3 className={`text-lg font-semibold ${count ? "mb-0" : "mb-2"}`}>
                {title}
            </h3>

            <div className="flex items-center gap-3">
                {count !== undefined && (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCountBadgeClass(
                            countColor
                        )}`}
                    >
                        {count}{" "}
                        {countColor === "blue"
                            ? "Total"
                            : countColor === "green"
                            ? "Routes"
                            : countColor === "purple"
                            ? "Activities"
                            : "Items"}
                    </span>
                )}
                {to && (
                    <NavLink
                        to={to}
                        className="text-sm gray-c-d hover-gray-c-d flex items-center gap-2 animated-hover-icon-container"
                    >
                        {label}
                        <i className="fa-solid fa-arrow-right animated-hover-icon"></i>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default SectionHeader;
