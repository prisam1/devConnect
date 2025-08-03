import { useForm, Controller } from "react-hook-form";
import { useSignup } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

type SignupForm = {
  username: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const { handleSignup } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignupForm>({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await handleSignup(data);
      reset();
    } catch (err) {
      // toast already shown
    }
  };

  return (
    <div className="flex min-h-full h-screen items-center justify-center bg-slate-300">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full p-6 bg-white shadow rounded">
        <h1 className="text-xl font-bold mb-6">Sign Up</h1>

        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required", minLength: { value: 3, message: "Min 3 characters" } }}
          render={({ field }) => (
            <>
              <input {...field} placeholder="Username" className="w-full mb-1 p-2 border rounded" />
              {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <>
              <input {...field} type="email" placeholder="Email" className="w-full mb-1 p-2 border rounded" />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
            </>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required", minLength: { value: 5, message: "Min 5 characters" } }}
          render={({ field }) => (
            <>
              <input {...field} type="password" placeholder="Password" className="w-full mb-1 p-2 border rounded" />
              {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
            </>
          )}
        />

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded mt-2">
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <div className="flex flex-row justify-between items-center mt-6 text-sm text-[#A0AEC0]">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
          <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
