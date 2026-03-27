import React, { useState } from "react";
import BASE_URL from "../api";

const ExpenseForm = ({ fetchExpenses }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: 1,
    category: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.quantity || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add expense");
        return;
      }

      setForm({
        title: "",
        price: "",
        quantity: 1,
        category: "",
        date: "",
      });

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const total = Number(form.price || 0) * Number(form.quantity || 0);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-slate-800">Add New Expense</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:col-span-2"
        />

        <div className="sm:col-span-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
          Total: <span className="font-bold text-slate-900">₹ {total}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;