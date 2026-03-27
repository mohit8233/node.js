import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseFrom";
import ExpenseList from "../components/ExpenseList";
import BASE_URL from "../api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch expenses");
        return;
      }

      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg md:col-span-2">
            <p className="text-sm uppercase tracking-wide text-blue-100">
              Total Expenses
            </p>
            <h2 className="mt-3 text-4xl font-bold">₹ {total}</h2>
            <p className="mt-2 text-sm text-blue-100">
              Keep track of all your spending in one place.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Records</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-800">
              {expenses.length}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Number of expenses added
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ExpenseForm fetchExpenses={fetchExpenses} />
          <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;