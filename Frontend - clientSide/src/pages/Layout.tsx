import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import PageLoader from "../components/Footer_Components/Loader/PageLoader/PageLoader";

const Layout = () => {
    const location = useLocation();
    const [showPageLoader, setShowPageLoader] = useState(true);

    // Show Page Loader for 2 seconds
    useEffect(() => {
        setTimeout(() => {
            setShowPageLoader(false);
        }, 2000);
    }, []);

    // Hide Footer if current route isn't one of the defined routes
    const definedRoutes = ["/", "/about", "/doctors", "/appointments"];
    const showFooter = definedRoutes.includes(location.pathname);

    
    if (showPageLoader) {
        return <PageLoader />;
    }
    
    return (
        <>
            {/* {showNavbar && <Navbar />} */}
            <Outlet />
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
