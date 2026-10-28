export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-[#4FA658]">
          Welcome to Betterwill
        </h1>

        <p className="mt-4 text-gray-600">
          You are successfully logged in.
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Your Impact Summary
          </h2>

          <div className="mt-4 space-y-2">
            <p>💚 Donations Made: 12</p>
            <p>📦 Items Donated: 47</p>
            <p>🏠 Organizations Helped: 5</p>
          </div>
        </div>

        <button className="mt-8 bg-[#4FA658] text-white px-6 py-3 rounded-xl">
          Make a Donation
        </button>
      </div>
    </div>
  );
}