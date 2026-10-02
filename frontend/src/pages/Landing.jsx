import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Feautures from './Feautures';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";


import axios from 'axios';
const Landing = () => {
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();


  const [loginmodal, setLoginmodal] = useState(false)

  const handleLogin=async()=>{

try{

  await axios.get(`${API_URL}/api/auth/me`,
    
    {
      withCredentials:true
    
  })


navigate("/dashboard")


}catch(error){

setLoginmodal(true)

}

  }






  
  return (
    <div className="min-h-screen bg-[#0B1120] scroll-smooth">
      <Navbar />

     <section className="flex min-h-[calc(100vh-80px)] flex-col lg:flex-row items-center justify-center lg:justify-evenly gap-12 lg:gap-10 px-5 sm:px-8 lg:px-10 py-12 lg:py-16">

  {/* Left Content */}
  <div className="max-w-xl text-white text-center lg:text-left">

    <p className="mb-5 text-indigo-400 font-medium">
      ✦ AI-Powered Resume Analysis
    </p>

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
      MAKE YOUR RESUME
      <br />
      <span className="text-indigo-400">
        JOB READY WITH AI.
      </span>
    </h1>

    <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400">
      Upload your resume and get intelligent feedback
      to improve your skills, content & ATS score.
    </p>

    <button
      className="mt-8 rounded-lg bg-indigo-600 px-6 py-3
      font-medium text-white transition hover:bg-indigo-500"
      onClick={handleLogin}
    >
      Analyze My Resume →
    </button>

  </div>
        {/* Right Image */}
        <div className="relative w-full max-w-md lg:max-w-lg">

    <div className="absolute -inset-4 rounded-3xl bg-indigo-600/20 blur-3xl"></div>

    <img
      className="relative w-full h-auto max-h-[450px] rounded-2xl object-cover"
      src="https://agilityportal.io/images/easyblog_articles/1365/What-Jobs-Has-AI-Already-Replaced.png"
      alt="AI Resume Analysis"
    />

  </div>

</section>

<section className="min-h-screen py-16 sm:py-20">
<div className="text-center px-5">

  <h2 className="text-3xl sm:text-4xl font-medium text-white">
    Are you facing these problems?
  </h2>

  <p className="mt-4 text-sm sm:text-base text-slate-300">
    Your resume might be holding you back without you even knowing it.
  </p>

</div>


      {/* Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-5 sm:gap-8 mt-10 sm:mt-14 px-5 sm:px-6">

        {/* Card 1 */}
      <div className="bg-white border border-slate-200 rounded-2xl
                min-h-[160px] sm:min-h-[180px] p-6 sm:p-8
                flex items-center justify-center text-center
                shadow-sm hover:shadow-md hover:-translate-y-1
                transition duration-300">

  <h3 className="text-xl sm:text-2xl font-medium text-slate-900">
    Applying for months but not getting interviews
  </h3>

</div>


        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl
                min-h-[160px] sm:min-h-[180px] p-6 sm:p-8
                flex items-center justify-center text-center
                shadow-sm hover:shadow-md hover:-translate-y-1
                transition duration-300">
          <h3 className="text-xl sm:text-2xl font-medium text-slate-900">
            Not sure your resume has the right keywords and skills
          </h3>

        </div>


        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl
                min-h-[160px] sm:min-h-[180px] p-6 sm:p-8
                flex items-center justify-center text-center
                shadow-sm hover:shadow-md hover:-translate-y-1
                transition duration-300">
          <h3 className="text-xl sm:text-2xl font-medium text-slate-900">
            Not sure if your resume is ATS compatible
          </h3>

        </div>


        {/* Card 4 */}
       
             <div className="bg-white border border-slate-200 rounded-2xl
                min-h-[160px] sm:min-h-[180px] p-6 sm:p-8
                flex items-center justify-center text-center
                shadow-sm hover:shadow-md hover:-translate-y-1
                transition duration-300">
          <h3 className="text-xl sm:text-2xl font-medium text-slate-900">

            Bullet points are generic and not quantified
          </h3>

        </div>
</div>

</section>


<section id="feautures" className="py-16 sm:py-20 px-5 sm:px-8">

  <div>

    <h1 className="text-3xl sm:text-4xl text-white text-center font-bold">
      Understand Your{" "}
      <span className="text-indigo-600">
        ATS
      </span>{" "}
      Score
    </h1>

    <p className="text-slate-200 leading-relaxed text-base sm:text-lg mt-5 max-w-6xl mx-auto">
      ATS (Applicant Tracking System) is software used by companies to
      automatically scan, analyze, and filter resumes before they reach a
      recruiter. When you apply for a job, the ATS compares your resume with
      the job description and looks for relevant keywords such as skills,
      qualifications, experience, job titles, and technologies. It also checks
      whether the resume is properly formatted and readable. A resume with a
      strong match to the job requirements is more likely to pass the initial
      screening and reach the recruiter.
    </p>

    <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mt-10 sm:mt-12 mb-6">
      How to improve your{" "}
      <span className="text-indigo-600">
        ATS Score?
      </span>
    </h2>

    <div className="max-w-6xl mx-auto space-y-4">

      <div className="min-h-14 border border-gray-600 hover:-translate-y-1
                      transition-all duration-300 rounded-xl p-3 sm:p-4">
        <p className="text-white font-medium text-sm sm:text-base">
          Match keywords with the job description — Include relevant skills,
          technologies, qualifications, and job titles mentioned in the job posting.
        </p>
      </div>

      <div className="min-h-14 border border-gray-600 hover:-translate-y-1
                      transition-all duration-300 rounded-xl p-3 sm:p-4">
        <p className="text-white font-medium text-sm sm:text-base">
          Highlight relevant skills — Prioritize skills that are directly
          related to the position instead of listing every skill you know.
        </p>
      </div>

      <div className="min-h-14 border border-gray-600 hover:-translate-y-1
                      transition-all duration-300 rounded-xl p-3 sm:p-4">
        <p className="text-white font-medium text-sm sm:text-base">
          Customize your resume for each job — Adjust your skills, projects,
          and experience according to the specific job description.
        </p>
      </div>

      <div className="min-h-14 border border-gray-600 hover:-translate-y-1
                      transition-all duration-300 rounded-xl p-3 sm:p-4">
        <p className="text-white font-medium text-sm sm:text-base">
          Use an ATS-friendly format — Keep the resume clean and simple with
          standard headings, readable fonts, and a clear structure.
        </p>
      </div>

    </div>

  </div>

</section>

<section className="mt-10 sm:mt-16 px-5 sm:px-8 pb-16">

  <div>

    <h1 className="text-3xl text-center font-bold text-white">
      How it Works
    </h1>

    <h2 className="text-xl sm:text-2xl font-medium text-center mt-6 sm:mt-8 text-slate-400">
      Improve your Resume in 3 simple steps
    </h2>

    <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-10">

      {/* STEP 1 */}
      <div className="w-full max-w-md lg:w-110 h-60 bg-slate-900/60 border border-slate-700
                      rounded-2xl p-6 sm:p-7 hover:border-indigo-500
                      hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

          <span className="text-indigo-400 font-bold text-sm">
            01
          </span>

          <div className="w-12 h-12 rounded-xl bg-indigo-500/10
                          flex items-center justify-center text-2xl">
            📄
          </div>

        </div>

        <h1 className="text-lg text-indigo-600 font-bold mt-5">
          UPLOAD YOUR RESUME
        </h1>

        <p className="text-sm text-white mt-5">
          Upload your resume in PDF format and select the job role you're targeting.
        </p>

      </div>

      {/* ARROW */}
      <div className="text-3xl text-white rotate-90 lg:rotate-0">
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>

      {/* STEP 2 */}
      <div className="w-full max-w-md lg:w-110 h-60 bg-slate-900/60 border border-slate-700
                      rounded-2xl p-6 sm:p-7 hover:border-indigo-500
                      hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

          <span className="text-indigo-400 font-bold text-sm">
            02
          </span>

          <div className="w-12 h-12 rounded-xl bg-indigo-500/10
                          flex items-center justify-center text-2xl">
            🤖
          </div>

        </div>

        <h1 className="text-lg text-indigo-600 font-bold mt-5">
          GET AI ANALYSIS
        </h1>

        <p className="text-sm text-white mt-5">
          Our AI analyzes your skills, experience, keywords, and resume structure.
        </p>

      </div>

      {/* ARROW */}
      <div className="text-3xl text-white rotate-90 lg:rotate-0">
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>

      {/* STEP 3 */}
      <div className="w-full max-w-md lg:w-110 h-60 bg-slate-900/60 border border-slate-700
                      rounded-2xl p-6 sm:p-7 hover:border-indigo-500
                      hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

          <span className="text-indigo-400 font-bold text-sm">
            03
          </span>

          <div className="w-12 h-12 rounded-xl bg-indigo-500/10
                          flex items-center justify-center text-2xl">
            🚀
          </div>

        </div>

        <h1 className="text-lg text-indigo-600 font-bold mt-5">
          IMPROVE & APPLY
        </h1>

        <p className="text-sm text-white mt-5">
          Get personalized suggestions to strengthen your resume and improve
          your chances of getting hired.
        </p>

      </div>

    </div>

  </div>

</section>
<section>

<Feautures/>


</section>

{loginmodal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-[400px] rounded-2xl p-5 sm:p-7 shadow-xl">

      <div
        className="flex items-center justify-center
                   w-12 h-12 rounded-full
                   bg-indigo-50 mx-auto"
      >
        <h2>
          <FontAwesomeIcon icon={faLock} />
        </h2>
      </div>

      <h2
        className="text-lg sm:text-xl font-semibold text-slate-900
                   text-center mt-4"
      >
        Please Login First
      </h2>

      <p className="text-sm text-slate-500 text-center mt-2 leading-relaxed">
        You need to login before you can analyze your resume.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          onClick={() => setLoginmodal(false)}
          className="w-full sm:flex-1 h-10 rounded-lg
                     border border-slate-300
                     text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full sm:flex-1 h-10 rounded-lg
                     bg-indigo-600 hover:bg-indigo-500
                     text-white"
        >
          Login
        </button>

      </div>

    </div>

  </div>
)}








      
    </div>
  )
}

export default Landing