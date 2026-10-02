import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import axios from "axios"


import { useState } from 'react';

const Verifyemail = () => {
  
  const API_URL = import.meta.env.VITE_API_URL;
    const navigate=useNavigate();
    const location=useLocation();
    const email=location.state?.email

    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")

    const [showsuccess, setShowsuccess] = useState(false)



const HandleEmail=async(e)=>{
  e.preventDefault();
  setError("")

if(otp.length<6){
  setError("Enter a valid 6 digit OTP")

}


try{

const res=await axios.post(`${API_URL}/api/auth/verify-email`,
  {
email,
otp

})

if(res.status===200){
  setShowsuccess(true)
}

setTimeout(()=>{
  navigate("/login")
},3000)


}catch(error){
setError(error.response?.data?.msg||"invalid OTP")
}

}




  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center '>



        <div className='bg-white w-130 h-130 rounded-xl border border-slate-200 shadow-sm'>
            <h1 className='text-green-500 text-2xl text-center mt-5'><FontAwesomeIcon icon={faEnvelope} /></h1>

            <h1 className='text-slate-900 text-2xl text-center mt-2 font-bold'>Verify your email address</h1>


            <h1 className='text-slate-500 text-center font-semibold mt-8'>We sent a code to your email</h1>


            <h1 className='text-slate-500 text-center mt-10'>Enter your verification code</h1>

<form className='flex flex-col gap-8 items-center'onSubmit={HandleEmail}>
            <input type="number"
            maxLength={6}
             placeholder='enter 6 digit otp'
             value={otp}
             onChange={(e)=>{
                const value=e.target.value

    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
             }}
              className="w-100 h-8 border border-slate-300 rounded-xl
             px-4 text-center text-lg tracking-[0.5em]
             focus:outline-none focus:border-indigo-500
             focus:ring-2 focus:ring-indigo-100 mt-7 ml-9"
              
              />
              {error && (
  <p className="text-sm text-red-500 mt-2 text-center">
    {error}
  </p>
)}


              <button className='w-60 h-10 rounded-xl bg-green-600 text-white hover:scale-105 hover:bg-green-400'>Verify</button>
              </form>

<div className='flex items-center justify-center gap-5 mt-8'>
              <button className='text-green-500 hover:text-green-400 '>Resend code</button>

              <button className='text-green-500 hover:text-green-400' onClick={()=>navigate("/signup")}>Change email</button>
</div>

        </div>


        <button className='bg-gray-200 w-50 h-8 text-slate-900 font-bold mt-8 hover:bg-gray-300' onClick={()=>navigate(-1)}>previous page<FontAwesomeIcon icon={faArrowLeft} /></button>


        {showsuccess && (
<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>

<div className='bg-white w-120 h-120 rounded-xl p-7 text-center shadow-xl '>
 <div className="mx-auto w-14 h-14 rounded-full
                      bg-green-50 flex items-center justify-center">

        <span className="text-green-600 text-2xl">
          ✓
        </span>

      </div>


      <h2 className='text-xl text-slate-900 mt-4 font-semibold'>Email verified</h2>

      <p className="mt-2 text-sm text-slate-500">
        Your email has been verified successfully.
      </p>

      <p className="mt-4 text-xs text-slate-400">
        Redirecting to login...
      </p>
  
</div>


  </div>

        )}
      
    </div>
  )
}

export default Verifyemail
