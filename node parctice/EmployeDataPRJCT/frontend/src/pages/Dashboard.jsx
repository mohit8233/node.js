import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 👉 login check
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 LEFT SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-5">

        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-left hover:bg-white hover:text-blue-600 px-3 py-2 rounded transition"
          >
            🏠 Home
          </button>

          <button
            onClick={() => navigate("/employee")}
            className="text-left hover:bg-white hover:text-blue-600 px-3 py-2 rounded transition"
          >
            👨‍💼 Employees
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="text-left hover:bg-white hover:text-blue-600 px-3 py-2 rounded transition"
          >
            👤 Profile
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-left hover:bg-red-500 px-3 py-2 rounded transition"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* 🔥 RIGHT CONTENT */}
      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Welcome to Dashboard 🚀
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Total Employees</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{employee}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">--</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Your Status</h2>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              Logged In
            </p>
          </div>

        </div>

      </main>
    </div>
  );
};