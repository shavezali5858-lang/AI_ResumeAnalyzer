import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

import { useLocation } from 'react-router-dom'



const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()




const handleLogin=async(e)=>{
  e.preventDefault();
  setError("")

  const API_URL = import.meta.env.VITE_API_URL;



  try{

    const res=await axios.post(`${API_URL}/api/auth/login`,{
      email,
      password
    },
  {
        withCredentials: true
      })
console.log(res.data)

setTimeout(()=>{


navigate("/dashboard")
},1000)


  }catch(error){
    setError(error.response?.data?.msg ||
      "LOGIN Failed!")
  }
}






  return (
  <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">

    {/* Main Page Button */}
    <button
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 sm:top-6 sm:left-6
                 lg:left-10 px-3 sm:px-4 py-2 rounded-lg
                 bg-slate-700 hover:bg-slate-600
                 text-sm sm:text-base text-slate-200 transition"
    >
      Main page
    </button>

    {/* Main Container */}
    <div className="flex flex-col lg:flex-row items-center justify-center
                    gap-10 lg:gap-20 w-full max-w-6xl px-2 sm:px-6 lg:px-10">

      {/* FORM */}
      <div className="w-full max-w-[420px] bg-[#111827]
                      border border-slate-800 rounded-2xl
                      p-6 sm:p-8 lg:p-10">

        <h1 className="font-bold text-2xl sm:text-3xl text-white">
          Welcome Back
        </h1>

        <p className="font-medium text-sm sm:text-base text-slate-400 mt-3">
          Login to continue to RESUMEAI
        </p>

        <form
          className="flex flex-col gap-4 mt-7 sm:mt-8"
          onSubmit={handleLogin}
        >

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 w-full h-11 rounded-lg
                       bg-[#1E293B] border border-slate-700
                       text-white placeholder-slate-500
                       outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 w-full h-11 rounded-lg
                       bg-[#1E293B] border border-slate-700
                       text-white placeholder-slate-500
                       outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">

            <span
              className="text-sm text-indigo-400 cursor-pointer
                         hover:text-indigo-300"
              onClick={() => {
                navigate("/Forgot-password");
              }}
            >
              Forgot password?
            </span>

          </div>
            
      {error && (
  <p className="text-sm text-red-400 text-center">
    {error}
  </p>
)}

{/* Button */}
<button
  type="submit"
  className="w-full h-11 mt-2 rounded-lg
             bg-indigo-600 hover:bg-indigo-500
             text-white font-medium transition"
>
  Login
</button>

</form>

{/* Signup */}
<p className="text-sm text-slate-400 mt-6 text-center leading-relaxed">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/signup")}
    className="text-indigo-400 cursor-pointer hover:text-indigo-300"
  >
    Create Account
  </span>
</p>

</div>


{/* IMAGE */}
<div className="relative w-full max-w-[480px]">

  {/* Glow */}
  <div className="absolute -inset-5 bg-indigo-600/20 blur-3xl rounded-full"></div>

  <img
    src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2024/10/og-marquee-advantages-ai.webp?w=1024"
    alt="AI Assistant"
    className="relative w-full h-auto max-h-[380px] sm:max-h-[420px]
               object-cover rounded-2xl"
  />

</div>

</div>

</div>
  )
}

export default Login


{/* <button
    onClick={() => navigate(-1)}
    className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
  >
    ← Go Back
  </button> */}