import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { api } from "../api";
import { saveToken } from "../auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/auth/register", {
        method: "POST",
        body: { ...form, role: "donor" },
      });
      const data = await api("/auth/login", {
        method: "POST",
        body: { email: form.email, password: form.password },
      });
      saveToken(data.access_token, false);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 rounded-3xl p-8 bg-white shadow-sm"
      >
        <h1 className="text-4xl font-bold text-center">Sign Up Free</h1>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Track your donations
        </p>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={update}
            autoComplete="given-name"
            required
          />
          <FormInput
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={update}
            autoComplete="family-name"
            required
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={update}
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={update}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="text-xs text-gray-500 mt-1">At least 8 characters.</p>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}