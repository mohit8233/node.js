import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        🚀 EmployeeApp
      </h1>

      {/* Links */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/employee">Employee</Link>

        {/*  Login */}
        <Link to="/signup">Login</Link>
      </div>
    </header>
  );
};