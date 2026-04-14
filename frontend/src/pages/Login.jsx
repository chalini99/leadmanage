import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignup ? "/auth/register" : "/auth/login";

      const res = await API.post(url, {
        email,
        password,
      });

      if (isSignup) {
        alert("Account created successfully ✅");
        setIsSignup(false);
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">

      {/* CARD */}
      <div className="w-[90%] max-w-[420px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold shadow-lg">
            LF
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-white text-center">
          {isSignup ? "Create Account" : "Welcome to LeadFlow"}
        </h2>
        <p className="text-gray-200 text-center mb-6">
          {isSignup ? "Sign up to get started" : "Sign in to continue"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-200">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-200">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-3 rounded-lg font-semibold shadow-lg">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

        </form>

        {/* TOGGLE SIGNUP */}
        <p className="text-center text-gray-300 text-sm mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            className="ml-2 text-blue-300 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-xs mt-4">
          © 2026 LeadFlow
        </p>

      </div>
    </div>
  );
};

export default Login;