import type { RouteActivityProps } from "../../common/Types/Interfaces";
import { extractDate } from "../../utils/functions/formatDate";
import { formatTime } from "../../utils/functions/formatTime";


const RouteActivity = ({ items = [] }: RouteActivityProps) => {
    return (
        <section className="route-activity white-bg rounded-lg shadow-md p-5 w-full">
            <h3 className="text-lg font-semibold mb-3">Activity</h3>
            {items.length === 0 ? (
                <p className="text-sm text-gray-600">No activity yet.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((a) => (
                        <li
                            key={a.id}
                            className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                        >
                            <div className="text-xs text-gray-500 flex items-center gap-3">
                                <span className="day flex items-center gap-1">
                                    <i className="fa-solid fa-calendar time-icon-color"></i>
                                    {extractDate(a.time)} 
                                </span>
                                <span className="time flex items-center gap-1">
                                    <i className="fa-solid fa-clock time-icon-color"></i>
                                    {formatTime(a.time)}
                                </span>
                            </div>
                            <div className="text-sm font-medium mt-2">
                                {a.description}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default RouteActivity;
