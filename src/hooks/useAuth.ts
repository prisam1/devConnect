import { useState } from "react"; 
import { login, signUp } from "../services/authServices";
import { LoginCredentials, SignUpCredentials } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/slices/userSlice";
import { login as loginAction} from "../redux/slices/authSlice"

// export const useAuth = () => {
//     const [user, setUser] = useState<UserType | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
  
//     useEffect(() => {
//       (async () => {
//         setLoading(true);
//         setError(null);
//         try {
//           const data = await getUserData();
//           setUser(data);
//         } catch (err: any) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       })();
//     }, []);
  
//     return { user, loading, error };
//   };

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
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
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
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return { form, handleChange, handleSubmit, error };
};