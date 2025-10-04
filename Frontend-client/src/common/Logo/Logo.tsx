import { NavLink, useNavigate } from "react-router-dom";
import "./Logo.scss";
import type { LogoProps } from "../Types/Interfaces";

// Logo component for brand logo and name display
const Logo = ({ disabled = false, compressSidebar }: LogoProps) => {
    const navigate = useNavigate();
    
    return (
        <div className="logo-wraper flex gap-3 items-center group cursor-pointer" onClick={() => navigate("/")}>
            {/* Logo icon as a Link */}
            <div className="logo group w-fit">
                <NavLink
                    to="/"
                    title={disabled ? "Go to the home page" : "Logo"}
                    className={`green-bg-l transition duration-[300ms] text-white py-[8px] px-[7px] text-[18px] font-semibold rounded-[5px] min-h-[50px] flex items-center justify-center ${
                        !disabled && "group-hover:bg-slate-700"
                    }`}
                    onClick={(e) => disabled && e.preventDefault()} // Disable click if disabled
                >
                    DRB
                </NavLink>
            </div>

            {/* Show name and title if sidebar is expanded */}
            {!compressSidebar && (
                <div>
                    <h4 className="text-lg black-c font-semibold mb-0 ">
                        DRB <span className="green-c">Route</span>
                    </h4>
                    <p className="text-sm gray-c font-normal mb-0 ">Driver-Route Scheduler</p>
                </div>
            )}
        </div>
    );
};

export default Logo;
