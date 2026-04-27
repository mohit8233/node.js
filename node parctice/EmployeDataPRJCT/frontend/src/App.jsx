import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import EmployeePage from "./pages/EmployeePage";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";



function App() {
  return (
   <>
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile"  element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;