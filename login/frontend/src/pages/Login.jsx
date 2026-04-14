import React, { useState } from 'react'
// import { PiSailboat } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom'

function Login() {


    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleChange = ((e) => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    });
    let users = JSON.parse(localStorage.getItem("users")) || []


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    let data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Login Successfully!");

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-4">
            <button className="absolute top-5 left-5">
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-md hover:bg-white/30 transition"
                >
                    ← Back
                </Link>
            </button>


            {/* Card */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    Login
                </h1>
                <p className="text-center text-gray-500 mt-2 mb-6">
                    Welcome back! Please login to your account
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email Address</label>
                        <input
                            name='email'
                            onChange={handleChange}
                            value={form.email}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            name='password'
                            onChange={handleChange}
                            value={form.password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember Me
                        </label>
                        <p className="text-blue-500 cursor-pointer hover:underline">
                            Forgot Password?
                        </p>
                    </div>

                    {/* Login Button */}
                    <button type='submit' className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                        <p className="text-gray-400 text-sm">OR</p>
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                    </div>

                    {/* Social Buttons */}
                    <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                        Login with Facebook
                    </button>

                    <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                        Login with Google
                    </button>

                    {/* Signup */}
                    <p className="text-center text-sm mt-4">
                        Don't have an account?{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">
                            <Link to={"/Signup"}>Sign Up</Link>
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login