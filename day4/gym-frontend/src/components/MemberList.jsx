import React from "react";
import BASE_URL from "../api";

const MemberList = ({ members, fetchMembers, setEditMember, loading }) => {
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.status) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("Member deleted successfully");
      fetchMembers();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">All Members</h2>
          <p className="mt-1 text-sm text-slate-500">
            Total members: {members.length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Loading members...
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No members found
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div
              key={member._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Member ID: {member._id.slice(-6)}
                  </p>
                </div>

                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {member.membership}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Age:</span>{" "}
                  {member.age}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Fees:</span> ₹
                  {member.fees}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Created:</span>{" "}
                  {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setEditMember(member)}
                  className="flex-1 rounded-2xl bg-amber-500 px-4 py-2.5 font-semibold text-white transition hover:bg-amber-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  className="flex-1 rounded-2xl bg-red-500 px-4 py-2.5 font-semibold text-white transition hover:bg-red-600"
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

export default MemberList;