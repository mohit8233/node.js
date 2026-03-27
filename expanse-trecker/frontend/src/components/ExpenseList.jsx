import React from "react";
import BASE_URL from "../api";

const ExpenseList = ({ expenses, fetchExpenses }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">All Expenses</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {expenses.length} items
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center text-slate-500">
          No expenses found
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {item.title} x {item.quantity}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                    Price: ₹ {item.price}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <h4 className="text-lg font-bold text-slate-800">
                  ₹ {item.total}
                </h4>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;