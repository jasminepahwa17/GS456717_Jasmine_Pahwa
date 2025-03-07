import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout"
import ErrorPage from "./pages/ErrorPage";
import Store from "./pages/Store";
import SKU from "./pages/SKU"
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
import Login from "./pages/Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to="/planning" replace /> },
            { path: "store", element: <Store /> },
            { path: "sku", element: <SKU /> },
            { path: "planning", element: <Planning /> },
            { path: "charts", element: <Charts /> }
        ]
    },
    { path: "login", element: <Login /> }
]);

export default routes