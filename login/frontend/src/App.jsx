import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login';
// import Singup from './pages/Signup';
import Signup from './pages/Signup';

function App() {

  const location = useLocation()
  return (
    <>
      {location.pathname==="/" && <Login />}
      <Routes>

        <Route path='/Login' element={<Login/>}/>
       <Route path='/Signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
