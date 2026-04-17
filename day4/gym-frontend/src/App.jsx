import React, { useEffect, useState } from "react";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import BASE_URL from "./api";

const App = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/all`);
      const data = await res.json();

      if (data.status) {
        setMembers(data.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.log(error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl sm:p-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Gym Management</h1>
          <p className="mt-2 text-sm text-slate-200 sm:text-base">
            Add, update, and manage gym members easily
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <MemberForm
            fetchMembers={fetchMembers}
            editMember={editMember}
            setEditMember={setEditMember}
          />

          <MemberList
            members={members}
            fetchMembers={fetchMembers}
            setEditMember={setEditMember}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;