 
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"; 
import { AuthSelector } from "../redux/slices/authSlice";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

const AuthRedirectUnprotected: React.FC = () => {
  const auth = useSelector(AuthSelector);

  const isAuthenticated = auth.isAuthenticated ?? false;

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export const unprotectedRoutes = [
  {
    path: "/login",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/signUp",
    element: <AuthRedirectUnprotected />,
    children: [{ path: "", element: <Signup /> }],
  },
//   {
//     path: "/forgot-password",
//     element: <AuthRedirectUnprotected />,
//     children: [{ path: "", element: <ForgotPassword /> }],
//   },
 
];
