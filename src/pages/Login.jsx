import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

<Link to="/register">
  Sign Up
</Link>
export default function Login() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-gray-200 p-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome Back
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Please log in to continue
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Placeholder"
            className="w-full bg-gray-100 rounded px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              placeholder="Placeholder"
              className="w-full bg-gray-100 rounded px-4 py-3 outline-none"
            />

            <Eye
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">
          It must be a combination of minimum 8 letters,
          numbers and symbols.
        </p>

        <div className="flex justify-between items-center text-sm">
          <label className="flex gap-2 items-center">
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#" className="text-indigo-600">
            Forgot Password?
          </a>
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded font-medium">
          Log In
        </button>

        <p className="text-center text-sm mt-4">
          No account yet?{" "}
          <a href="#" className="text-indigo-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}