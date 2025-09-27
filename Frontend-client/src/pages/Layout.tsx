import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import { useEffect, useRef, useState } from "react";
import PageLoader from "../components/Loader/PageLoader/PageLoader";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../utils/redux-toolkit/reduxHooks";
import Overlay from "../common/Overlay/Overlay";
import Navbar from "../common/Navbar/Navbar";
import { setIsXLargeScreen } from "../utils/redux-toolkit/windowStates";

const Layout = () => {
    const location = useLocation();
    const [showPageLoader, setShowPageLoader] = useState(true);
    const activeBar = useAppSelector((state) => state.sidebar.activeBar);
    const compressSidebar = useAppSelector((state) => state.sidebar.compressSidebar);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    // Hide Common Components if current route isn't one of the defined routes
    const definedRoutes = ["/", "/about", "/contact", "/drivers", "/routes", "/calendar", "/activity-feeds"];
    const showCommonComponents = definedRoutes.some((route) => {
        if (route === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(route);
    });


    // Track the width of the main container using ResizeObserver
    useEffect(() => {
        const element = mainContainerRef.current;
        if (!element) return;
        // Update the width of the main container
        const updateWidth = (width: number) => {
            const isXLargeScreen = width > 1400;
            dispatch(setIsXLargeScreen(isXLargeScreen));
        };
        // Initial measure
        updateWidth(element.getBoundingClientRect().width);
        // Observe the width of the main container
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                updateWidth(width);
            }
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [dispatch, compressSidebar]);


    // Show Page Loader for 2 seconds
    useEffect(() => {
        setTimeout(() => {
            setShowPageLoader(false);
        }, 2000);
    }, []);


    // Show Page Loader
    if (showPageLoader) {
        return <PageLoader />;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar + Overlay [if activeBar is true in small screens] */}
            {showCommonComponents && (
                <>
                    <Sidebar />
                    {activeBar && <Overlay />}
                </>
            )}

            {/* Navbar [in small screens] */}
            {showCommonComponents && <Navbar />}

            {/* Main Container */}
            <div
                ref={mainContainerRef}
                className={`main-content flex-1 overflow-y-auto overflow-x-hidden pt-[75px] lg:pt-0`}
            >
                {/* Outlet [the page content] */}
                <Outlet />
                {/* Pages Footer */}
                {showCommonComponents && <Footer />}
            </div>
        </div>
    );
};

export default Layout;
