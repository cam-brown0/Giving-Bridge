import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      saveToken(data.access_token, remember);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
      <div>
        <h1 className="text-6xl font-black text-[#4FA658]">SMALL GIFTS.</h1>
        <h1 className="text-6xl font-black text-[#4FA658]">BIG IMPACT.</h1>
        <p className="mt-6 text-xl text-gray-700">
          Every donation creates change.
        </p>
        <img src="/donation-box.png" alt="Donation Box" className="mt-8" />
      </div>

      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full p-8 rounded-3xl bg-white shadow-2xl"
        >
          <h1 className="text-4xl font-bold text-center">Welcome Back</h1>
          <p className="text-center text-gray-500 mt-2 mb-8">
            Please log in to continue
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          {error && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4FA658] text-white py-3 rounded-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center mt-6 text-sm">
            No account yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}