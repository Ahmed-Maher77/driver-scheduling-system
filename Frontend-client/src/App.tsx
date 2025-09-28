import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy } from "react";

// Import Toast Wrapper
import ToastWrapper from "./common/ToastWrapper/ToastWrapper";
import "react-toastify/dist/ReactToastify.css";

// Import Pages
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout";
import PageLoader from "./components/Loader/PageLoader/PageLoader";
import { Provider } from "react-redux";
import store from "./utils/redux-toolkit/store";

// Import Lazy Pages
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const DriversPage = lazy(() => import("./pages/DriversPage/DriversPage"));
const RoutesPage = lazy(() => import("./pages/RoutesPage/RoutesPage"));
const DriverDetailsPage = lazy(() => import("./pages/DriverDetailsPage/DriverDetailsPage"));
const RouteDetailsPage = lazy(() => import("./pages/RouteDetailsPage/RouteDetailsPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage/CalendarPage"));
const AdminPanelPage = lazy(() => import("./pages/AdminPanelPage/AdminPanelPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const ActivityFeedsPage = lazy(() => import("./pages/ActivityFeedsPage/ActivityFeedsPage"));

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

                // Activity Feeds
                {
                    path: "/activity-feeds",
                    element: (
                        <Suspense fallback={<PageLoader />}>
                            <ActivityFeedsPage />
                        </Suspense>
                    ),
                },

                // Not Found
                { path: "*", element: <NotFound /> },
            ],
        },
    ]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
            <ToastWrapper />
        </Provider>
    );
}

export default App;
