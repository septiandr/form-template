import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { formsRoute } from "./formRoutes";
import { dashboardRoute } from "./dashboardRoute";
import ErrorPage from "./errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      dashboardRoute, 
      formsRoute,
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
