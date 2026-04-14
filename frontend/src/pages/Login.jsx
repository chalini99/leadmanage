import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP LOGIN (you can connect backend later)
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">

      {/* CARD */}
      <div className="w-[420px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 animate-scale">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold shadow-lg">
            LF
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-white text-center">
          Welcome to LeadFlow
        </h2>
        <p className="text-gray-200 text-center mb-6">
          Sign in to continue
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm text-gray-200">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-200">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-3 rounded-lg font-semibold shadow-lg">
            Sign In
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-300 text-sm mt-6">
          © 2026 LeadFlow
        </p>

      </div>
    </div>
  );
};

export default Login;