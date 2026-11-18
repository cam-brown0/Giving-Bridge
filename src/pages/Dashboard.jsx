import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { getToken, clearToken } from "../auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    api("/users/me", { token })
      .then(setUser)
      .catch(() => {
        clearToken();
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  function logout() {
    clearToken();
    navigate("/login");
  }

  if (!user) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-[#4FA658]">
          Welcome, {user.first_name}!
        </h1>
        <p className="mt-4 text-gray-600">
          You are logged in as {user.email}.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Impact Summary</h2>
          <p className="text-xs text-gray-400">Sample data</p>
          <div className="mt-4 space-y-2">
            <p>💚 Donations Made: 12</p>
            <p>📦 Items Donated: 47</p>
            <p>🏠 Organizations Helped: 5</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3 justify-center">
          <button className="bg-[#4FA658] text-white px-6 py-3 rounded-xl">
            Make a Donation
          </button>
          <button
            onClick={logout}
            className="border border-gray-300 px-6 py-3 rounded-xl"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}