import { useEffect, useState } from "react"
import { deleteEmployee, getEmployee } from "../api/api";

export const EmployeeList = ({ refresh, setEditEmployee, refreshData }) => {

    const [employee, setEmployee] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const [params, setParams] = useState({
        search: "",
        sortBy: "",
        order: "asc",
        page: 1,
        limit: 5
    })

    const fetchEmployee = async () => {
        try {
            const res = await getEmployee(params);
            setEmployee(res.data || res.employees || res || []);
            setTotalPage(res.pagination?.totalPage || 1);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchEmployee()
    }, [params, refresh])

    const handleDelete = (id) => {
        deleteEmployee(id)
            .then((deleteApi) => {
                if (deleteApi.status) {
                    alert(deleteApi.data.message || deleteApi.status)
                } else {
                    alert(deleteApi.message)
                }
                refreshData()
            })
            .catch((error) => {
                alert(error.response?.data?.message || "Update failed");

            })

    }

    return (
        <div className="w-full px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    || Employee List ||
                </h1>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
                    <input
                        type="text"
                        placeholder="Enter Either name or department"
                        onChange={(e) => {
                            // tumhari original style:
                            // direct search params update
                            setParams({ ...params, search: e.target.value, page: 1 });
                        }}
                        className="w-full md:w-72 border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <select
                        onChange={(e) => {
                            setParams({ ...params, sortBy: e.target.value });
                        }}
                        className="w-full md:w-52 border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Data SortBy</option>
                        <option value="name">SortBy Name</option>
                        <option value="salary">SortBy Salary</option>
                        <option value="age">SortBy Age</option>
                    </select>

                    <select
                        onChange={(e) => {

                            setParams({ ...params, order: e.target.value });
                        }}
                        className="w-full md:w-40 border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Order</option>
                        <option value="asc">Asc</option>
                        <option value="desc">DESC</option>
                    </select>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    {employee.map((emp) => (
                        <div
                            className="w-full sm:w-[320px] bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
                            key={emp._id}
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                Name: {emp.name}
                            </h2>

                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold text-gray-800">Email:</span>{" "}
                                {emp.email}
                            </p>

                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold text-gray-800">Age:</span>{" "}
                                {emp.age}
                            </p>

                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold text-gray-800">Department:</span>{" "}
                                {emp.department}
                            </p>

                            <p className="text-gray-600 mb-4">
                                <span className="font-semibold text-gray-800">Salary:</span>{" "}
                                {emp.salary}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditEmployee(emp)}
                                    className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(emp._id)}
                                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* pagination ke liye ready */}
                <div className="flex justify-center mt-8">
                    <p className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md">
                        Total Pages: {totalPage}
                    </p>
                </div>
            </div>
        </div>
    )
}