import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthSelector } from "../redux/slices/authSlice";
import Layout from "../layouts";
import NewProject from "../pages/NewProject/NewProject";
import Profile from "../pages/Profile/Profile";
import ProjectDetail from "../pages/ProjectDetails/ProjectDetails";

const ProtectedRoutes: React.FC = () => {
  const auth = useSelector(AuthSelector);
  const isAuthenticated = auth.isAuthenticated ?? false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: "/project/new",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <NewProject /> }],
  },
  {
    path: "/profile",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <Profile /> }],
  },
  {
    path: "/projects/:id",
    element: <ProtectedRoutes />,
    children: [{ path: "", element: <ProjectDetail /> }],
  },

];
