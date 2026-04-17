import React, { useEffect, useState } from "react";
import BASE_URL from "../api";

const MemberForm = ({ fetchMembers, editMember, setEditMember }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    membership: "",
    fees: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editMember) {
      setForm({
        name: editMember.name || "",
        age: editMember.age || "",
        membership: editMember.membership || "",
        fees: editMember.fees || "",
      });
    } else {
      setForm({
        name: "",
        age: "",
        membership: "",
        fees: "",
      });
    }
  }, [editMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      age: "",
      membership: "",
      fees: "",
    });
    setEditMember(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.membership || !form.fees) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);

      let url = `${BASE_URL}/add`;
      let method = "POST";

      if (editMember) {
        url = `${BASE_URL}/update?id=${editMember._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          age: Number(form.age),
          membership: form.membership,
          fees: Number(form.fees),
        }),
      });

      const data = await res.json();

      if (!data.status) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(editMember ? "Member updated successfully" : "Member added successfully");
      resetForm();
      fetchMembers();
    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-fit rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {editMember ? "Update Member" : "Add Member"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Fill member details below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter member name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Membership
          </label>
          <select
            name="membership"
            value={form.membership}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          >
            <option value="">Select membership</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Fees
          </label>
          <input
            type="number"
            name="fees"
            placeholder="Enter fees"
            value={form.fees}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {submitting
              ? editMember
                ? "Updating..."
                : "Adding..."
              : editMember
              ? "Update Member"
              : "Add Member"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-2xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;