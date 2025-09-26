import { NavLink } from "react-router-dom";
import { formatTime } from "../../../utils/functions/formatTime";
import { extractDate } from "../../../utils/functions/formatDate";
import type { ActivityFeedItemProps } from "../../../common/Types/Interfaces";
import { useAppSelector } from "../../../utils/redux-toolkit/reduxHooks";


const ActivityFeedItem = ({ routeId, status, driver, lastDriver, actionTime }: ActivityFeedItemProps) => {
    const isXLargeScreen = useAppSelector((state) => state.windowStates.isXLargeScreen);

    return (
        <li className="flex justify-between">
            {/* ================= Activity Body ================= */}
            <div className="activity-body flex gap-1">
                {/* Activity Icon */}
                <span className="green-bg w-[55px] h-[55px] flex items-center justify-center rounded-full border-timeline-icon flex-shrink-0">
                    <i className="fa-solid fa-location-arrow fixed-white-c text-base"></i>
                </span>

                {/* Activity Details */}
                <p className={`${isXLargeScreen ? "mt-2" : "mt-4"} gray-c-d`}>
                    Route {routeId}{" "}
                    <span className={`${status === "assigned" ? "green-c-d" : "red-c"} font-medium`}>{status}</span> {""}
                    {status === "assigned" ? "to" : "from"} {""}
                    <NavLink
                        to={`/drivers/${driver?.id || lastDriver?.id}`}
                        className="blue-c hover-blue-c font-medium underline-hover"
                    >
                        {driver?.name || lastDriver?.name || driver?.id || lastDriver?.id}
                        <i className="fa-solid fa-arrow-right rotate-[-40deg] mt-[0.1rem]"></i>
                    </NavLink>
                </p>
            </div>

            {/* ================= Action Time ================= */}
            <span className="activity-time gray-c flex flex-col gap-[0.1rem] items-end flex-shrink-0">
                {/* Day */}
                <span className="day flex items-center gap-1">
                    {extractDate(actionTime as string)}
                    <i className="fa-solid fa-calendar time-icon-color"></i>
                </span>
                {/* Time */}
                <span className="time flex items-center gap-1">
                    {formatTime(actionTime as string)}
                    <i className="fa-solid fa-clock time-icon-color"></i>
                </span>
            </span>
        </li>
    );
};

export default ActivityFeedItem;
