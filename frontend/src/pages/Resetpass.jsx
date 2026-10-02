import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ResetPassword() {
  
  const API_URL = import.meta.env.VITE_API_URL;

  const { token } = useParams();
  console.log("FRONTEND TOKEN:", token);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("")
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage(res.data.msg);

      setTimeout(() => {
        navigate("/login")
        
      }, 1500);


      if(password!==confirmpassword){
        setMessage("Passwords do not match!")
      }

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
<button className="w-30 h-10 bg-blue-900 text-gray-200 rounded-xl px-2 py-1" onClick={()=>navigate(-1)}
>Home page ⬅️</button>

        </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">

       

        <h1 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 rounded-lg bg-slate-800
                       border border-slate-700 text-white
                       outline-none focus:border-indigo-500"
          />
           <input
            type="password"
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 rounded-lg bg-slate-800
                       border border-slate-700 text-white
                       outline-none focus:border-indigo-500 mt-5"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 py-3 rounded-lg
                       bg-indigo-600 hover:bg-indigo-700
                       disabled:opacity-60
                       text-white font-semibold"
          >
            {loading ? "Resetting..." : "Reset Password"}
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