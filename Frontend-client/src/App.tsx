import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy } from "react";

// Import Toast Wrapper
import ToastWrapper from './common/ToastWrapper/ToastWrapper';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout";
import PageLoader from "./components/Loader/PageLoader/PageLoader";
import { Provider } from "react-redux";
import store from "./utils/redux-toolkit/store";
import ContactPage from "./pages/ContactPage/ContactPage";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import RouteDetailsPage from "./pages/RouteDetailsPage/RouteDetailsPage";
import DriverDetailsPage from "./pages/DriverDetailsPage/DriverDetailsPage";

// Import Lazy Pages
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const DriversPage = lazy(() => import("./pages/DriversPage/DriversPage"));
const RoutesPage = lazy(() => import("./pages/RoutesPage/RoutesPage"));



function App() {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                // Dashboard
                { index: true, element: <Dashboard /> },

                // About
                {
                    path: "/about",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <AboutPage />
                        </Suspense>
                    ),
                },

                // Contact
                {
                    path: "/contact",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <ContactPage />
                        </Suspense>
                    ),
                },

                // Drivers
                {
                    path: "/drivers",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <DriversPage />
                        </Suspense>
                    ),
                },

                // Driver Details
                {
                    path: "/drivers/:id",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <DriverDetailsPage />
                        </Suspense>
                    ),
                },

                // Routes
                {
                    path: "/routes",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <RoutesPage />
                        </Suspense>
                    ),
                },

                // Route Details
                {
                    path: "/routes/:id",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <RouteDetailsPage />
                        </Suspense>
                    ),
                },

                // Calendar
                {
                    path: "/calendar",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <CalendarPage />
                        </Suspense>
                    ),
                },

                // Admin Panel
                {
                    path: "/admin-panel",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <AdminPanelPage />
                        </Suspense>
                    ),
                },

                // {
                //     path: "/about",
                //     element: (
                //         <Suspense fallback={<PageLoader />}>
                //             <About />
                //         </Suspense>
                //     ),
                // },

                // Not Found
                { path: "*", element: <NotFound /> },
            ],
        },
    ]);
    
    return <Provider store={store}>  
        <RouterProvider router={router} />
        <ToastWrapper />
    </Provider>;
}

export default App;
