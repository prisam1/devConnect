import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";

export default function LoginPage() {
  const { form, handleChange, handleSubmit, error } = useLogin();

  return (
    <div
      className="flex min-h-full h-[100vh] items-center justify-center bg-slate-300"
      >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">

        <h1 className="text-xl font-bold mb-6">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <div className="flex flex-row justify-between items-center">
          <p className="mt-[24px] text-left text-[12px] md:text-[14px] text-[#A0AEC0]">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="text-[#0040FF] text-[12px] md:text-[14px] hover:underline"
            >
              Sign up Here
            </Link>
          </p>
          <Link
            to="/forgot-password"
            className="mt-[24px] text-right text-[12px] md:text-[14px] text-[#A0AEC0] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}