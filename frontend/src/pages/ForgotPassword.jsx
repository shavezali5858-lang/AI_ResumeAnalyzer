import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/forget-Password`,
        { email }
      );

      setMessage(res.data.msg);
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="fixed top-5 right-0 left-5">
<button className="w-35 h-10 bg-blue-900 text-gray-200 rounded-xl px-2 py-1" onClick={()=>navigate(-1)}
>Go back ⬅️</button>

        </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">

        <h1 className="text-2xl font-bold text-white text-center">
          Forgot Password?
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Enter your email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <label className="text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 p-3 rounded-lg bg-slate-800
                       border border-slate-700 text-white
                       outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 py-3 rounded-lg
                       bg-indigo-600 hover:bg-indigo-700
                       disabled:opacity-60
                       text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="text-center text-sm text-slate-300 mt-5">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}