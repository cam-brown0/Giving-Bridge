// pages/Register.jsx

import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md border border-gray-200 rounded-3xl p-8 bg-white shadow-sm">
        <h1 className="text-4xl font-bold text-center">
          Sign Up Free
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Track your donations
        </p>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            placeholder="First Name"
          />

          <FormInput
            label="Last Name"
            placeholder="Last Name"
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="Email Address"
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm">
          <input type="checkbox" />
          <span>Join our email list</span>
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
