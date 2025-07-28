import { useState } from "react"; 
import { login, signUp } from "../services/authServices";
import { LoginCredentials, SignUpCredentials } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/slices/userSlice";
import { login as loginAction} from "../redux/slices/authSlice" 
import { toast } from 'sonner';

  export const useLogin = () => {

    const [form, setForm] = useState<LoginCredentials>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); 
      try { 
       const data = await login(form); 
       dispatch(setUserDetails(data));
       dispatch(loginAction()); 
       toast.success("Login Successfully!")
      } catch (err: any) {
        setError(err?.response?.data?.error); 
        toast.error("Login Failed!")
      }
    };
  
    return { form, handleChange, handleSubmit, error };
  };
 

export const useSignup = () => {
  const [form, setForm] = useState<SignUpCredentials>({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(form);
      navigate("/login", { replace: true });
      toast.success("Registered successfully! ")
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      toast.error("User registration failed!")
    }
  };

  return { form, handleChange, handleSubmit, error };
};