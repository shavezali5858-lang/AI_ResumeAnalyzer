
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from "axios"

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
   const navigate = useNavigate()
   const location=useLocation();


const HandleSignup= async(e)=>{
  e.preventDefault();

  setError("")
  if(password!==confirmPassword){
    setError("passwords do not match!")
    return;
  }

  
  const API_URL = import.meta.env.VITE_API_URL;

try{
  const res=await axios.post(`${API_URL}/api/auth/register`,
    {
      name,
      email,
      password

    }
  )

    console.log(res.data);

    setTimeout(()=>{
    navigate("/verify", {
      state: {
        email: email
      }
    });

    },1000)

  } catch (error) {
    setError(
      error.response?.data?.msg ||
      "Something went wrong"
    );
  }


}



return (
  <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">

    {/* Go Back */}
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 sm:top-6 sm:left-6
                 px-3 sm:px-4 py-2 rounded-lg
                 bg-slate-700 hover:bg-slate-600
                 text-sm sm:text-base text-slate-200 transition"
    >
      ← Go Back
    </button>

    {/* Main Page */}
    <button
      onClick={() => navigate("/")}
      className="absolute top-4 right-4 sm:top-6 sm:right-6
                 px-3 sm:px-4 py-2 rounded-lg
                 bg-slate-700 hover:bg-slate-600
                 text-sm sm:text-base text-slate-200 transition"
    >
      Main page
    </button>

    {/* MAIN */}
    <div className="flex flex-col lg:flex-row items-center justify-center
                    gap-10 lg:gap-20 w-full max-w-6xl
                    px-2 sm:px-6 lg:px-10">

      {/* FORM */}
      <div className="w-full max-w-[420px]
                      bg-[#111827]
                      border border-slate-800
                      rounded-2xl
                      p-6 sm:p-8 lg:p-10">

        <h1 className="font-bold text-2xl sm:text-3xl text-white">
          Create Account
        </h1>

        <p className="font-medium text-sm sm:text-base text-slate-400 mt-3">
          Let's get started
        </p>

        <form
          className="flex flex-col gap-4 mt-7 sm:mt-8"
          onSubmit={HandleSignup}
        >

          <input
            type="text"
            placeholder="Name"
            className="p-3 w-full h-11 rounded-lg
                       bg-[#1E293B] border border-slate-700
                       text-white placeholder-slate-500
                       outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm password"
            className="p-3 w-full h-11 rounded-lg
                       bg-[#1E293B] border border-slate-700
                       text-white placeholder-slate-500
                       outline-none focus:border-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

            {error && (
  <p className="text-sm text-red-400 text-center">
    {error}
  </p>
)}

<button
  type="submit"
  // onClick={()=>navigate("/verify")}
  className="w-full h-11 mt-2 rounded-lg
             bg-indigo-600 hover:bg-indigo-500
             text-white font-medium transition"
>
  Create Account
</button>

</form>

<p className="text-sm text-slate-400 mt-6 text-center leading-relaxed">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    className="text-indigo-400 cursor-pointer hover:text-indigo-300"
  >
    Login
  </span>
</p>

</div>


{/* IMAGE */}
<div className="relative w-full max-w-[480px]">

  {/* Glow */}
  <div className="absolute -inset-5 bg-indigo-600/20 blur-3xl rounded-full"></div>

  <img
    src="https://img.magnific.com/premium-vector/isometric-illustration-robot-development-robot-assistant_1058698-1878.jpg"
    alt="AI Assistant"
    className="relative w-full h-auto max-h-[420px] object-cover rounded-2xl"
  />

</div>

</div>

</div>
)
}

export default Signup