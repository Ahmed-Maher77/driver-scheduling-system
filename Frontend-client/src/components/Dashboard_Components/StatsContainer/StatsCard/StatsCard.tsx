import type { StatsCardProps } from "../../../../common/Types/Interfaces";

const StatsCard = ({ title, value, unit, iconClass }: StatsCardProps) => {
    return (
        <div className="stats-card white-bg p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
            <h4 className="text-md gray-c mb-5 flex items-center gap-2">
                {/* users icon */}
                <i className={`${iconClass} text-sm gray-c-d`}></i>
                <span className="text-sm gray-c font-medium">{title}</span>
            </h4>

            <div className="stats-value flex items-end gap-2">
                <span className="text-3xl font-medium">
                    {value.toLocaleString()}
                </span>
                {unit && (
                    <span className="text-lg gray-c font-semibold">{unit}</span>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
