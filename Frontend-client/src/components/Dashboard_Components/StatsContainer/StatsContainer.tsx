import StatsCard from "./StatsCard/StatsCard";
import type { StatsCardProps } from "../../../common/Types/Interfaces";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useGetDashboardStats from "../../../utils/hooks/api/useGetDashboardStats";
import SectionHeader from "../../Headings/SectionHeader/SectionHeader";

const StatsContainer = () => {
    const { data: fetchedStatsData, isLoading, error } = useGetDashboardStats();

    // Map API response keys to display titles
    const statsData = [
        {
            title: "Total Drivers",
            value: fetchedStatsData?.totalDrivers || 0,
            iconClass: "fa-solid fa-users",
        },
        {
            title: "Available Drivers",
            value: fetchedStatsData?.availableDrivers || 0,
            iconClass: "fa-solid fa-user-plus",
        },
        {
            title: "Total Routes",
            value: fetchedStatsData?.totalRoutes || 0,
            iconClass: "fa-solid fa-route",
        },
        {
            title: "Unassigned Routes",
            value: fetchedStatsData?.unassignedRoutes || 0,
            iconClass: "fa-solid fa-road-circle-check",
        },
    ] as StatsCardProps[];

    // ================= Loading Status =================
    if (isLoading) {
        return <LoadingSpinner message="Loading dashboard statistics..." />;
    }

    // ================= Error Status =================
    if (error) {
        return <ErrorMessage message={error} />;
    }

    const totalStats = statsData.reduce((sum, stat) => sum + stat.value, 0);

    return (
        <section className="stats-container mt-6">
            <SectionHeader
                title="Statistics"
                count={totalStats}
                countColor="blue"
            />

            {/* ================= Stats Cards ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {statsData.map((stat) => (
                    <StatsCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        iconClass={stat.iconClass}
                    />
                ))}
            </div>
        </section>
    );
};

export default StatsContainer;
