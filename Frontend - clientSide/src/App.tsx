import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Suspense } from "react";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout";

function App() {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                // Dashboard
                { index: true, element: <Dashboard /> },
                
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
    return <RouterProvider router={router} />;
}

export default App;
