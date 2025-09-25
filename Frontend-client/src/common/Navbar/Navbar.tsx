import { useCallback } from "react";
import Logo from "../Logo/Logo";
import {
    useAppDispatch,
    useAppSelector,
} from "../../utils/redux-toolkit/reduxHooks";
import { setActiveBar as setActiveBarAction } from "../../utils/redux-toolkit/sidebarSlice";
import "./Navbar.scss";
// import ChangeModeIcon from "../Controlling_Icons/ChangeModeIcon.jsx";

const Navbar = () => {
    const activeBar = useAppSelector((state) => state.sidebar.activeBar);
    const dispatch = useAppDispatch();
    const setActiveBar = useCallback(
        (active: boolean) => {
            dispatch(setActiveBarAction(active));
        },
        [dispatch]
    );

    // Toggle sidebar state
    const toggleSidebar = () => {
        setActiveBar(!activeBar);
    };

    // Icon class based on activeBar state
    const menuIconClass = `fa-solid fa-bars bx-menu-burger-icon text-4xl cursor-pointer trans-3 ${
        activeBar ? "green-c" : "black-c"
    }`;

    return (
        <nav className="navbar nav-bg fixed top-0 w-screen lg:hidden">
            <div className="container flex justify-between items-center py-3 px-6">
                <Logo disabled={true} />

                {/* Right Side */}
                <div className="right flex items-center gap-4 md:gap-9">
                    {/* Color Mode */}
                    {/* <ChangeModeIcon /> */}

                    {/* Sidebar Toggle Icon */}
                    <i onClick={toggleSidebar} className={menuIconClass}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
