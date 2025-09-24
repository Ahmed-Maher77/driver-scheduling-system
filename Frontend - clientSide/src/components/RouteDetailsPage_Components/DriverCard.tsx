import { useNavigate } from "react-router-dom";
import type { DriverCardProps } from "../../common/Types/Interfaces";
import defaultDriverPicture from "../../assets/images/person.png";


const DriverCard = ({ driver, title }: DriverCardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="driver-card p-4 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-3"
            onClick={() => driver && navigate(`/drivers/${driver?.id}`)}
        >
            <img
                src={driver?.picture || defaultDriverPicture}
                alt={driver?.name || "Unknown"}
                className="w-12 h-12 object-cover img-border-full"
            />
            <div>
                <div className="text-xs text-gray-500">{title || "—"}</div>
                <div className="text-sm font-medium mt-1">{driver?.name || "—"}</div>
            </div>
        </div>
    );
};

export default DriverCard;
