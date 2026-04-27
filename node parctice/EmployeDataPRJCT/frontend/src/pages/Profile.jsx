import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
            👤
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          User Profile
        </h1>

        <p className="text-center text-slate-500 mb-6">
          You are currently logged in
        </p>

        <div className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-500">Login Status</p>
            <h2 className="text-lg font-semibold text-green-600">
              Active
            </h2>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-500">Authentication</p>
            <h2 className="text-lg font-semibold text-blue-600">
              Token Available
            </h2>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};