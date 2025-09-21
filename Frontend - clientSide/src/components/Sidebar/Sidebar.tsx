import { useCallback, useEffect, useRef } from "react";
import "./Sidebar.scss";
// import { DarkModeContext } from "../../contexts/DarkModeContext.jsx";
// import { SidebarContext } from "../../contexts/SidebarContext.jsx";
import SidebarLink from "./SidebarLink";
import {
    useAppDispatch,
    useAppSelector,
} from "../../utils/redux-toolkit/reduxHooks";
import {
    setActiveBar as setActiveBarAction,
    setCompressSidebar as setCompressSidebarAction,
} from "../../utils/redux-toolkit/sidebarSlice";
import Logo from "../../common/Logo/Logo";

const Sidebar = () => {
    const activeBar = useAppSelector((state) => state.sidebar.activeBar);
    const compressSidebar = useAppSelector(
        (state) => state.sidebar.compressSidebar
    );
    const dispatch = useAppDispatch();
    const sidebarRef = useRef<HTMLUListElement | null>(null);
    // const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

    // dispatch helpers to avoid name shadowing
    const setActiveBar = useCallback(
        (active: boolean) => {
            dispatch(setActiveBarAction(active));
        },
        [dispatch]
    );
    const setCompressSidebar = useCallback(
        (compressed: boolean) => {
            dispatch(setCompressSidebarAction(compressed));
        },
        [dispatch]
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const triggerBtn = document.querySelector(".bx-menu-burger-icon");
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node) &&
                e.target !== triggerBtn
            ) {
                setActiveBar(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [setActiveBar, setCompressSidebar]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setActiveBar(false);
            } else {
                setCompressSidebar(false);
            }
        };
        const debouncedResize = debounce(handleResize, 200); // Debounce resize handler
        window.addEventListener("resize", debouncedResize);
        return () => window.removeEventListener("resize", debouncedResize);
    }, [setActiveBar]);

    const handleSidebar = () => {
        if (window.innerWidth < 1024) {
            setActiveBar(false);
        } else {
            setCompressSidebar(!compressSidebar);
        }
    };

    return (
        <ul
            ref={sidebarRef}
            className={`sidebar font-medium fixed lg:relative lg:left-0 top-0 left-0 nav-bg h-full text-[1rem] flex ${
                !activeBar && "left-[-350px]"
            } trans-3 ${
                compressSidebar
                    ? "w-[85px] min-w-[85px] max-w-[85px] lg:w-[85px] lg:min-w-[85px] lg:max-w-[85px]"
                    : "w-[255px] lg:max-w-[255px] lg:min-w-[255px]"
            }`}
        >
            <div className="wrapper h-full w-full p-[12px] flex flex-col justify-between overflow-y-auto overflow-x-hidden">
                <div className="w-full  flex flex-col gap-2  nav-bg">
                    {/* =============== Header =============== */}
                    <li className="mb-12 flex justify-between">
                        <Logo compressSidebar={compressSidebar} />
                        <div
                            className="arrow-trigger absolute right-[-12.5px] top-[1.5rem] w-[25px] h-[25px] green-bg flex items-center justify-center rounded-full"
                            onClick={handleSidebar}
                        >
                            <i
                                className={`fa-solid fa-chevron-left text-xs trans-3 cursor-pointer text-white ${
                                    compressSidebar && "rotate-180"
                                }`}
                            ></i>
                        </div>
                    </li>

                    {/* =============== Body =============== */}
                    <SidebarLink
                        to="/"
                        title="go to the dashboard page"
                        iconClass="fa-solid fa-house"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Dashboard"
                    />
                    <SidebarLink
                        to="/drivers"
                        title="go to the Drivers page"
                        iconClass="fa-solid fa-users"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Drivers"
                    />
                    <SidebarLink
                        to="/routes"
                        title="go to the Routes page"
                        iconClass="fa-regular fa-map"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Routes"
                    />
                    <SidebarLink
                        to="/calendar"
                        title="go to the Calendar page"
                        iconClass="fa-regular fa-calendar-days"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Calendar"
                    />
                    <SidebarLink
                        to="/about"
                        title="go to the About page"
                        iconClass="fa-solid fa-code"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="About Us"
                    />
                    <SidebarLink
                        to="/contact"
                        title="go to the Contact page"
                        iconClass="fa-solid fa-message"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Contact Us"
                    />

                    {/* =============== Footer =============== */}
                </div>
                <footer
                    className={`dashboard mt-7 pt-2 border-t-2 border-gray-300 ${
                        compressSidebar && "compressed"
                    }`}
                >
                    <SidebarLink
                        to="/admin-panel"
                        title="go to the Admin Panel"
                        iconClass="fa-solid fa-lock-open"
                        compressSidebar={compressSidebar}
                        onClick={() => setActiveBar(false)}
                        label="Admin Panel"
                    />

                    {/* Dark Mode */}
                    {/* <li
						className={`main-bg ${
							compressSidebar ? "px-[5px]" : "px-[12px]"
						} py-[10px] flex items-center rounded-[8px] justify-between mt-1`}
					>
						{!compressSidebar && (
							<>
								{isDarkMode ? (
									<i className="bx bx-moon text-[1.3rem]"></i>
								) : (
									<i className="bx bx-sun text-[1.3rem]"></i>
								)}
								{isDarkMode ? "Dark" : "Light"} Mode
							</>
						)}
						<div
							onClick={() => setIsDarkMode((prev) => !prev)}
							className={`h-[22px] w-[44px] gray-bg-l rounded-xl p-1 cursor-pointer flex items-center ${
								isDarkMode && "justify-end"
							}`}
							role="button"
							aria-pressed={isDarkMode}
							aria-label="Toggle dark mode"
							tabIndex={0}
							onKeyDown={(e) =>
								e.key === "Enter" && setIsDarkMode((prev) => !prev)
							}
						>
							<div className="h-[15px] w-[15px] white-bg rounded-xl"></div>
						</div>
					</li> */}
                </footer>
            </div>
        </ul>
    );
};

// Helper function for debouncing
function debounce(func: (...args: unknown[]) => void, delay: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: unknown[]) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

export default Sidebar;
