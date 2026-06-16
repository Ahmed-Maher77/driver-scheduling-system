import { NavLink, useNavigate } from "react-router-dom";
import type { DriverCardProps } from "../../common/Types/Interfaces";
import defaultManImage from "../../assets/images/person.png";
import defaultWomanImage from "../../assets/images/woman.jpg";


const DriverCard = ({ driver, title }: DriverCardProps) => {
    const navigate = useNavigate();
    
    return (
        <div
            className="driver-card p-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:bg-white/50 transition-all flex items-center gap-4 cursor-pointer"
            onClick={() => driver && navigate(`/drivers/${driver?.id}`)}
        >
            <img
                src={driver?.picture || (driver?.gender === "Male" ? defaultManImage : defaultWomanImage)}
                alt={driver?.name || "Unknown"}
                className="w-12 h-12 object-cover img-border-full"
            />
            <div>
                <div className="text-xs text-gray-500">{title || "—"}</div>
                <NavLink to={`/drivers/${driver?.id}`} className="text-sm font-medium mt-1 blue-c hover-blue-c">{driver?.name || "—"}</NavLink>
            </div>
        </div>
    );
};

export default DriverCard;
