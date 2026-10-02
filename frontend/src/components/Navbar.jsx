import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
  <div className="w-full min-h-20 bg-[#111827] flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 gap-4">

    {/* Logo */}
    <h1 className="font-serif text-slate-100 text-2xl font-semibold">
      RESUMEAI
    </h1>

    {/* Navigation */}
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">

      <a
        href="#"
        className="text-slate-200 hover:text-white"
      >
        Home
      </a>

      <a
        href="#feautures"
        className="text-slate-200 hover:text-white"
      >
        Features
      </a>

      <Link to="/login">
        <button className="w-24 sm:w-30 h-9 px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">
          Login
        </button>
      </Link>

      <Link to="/signup">
        <button className="w-24 sm:w-30 h-9 px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">
          Signup
        </button>
      </Link>

    </div>

  </div>
)
}

export default Navbar
