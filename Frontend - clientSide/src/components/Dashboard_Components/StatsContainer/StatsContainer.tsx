import StatsCard from "./StatsCard/StatsCard";
import type { StatsCardProps } from "../../../common/Types/Interfaces";

const statsData = [
    { title: "Total Drivers", value: 120, iconClass: "fa-solid fa-users" },
    { title: "Available Drivers", value: 45, iconClass: "fa-solid fa-user-xmark" },
    { title: "Total Routes", value: 400, iconClass: "fa-solid fa-route" },
    { title: "Unassigned Routes", value: 35, iconClass: "fa-solid fa-road-circle-xmark" },
] as StatsCardProps[];

const StatsContainer = () => {
    return (
        <section className="stats-container mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    iconClass={stat.iconClass}
                />
            ))}
        </section>
    );
};

export default StatsContainer;
