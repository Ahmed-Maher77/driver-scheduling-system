import type { PastRoutesTimelineProps } from "../../common/Types/Interfaces";

const PastRoutesTimeline = ({ items, currentRoute }: PastRoutesTimelineProps) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const calculateDuration = (assignedAt: string, unassignedAt: string) => {
        const start = new Date(assignedAt);
        const end = new Date(unassignedAt);
        const diffMs = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? "s" : ""} ${diffHours}h`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
        } else {
            const diffMinutes = Math.floor(
                (diffMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
        }
    };

    // Sort items by assigned_at date (most recent first)
    const sortedItems = [...items].sort(
        (a, b) =>
            new Date(b.assigned_at).getTime() -
            new Date(a.assigned_at).getTime()
    );

    const totalCount = items.length + (currentRoute ? 1 : 0);

    return (
        <section className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mt-5">
            <h4 className="font-semibold mb-3 text-xs md:text-base lg:text-lg">
                Assigned Routes {currentRoute ? `(${totalCount})` : items.length > 0 ? `(${items.length})` : ""}
            </h4>
            <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-2 top-2 bottom-2 w-[2px] bg-[#e9edf2]"></div>

                {/* Current Route */}
                {currentRoute && (
                    <div className="relative mb-6 last:mb-0">
                        {/* Dot */}
                        <span className="absolute -left-[22px] top-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>

                        {/* Content */}
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-300">
                            {/* Route Header */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm text-gray-800">
                                    {currentRoute.route_id}
                                </span>
                                <span className="text-xs text-white bg-emerald-500 px-2 py-1 rounded">
                                    Current Route
                                </span>
                            </div>

                            {/* Route Path */}
                            <div className="flex items-center gap-2 mb-3">
                                <i className="fa-solid fa-map-marker-alt text-green-500 text-xs"></i>
                                <span className="text-sm text-gray-700">
                                    {currentRoute.startLocation} → {currentRoute.endLocation}
                                </span>
                            </div>

                            {/* Timeline Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-play text-green-500"></i>
                                    <div>
                                        <div className="text-gray-500">
                                            Assigned
                                        </div>
                                        <div className="text-gray-700 font-medium">
                                            {formatDate(currentRoute.assigned_at)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-hourglass-half text-amber-500"></i>
                                    <div>
                                        <div className="text-gray-500">
                                            Status
                                        </div>
                                        <div className="text-emerald-600 font-medium">
                                            In Progress
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Past Routes */}
                {sortedItems.length > 0 && (
                    <>
                        {currentRoute && (
                            <div className="relative mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-gray-200"></div>
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Past Assignments</span>
                                    <div className="h-px flex-1 bg-gray-200"></div>
                                </div>
                            </div>
                        )}

                        {sortedItems.map((route, index) => (
                            <div
                                key={`${route.route_id}-${index}-${route.assigned_at}`}
                                className="relative mb-6 last:mb-0"
                            >
                                {/* Dot */}
                                <span className="absolute -left-[22px] top-2 w-4 h-4 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm"></span>

                                {/* Content */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    {/* Route Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm text-gray-800">
                                            {route.route_id}
                                        </span>
                                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                            #{index + 1}
                                        </span>
                                    </div>

                                    {/* Route Path */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <i className="fa-solid fa-map-marker-alt text-green-500 text-xs"></i>
                                        <span className="text-sm text-gray-700">
                                            {route.startLocation} → {route.endLocation}
                                        </span>
                                    </div>

                                    {/* Timeline Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-play text-green-500"></i>
                                            <div>
                                                <div className="text-gray-500">
                                                    Assigned
                                                </div>
                                                <div className="text-gray-700 font-medium">
                                                    {formatDate(route.assigned_at)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-stop text-red-500"></i>
                                            <div>
                                                <div className="text-gray-500">
                                                    Unassigned
                                                </div>
                                                <div className="text-gray-700 font-medium">
                                                    {formatDate(route.unassigned_at)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-clock text-blue-500"></i>
                                            <div>
                                                <div className="text-gray-500 text-xs">
                                                    Duration
                                                </div>
                                                <div className="text-gray-700 font-medium text-sm">
                                                    {calculateDuration(
                                                        route.assigned_at,
                                                        route.unassigned_at
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {totalCount === 0 && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-route text-gray-400 text-lg"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">
                                No Routes
                            </div>
                            <div className="text-sm text-gray-600">
                                This driver hasn't been assigned to any routes yet
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PastRoutesTimeline;
