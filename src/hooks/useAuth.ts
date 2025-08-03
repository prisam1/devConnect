import { login, signUp } from "../services/authServices";
import { LoginCredentials, SignUpCredentials } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/slices/userSlice";
import { login as loginAction } from "../redux/slices/authSlice";
import { toast } from "sonner";

export const useLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = async (form: LoginCredentials) => {
    try {
      const data = await login(form);
      dispatch(setUserDetails(data.data));
      dispatch(loginAction());
      toast.success("Login successful!");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Login failed";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return { handleLogin };
};

export const useSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (form: SignUpCredentials) => {
    try {
      await signUp(form);
      toast.success("Registered successfully!");
      navigate("/login", { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Signup failed";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return { handleSignup };
};
