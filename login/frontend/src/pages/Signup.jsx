import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Signup() {


    const [check, setCheck] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        conpassword: ""
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
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Signup Successfully!");
      setForm({
        name: "",
        email: "",
        password: ""
      });
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};




    return (
        <div className="h-screen flex items-center  justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-4">


            <button className="absolute top-5 left-5">
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-md hover:bg-white/30 transition"
                >
                    ← Back
                </Link>
            </button>


            {/* Card */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-6">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    Sign Up
                </h1>
                <p className="text-center text-gray-500 mt-2 mb-6">
                    Sign up or for free
                </p>

                {/* Form */}
                <form className="space-y-2" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div>
                        <input
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter your Name"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    {/* Password */}
                    <div>
                        <input
                            name='conpassword'
                            value={form.conpassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* I Agree */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" onChange={(e)=>setCheck(e.target.checked)} />
                            i agree to the <span className='text-blue-500 cursor-pointer'>Terms & Conditions</span>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <button disabled={!check} type='submit' className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 ${check ? "cursor-pointer" : "cursor-not-allowed"}`}>
                        Sign Up
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

                    {/* Login */}
                    <p className="text-center text-sm mt-4">
                        Already have an account {" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">
                            <Link to={"/Login"}> Login</Link>
                        </span>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup