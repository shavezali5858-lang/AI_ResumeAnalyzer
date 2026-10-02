import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios"

const Dashboard = () => {
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();
  const location=useLocation();


  const [position, setPosition] = useState("")
 const [logout, setLogout] = useState(false)

 const [user, setUser] = useState(null)

 const [file, setFile] = useState(null)
 const [analysis, setAnalysis] = useState(null)
 const [loading, setLoading] = useState(false)
 const [jobdescription, setJobDescription] = useState("")


const Filehandle=async(e)=>{
  e.preventDefault();

if(!file){
  alert("please select a file first")
  return;
}

const formData=new FormData();

formData.append("file",file)
formData.append("targetPosition",position)
setLoading(true)


try{
  const res=await axios.post(`${API_URL}/api/upload`,formData,
    {
      withCredentials:true
    }
  )


  console.log(res.data)


const fileId=res.data.file._id

const analyzeRes=await axios.post(`${API_URL}/api/analyze`,
  {
    _id:fileId
  },
  {
    withCredentials:true
  }
)

console.log("AI ANALYSIS",analyzeRes.data)
setAnalysis(analyzeRes.data.aiResponse)
console.log("SETTING ANALYSIS:", analyzeRes.data.aiResponse);






  alert("file uploaded succesfully!")
}catch(error){

   console.log(error.response?.data || error.message);
}finally{
  setLoading(false)
}
setFile(null)


}





useEffect(()=>{

   const getUser=async()=>{

    try{
      const res=await axios.get(`${API_URL}/api/auth/me`,{
        withCredentials:true
      })

      setUser(res.data)
    }catch(error){
      console.log(error)
    }





   }
   getUser();

},[])

 



const handleLogout=async(e)=>{
  try{

const res=await axios.post(`${API_URL}/api/auth/logout`,{
})

 {
                withCredentials: true
            }

navigate("/login")

  }catch(error){
    console.log(error)
  }
}



  
    return (
  <div className="min-h-screen bg-slate-50">

    {/* ================= HEADER ================= */}
    <div className="w-full min-h-20 bg-white border border-slate-200
                    flex flex-col lg:flex-row
                    lg:items-center lg:justify-between
                    px-4 sm:px-6 py-4 gap-4">

      {/* Logo */}
      <h1 className="text-slate-900 text-2xl font-bold">
        RESUMEAI
      </h1>

      {/* Dashboard title */}
      <h1 className="text-xl font-semibold text-slate-900">
        Dashboard
      </h1>

      {/* User section */}
      <div className="flex items-center gap-3 sm:gap-5">

        <div className="flex flex-col min-w-0">
          <span className="text-slate-900 text-sm font-medium truncate">
            {user?.name}
          </span>

          <span className="text-slate-500 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
            {user?.email}
          </span>
        </div>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER2Id3VpISm4pRv88CLmOtQd4gN-TMljXcakFQQX5xq2sO2mL7MExTG8&s=10"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
          alt="User"
        />

        <button
          className="px-4 h-9 rounded-xl bg-white text-red-600
                     border border-slate-200 font-semibold
                     hover:text-red-700 hover:bg-gray-100 transition"
          onClick={() => setLogout(true)}
        >
          Logout
        </button>

      </div>
    </div>


    {/* ================= WELCOME ================= */}
    <div className="flex flex-col px-5 sm:px-8 lg:px-10 py-6 gap-1">

      <h1 className="text-indigo-600 font-bold text-2xl">
        Welcome back!
      </h1>

      <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
        Improve your resume. Get noticed by recruiters.
      </h1>

    </div>


    {/* ================= UPLOAD ================= */}
    <div className="mx-4 sm:mx-6 lg:mx-10
                    border-2 border-dashed border-slate-300
                    rounded-2xl p-6 sm:p-10 lg:p-12 text-center">

      <div className="mx-auto w-14 h-14 rounded-full
                      bg-indigo-50 flex items-center justify-center">
        {/* upload icon */}
      </div>

      <h2 className="mt-4 text-xl font-semibold text-slate-900">
        Upload your resume
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Drag & drop your PDF here or
      </p>

      <label className="inline-block mt-3 cursor-pointer">
        <span className="text-indigo-600 font-medium hover:text-indigo-700">
          Browse files
        </span>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files[0];

            if (selectedFile.type !== "application/pdf") {
              alert("only PDF files are allowed");
              return;
            }

            if (selectedFile.size > 5 * 1024 * 1024) {
              alert("size limit exceeded");
              return;
            }

            setFile(selectedFile);
          }}
        />
      </label>

      <p className="mt-3 text-xs text-slate-400">
        PDF only • Maximum 5MB
      </p>


      {/* Selected file */}
      {file && (
        <div className="flex flex-col sm:flex-row
                        items-center justify-center
                        gap-2 sm:gap-3 mt-5">

          <p className="text-slate-900 font-semibold">
            Selected file:
          </p>

          <p className="text-blue-500 max-w-full truncate">
            {file.name}
          </p>

          <button
            className="px-3 py-1 bg-gray-100 text-red-600
                       border border-slate-300 rounded-md
                       hover:bg-gray-200"
            onClick={() => setFile(null)}
          >
            Remove file ✕
          </button>

        </div>
      )}

    </div>


    {/* ================= TARGET POSITION ================= */}
    <div className="flex items-center justify-center px-4 sm:px-6">

      <div className="w-full max-w-4xl
                      border border-slate-200
                      rounded-xl bg-white
                      mt-8 sm:mt-10
                      p-5 sm:p-6">

        <h2 className="text-slate-900 text-center font-bold text-lg">
          Target position
        </h2>

        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full border border-slate-200 rounded-xl
                     px-4 py-3 text-slate-700 bg-white
                     focus:outline-none focus:ring-2
                     focus:ring-indigo-100 focus:border-indigo-500
                     mt-5"
        >
          <option value="">Select target position</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
          <option value="software">Software Engineer</option>
          <option value="data">Data Analyst</option>
          <option value="uiux">UI/UX Designer</option>
          <option value="Other">Other</option>
        </select>

        {position === "Other" && (
          <input
            type="text"
            placeholder="Enter your target position"
            className="w-full mt-4
                       border border-slate-200 rounded-xl
                       px-4 py-3
                       focus:outline-none
                       focus:border-indigo-500"
          />
        )}

      </div>

    </div>


    {/* ================= JOB DESCRIPTION ================= */}
    <div className="mt-6 flex flex-col items-center px-4 sm:px-6">

      <label className="block text-lg font-medium
                        text-slate-700 mb-2">
        Job Description
        <span className="text-slate-400 font-normal">
          {" "} (Optional)
        </span>
      </label>

      <textarea
        rows={6}
        placeholder="Paste the job description here..."
        value={jobdescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full max-w-5xl
                   border border-slate-200 rounded-xl
                   px-4 py-3
                   text-slate-700 bg-white
                   resize-none
                   focus:outline-none
                   focus:ring-2 focus:ring-indigo-100
                   focus:border-indigo-500"
      />

    </div>


    {/* ================= ANALYZE BUTTON ================= */}
    <div className="flex items-center justify-center mt-6 px-4">

      <button
        className="w-full sm:w-60 h-12 sm:h-14
                   rounded-xl bg-indigo-600
                   text-white px-2 py-1
                   hover:bg-indigo-500
                   active:scale-105 transition"
        onClick={Filehandle}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">

            <span
              className="h-4 w-4 border-2 border-white
                         border-t-transparent rounded-full
                         animate-spin"
            ></span>

            Analyzing...

          </span>
        ) : (
          "Analyze your resume"
        )}
      </button>

    </div>
    


    {/* ================= ANALYSIS ================= */}
   
{analysis && (
  <div className="w-full flex justify-center mt-10 px-4 sm:px-6">

    <div className="w-full max-w-5xl
                    bg-white border border-slate-200
                    rounded-2xl p-5 sm:p-8 shadow-sm">

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Resume Analysis
      </h2>


      {/* SCORE */}
      <div className="mt-5">

        <div className="mt-6 flex flex-col items-center">

          <div
            className={`
              w-32 h-32 sm:w-40 sm:h-40
              rounded-full border-8
              flex flex-col items-center justify-center
              ${analysis.score >= 80
                ? "border-green-500 bg-green-50"
                : analysis.score >= 60
                ? "border-blue-500 bg-blue-50"
                : analysis.score >= 40
                ? "border-orange-500 bg-orange-50"
                : "border-red-500 bg-red-50"
              }
            `}
          >

            <span
              className={`
                text-3xl sm:text-4xl font-bold
                ${analysis.score >= 80
                  ? "text-green-600"
                  : analysis.score >= 60
                  ? "text-blue-600"
                  : analysis.score >= 40
                  ? "text-orange-600"
                  : "text-red-600"
                }
              `}
            >
              {analysis.score}
            </span>

            <span className="text-xs sm:text-sm text-slate-500">
              out of 100
            </span>

          </div>

          <p className="mt-4 text-base sm:text-lg
                        font-semibold text-slate-700 text-center">
            {analysis.score >= 80
              ? "Excellent Resume"
              : analysis.score >= 60
              ? "Good Resume"
              : analysis.score >= 40
              ? "Needs Improvement"
              : "Poor Resume"}
          </p>

        </div>


        {/* ================= STRENGTHS + MISSING SKILLS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-8">

          {/* Strengths */}
          <div className="bg-white border border-slate-200
                          rounded-2xl p-5 sm:p-6 shadow-sm">

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              💪 Strengths
            </h3>

            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">

              {analysis.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="text-green-500 flex-shrink-0">
                    ✓
                  </span>

                  <span className="break-words">
                    {strength}
                  </span>
                </li>
              ))}

            </ul>

          </div>


          {/* Missing Skills */}
          <div className="bg-white border border-slate-200
                          rounded-2xl p-5 sm:p-6 shadow-sm">

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              📚 Missing Skills
            </h3>

            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">

              {analysis.missingSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="text-orange-500 flex-shrink-0">
                    !
                  </span>

                  <span className="break-words">
                    {skill}
                  </span>
                </li>
              ))}

            </ul>

          </div>

        </div>


        {/* ================= MISSING KEYWORDS ================= */}
        <div className="bg-white border border-slate-200
                        rounded-2xl p-5 sm:p-6
                        shadow-sm mt-6">

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            🔑 Missing Keywords
          </h3>

          <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">

            {analysis.missingKeywords.map((keyword, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <span className="text-orange-500 flex-shrink-0">
                  !
                </span>

                <span className="break-words">
                  {keyword}
                </span>
              </li>
            ))}

          </ul>

        </div>


        {/* ================= WEAKNESSES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6">

          <div className="bg-white border border-slate-200
                          rounded-2xl p-5 sm:p-6 shadow-sm">

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              ⚠️ Weaknesses
            </h3>

            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">

              {analysis.weaknesses.map((weakness, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-500 flex-shrink-0">
                    !
                  </span>

                  <span className="break-words">
                    {weakness}
                  </span>
                </li>
              ))}

            </ul>

          </div>


          {/* ================= SUGGESTIONS ================= */}
          <div className="bg-white border border-slate-200
                          rounded-2xl p-5 sm:p-6 shadow-sm">

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              💡 Suggestions
            </h3>

            <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-700">

              {analysis.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="text-indigo-500 flex-shrink-0">
                    →
                  </span>

                  <span className="break-words">
                    {suggestion}
                  </span>
                </li>
              ))}

            </ul>

          </div>

        </div>


        {/* ================= JOB DESCRIPTION ANALYSIS ================= */}
        <div className="mt-6 bg-white border border-slate-200
                        rounded-2xl p-5 sm:p-6 shadow-sm">

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            🎯 Job Description Match
          </h3>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            How well your resume matches the provided job description.
          </p>


          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-6 mt-6">

            {/* Matched Keywords */}
            <div>

              <h4 className="font-semibold text-green-600">
                ✓ Matched Keywords
              </h4>

              <div className="flex flex-wrap gap-2 mt-3">

                {analysis.matchedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full
                               bg-green-50 text-green-700
                               border border-green-200
                               text-xs sm:text-sm
                               break-all"
                  >
                    {keyword}
                  </span>
                ))}

              </div>

            </div>


            {/* Missing Keywords */}
            <div>

              <h4 className="font-semibold text-orange-600">
                ! Missing Keywords
              </h4>

              <div className="flex flex-wrap gap-2 mt-3">

                {analysis.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full
                               bg-orange-50 text-orange-700
                               border border-orange-200
                               text-xs sm:text-sm
                               break-all"
                  >
                    {keyword}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
)}

    

{logout && (
  <div className="fixed inset-0 z-50
                  bg-black/30 backdrop-blur-sm
                  flex items-center justify-center
                  px-4">

    <div className="w-full max-w-[400px]
                    bg-white rounded-2xl
                    p-6 sm:p-7 shadow-xl">

      <div className="flex flex-col items-center justify-center">

        <h2 className="text-slate-900
                       text-lg sm:text-xl
                       font-semibold text-center
                       leading-relaxed">
          Are you sure you want to Logout?
        </h2>


        <div className="flex flex-col sm:flex-row
                        w-full sm:w-auto
                        gap-3 sm:gap-5 mt-8">

          <button
            className="w-full sm:w-35 h-10
                       bg-slate-50
                       border border-gray-200
                       rounded-lg
                       text-red-600
                       hover:bg-gray-100
                       transition"
            onClick={handleLogout}
          >
            Yes, Logout
          </button>


          <button
            className="w-full sm:w-35 h-10
                       bg-slate-50
                       border border-gray-200
                       rounded-lg
                       text-slate-700
                       hover:bg-gray-100
                       transition"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  </div>


)}

</div>
);
}




    
export default Dashboard
