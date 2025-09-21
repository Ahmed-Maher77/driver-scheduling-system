import type { StatsCardProps } from "../../../common/Types/Interfaces";

const StatsCard = ({ title, value, unit }: StatsCardProps) => {
    return (
        <div className="stats-card white-bg p-4 rounded-lg shadow-md">
            <h4 className="text-md gray-c mb-2">{title}</h4>

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
