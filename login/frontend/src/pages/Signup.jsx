import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [check, setCheck] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.password || !form.conpassword) {
      alert("Please fill all fields")
      return
    }

    if (form.password !== form.conpassword) {
      alert("Password and Confirm Password do not match")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        alert("Signup Successfully!")
        setForm({
          name: "",
          email: "",
          password: "",
          conpassword: ""
        })
        navigate("/login")
      } else {
        alert(data.msg || data.message || data.error || "Signup failed")
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong")
    }
  }

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

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Sign up for free
        </p>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your Name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              name="conpassword"
              value={form.conpassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
              />
              I agree to the <span className="text-blue-500 cursor-pointer">Terms & Conditions</span>
            </label>
          </div>

          <button
            disabled={!check}
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 ${
              check ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup