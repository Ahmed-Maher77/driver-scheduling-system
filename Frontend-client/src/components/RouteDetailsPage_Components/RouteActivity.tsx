import type { RouteActivityProps } from "../../common/Types/Interfaces";
import { extractDate } from "../../utils/functions/formatDate";
import { formatTime } from "../../utils/functions/formatTime";


const RouteActivity = ({ items = [] }: RouteActivityProps) => {
    return (
        <section className="route-activity w-full mb-5">
            <h3 className="text-xl font-bold mb-5 text-gray-800 pl-1">Activity</h3>
            {items.length === 0 ? (
                <p className="text-[15px] text-gray-600 pl-1">No activity yet.</p>
            ) : (
                <ul className="flex flex-col gap-5 relative pl-1">
                    {items.map((a, index) => {
                        // Choose colors and icons based on keywords in description
                        let iconClass = "fa-clock";
                        let bgClass = "gray-bg-l";
                        let iconColor = "text-gray-500";
                        
                        const desc = a.description.toLowerCase();
                        if (desc.includes("created")) {
                            iconClass = "fa-plus";
                            bgClass = "bg-blue-100";
                            iconColor = "text-blue-500";
                        } else if (desc.includes("assigned")) {
                            iconClass = "fa-user-check";
                            bgClass = "bg-amber-100";
                            iconColor = "text-amber-500";
                        } else if (desc.includes("updated")) {
                            iconClass = "fa-pen";
                            bgClass = "bg-purple-100";
                            iconColor = "text-purple-500";
                        } else if (desc.includes("completed")) {
                            iconClass = "fa-check-double";
                            bgClass = "bg-emerald-100";
                            iconColor = "text-emerald-500";
                        }

                        return (
                            <li key={a.id} className="flex gap-4 items-start relative z-[2]">
                                {/* Vertical Line to next item */}
                                {index !== items.length - 1 && (
                                    <div className="absolute left-[15px] top-[32px] w-[2px] h-[calc(100%-12px)] bg-gray-200 z-[-1]" />
                                )}
                                
                                <span className={`${bgClass} w-8 h-8 flex items-center justify-center rounded-full border-[3px] border-white flex-shrink-0 mt-0.5`}>
                                    <i className={`fa-solid ${iconClass} ${iconColor} text-[0.85rem]`}></i>
                                </span>
                                <div className="flex-grow">
                                    <div className="p-2">
                                        <div className="text-xs text-gray-500 flex items-center gap-3">
                                            <span className="day flex items-center gap-1.5 font-medium">
                                                <i className="fa-solid fa-calendar text-gray-400"></i>
                                                {extractDate(a.time)} 
                                            </span>
                                            <span className="time flex items-center gap-1.5 font-medium">
                                                <i className="fa-solid fa-clock text-gray-400"></i>
                                                {formatTime(a.time)}
                                            </span>
                                        </div>
                                        <div className="text-[14px] font-semibold mt-1 text-gray-800">
                                            {a.description}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default RouteActivity;
