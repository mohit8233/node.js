import { useEffect } from "react"
import { useState } from "react"
import { createEmployee, updateEmployee } from "../api/api.js"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ({ refreshData, editEmployee, setEditEmployee }) => {
   const navigate = useNavigate()
  const [obj, setObj] = useState({
    name: "",
    email: "",
    age: "",
    department: "",
    salary: "",
  })

  useEffect(() => {
    if (editEmployee) {
      setObj({
        name: editEmployee.name || "",
        email: editEmployee.email || "",
        age: editEmployee.age || "",
        department: editEmployee.department || "",
        salary: editEmployee.salary || ""




      })
    }
  }, [editEmployee])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setObj({
      ...obj,

      [name]: name === "salary" || name === "age" ? value === "" ? "" : Number(value) : value,

    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();


    const token = localStorage.getItem("token");
        if(!token){
            alert("Login First");
            navigate("/login")
        }

    if (editEmployee) {
      updateEmployee(editEmployee._id, obj)
        .then((updateApi) => {
          if (updateApi.status) {
            alert(updateApi.data.message || updateApi.status)
          } else {
            alert(updateApi.message)
          }
           
          
          setObj({
            name: "",
            email: "",
            age: "",
            department: "",
            salary: "",
          })
          refreshData()
          setEditEmployee(null)
        })
        .catch((error) => {
          console.log(error);

          alert(error.response?.data?.message || "Update failed");
        });
    } else {
      createEmployee(obj)
        .then((createApi) => {
          if (createApi.status) {
            alert(createApi.data.message || createApi.status)
          } else {
            alert(createApi.message)
          }

          setObj({
            name: "",
            email: "",
            age: "",
            department: "",
            salary: "",
          })
          refreshData();

        }).catch((error) => {
          alert(error.response?.data?.message || "Create failed")
        });
    }


  }

  return (
    <div className="w-full px-4 pt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {editEmployee ? "|| Update Employee ||" : "|| Add Employee ||"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={obj.name}
            placeholder="Enter name"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={obj.email}
            placeholder="Enter email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={obj.age}
            placeholder="Enter age"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={obj.department}
            placeholder="Enter department"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={obj.salary}
            placeholder="Enter salary"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white py-3 rounded-lg font-medium transition ${editEmployee
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {editEmployee ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  )
}