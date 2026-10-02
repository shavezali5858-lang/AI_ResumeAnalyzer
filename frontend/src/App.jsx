import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Verifyemail from './pages/Verifyemail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPass from './pages/Resetpass'
const App = () => {
  return (
    <div>
  
    
<Routes>

    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>

    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/verify" element={<Verifyemail/>}/>
    <Route path="/Forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<ResetPass/>}/>



</Routes>



    </div>
  )
}

export default App
