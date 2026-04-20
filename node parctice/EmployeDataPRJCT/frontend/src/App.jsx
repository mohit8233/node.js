import { useState } from "react";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeList } from "./components/EmployeeList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const refreshData = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      
      {/* flex container */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT: Form */}
        <div className="w-full md:w-1/3">
          <EmployeeForm
            refreshData={refreshData}
            editEmployee={editEmployee}
            setEditEmployee={setEditEmployee}
          />
        </div>

        {/* RIGHT: List */}
        <div className="w-full md:w-2/3">
          <EmployeeList
            refresh={refresh}
            setEditEmployee={setEditEmployee}
            refreshData={refreshData}
          />
        </div>

      </div>
    </div>
  );
}

export default App;