import Tooltip from "../../components/Tooltip/Tooltip";
import type { DayGridProps } from "../../common/Types/Interfaces";

const DayGrid = ({
    monthMatrix,
    monthRoutesByDate,
    isLoading = false,
    errorMessage = "",
    onOpenDay,
}: DayGridProps) => {
    const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-2">
            {/* ================== Loading ================== */}
            {isLoading && (
                <div className="col-span-7 text-center py-6 gray-c text-lg">
                    <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading
                    routes...
                </div>
            )}

            {/* ================== Error Message ================== */}
            {errorMessage && (
                <div className="col-span-7 text-center py-6 gray-c text-lg">
                    {errorMessage}
                </div>
            )}

            {/* ================== Day Grid ================== */}
            {monthMatrix.map((date, idx) => {
                // Empty Day Cell
                if (!date)
                    return (
                        <div
                            key={idx}
                            className="p-3 rounded-lg bg-transparent min-h-[96px]"
                        />
                    );
                const y = date.getFullYear();
                const m = `${date.getMonth() + 1}`.padStart(2, "0");
                const d = `${date.getDate()}`.padStart(2, "0");
                const key = `${y}-${m}-${d}`;
                const routes = monthRoutesByDate[key] || [];
                const isToday =
                    date.toDateString() === new Date().toDateString();
                const weekday = weekdayShort[date.getDay()];
                // Day Cell
                return (
                    <div
                        key={idx}
                        className={`white-bg p-3 rounded-lg shadow-sm min-h-[110px] flex flex-col ${
                            isToday ? "ring-2 ring-blue-500" : ""
                        }`}
                    >
                        <div className="flex flex-col items-center justify-between h-full w-full">
                            {/* Weekday + Day Number Row */}
                            <span className="text-[10px] md:text-xs gray-c-d w-full flex items-center justify-between">
                                <span className="uppercase tracking-wide">
                                    {weekday}
                                </span>
                                {/* View Routes Button */}
                                {routes.length > 0 && (
                                    <button
                                        className="text-xs blue-c hover-blue-c  flex items-center gap-1 cursor-pointer tooltip-container"
                                        onClick={() => onOpenDay(key, routes)}
                                        title="View routes for this day"
                                    >
                                        <i className="fa-regular fa-eye text-lg" />
                                        <Tooltip
                                            content="View routes for this day"
                                            direction="top"
                                        />
                                    </button>
                                )}
                            </span>

                            {/* Day Number centered */}
                            <span className="text-xs md:text-sm gray-c-d w-full mt-1">
                                {date.getDate()}
                            </span>

                            {/* Routes Count */}
                            {routes.length > 0 && (
                                <span className="text-xs blue-c text-center">
                                    {routes.length} assigned routes
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DayGrid;
