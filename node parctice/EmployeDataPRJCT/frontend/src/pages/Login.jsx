import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../api/api";


const Login = () => {
  const [users, setUsers] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsers({
      ...users,
      [name]: value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    loginUser(users)
    .then((loginApi)=>{
       console.log(loginApi.data);
      if(loginApi.data.status){
        alert(loginApi.data.message|| loginApi.status)
           

        localStorage.setItem("token", loginApi.data.data.token);
         

        setUsers({
          email:"",
          password:""
        })

        navigate("/")
      }else{
        alert(loginApi.message)
      }
    }).catch((error)=>{
      alert(error.response?.data.message|| "Login failed")
      
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Employee Login
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Login your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={users.email}
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
              value={users.password}
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
            Login
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          Don’t have an  account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login