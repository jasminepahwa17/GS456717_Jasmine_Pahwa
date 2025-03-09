import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout"
import ErrorPage from "./pages/ErrorPage";
import Store from "./pages/Store";
import SKU from "./pages/SKU"
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";
import Login from "./pages/Login";
import Protection from "./utils/Protection";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to="/store" replace /> },
            { path: "store", element: <Protection><Store /></Protection> },
            { path: "sku", element: <Protection><SKU /></Protection> },
            { path: "planning", element: <Protection><Planning /></Protection> },
            { path: "charts", element: <Protection><Charts /></Protection> }
        ]
    },
    { path: "login", element: <Login /> }
]);

export default routes