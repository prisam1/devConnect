import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; 
import { protectedRoutes } from "./ProtectedRoutes";
import { unprotectedRoutes } from "./UnProtectedRoutes"; 
import ErrorBoundary from "../components/ErrorBoundry";
import { AuthSelector } from "../redux/slices/authSlice";

const AppRoutes: React.FC = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  const routes = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
      errorElement: <ErrorBoundary />,
    },
    ...unprotectedRoutes,
    ...protectedRoutes,
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
