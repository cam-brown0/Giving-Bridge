import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
<div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
  <div>
  <h1 className="text-6xl font-black text-[#4FA658]">
    SMALL GIFTS.
  </h1>

  <h1 className="text-6xl font-black text-[#4FA658]">
    BIG IMPACT.
  </h1>

  <p className="mt-6 text-xl text-gray-700">
    Every donation creates change.
  </p>

  <img
    src="/donation-box.png"
    alt="Donation Box"
    className="mt-8"
  />
</div>
<div className=" min-h-screen bg-[#F7F4EE] flex items-center justify-center p-8">
      <div className=" max-w-md p-8 rounded-3xl bg-white shadow-2xl ">
        <h1 className="text-4xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Please log in to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
            />

            <Eye
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          It must be a combination of minimum 8 letters,
          numbers, and symbols.
        </p>

        {/* Remember me / Forgot password */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <a
            href="#"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
         <button
      onClick={() => navigate("/dashboard")}
      className="w-full bg-[#4FA658] text-white py-3 rounded-lg"
    >
      Log In
    </button>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm">
          No account yet?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}