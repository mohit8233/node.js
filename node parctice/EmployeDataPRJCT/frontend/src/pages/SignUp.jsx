

import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = () => {
    const [obj, setObj] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setObj({
            ...obj,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser(obj)
            .then((registerApi) => {
                if (registerApi.status) {
                    alert(registerApi.data.message || registerApi.status);
                  

                    setObj({
                        name: "",
                        email: "",
                        password: ""
                    });

                    navigate("/login");
                } else {
                    alert(registerApi.message);
                }
            })
            .catch((error) => {
                alert(
                    error.response?.data?.message ||
                    "Register failed"
                );
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
                <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
                    Employee Register
                </h1>

                <p className="text-center text-slate-500 mb-6">
                    Create your account to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={obj.name}
                            placeholder="Enter your name"
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={obj.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={obj.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-[1.02] hover:shadow-xl transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-slate-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};