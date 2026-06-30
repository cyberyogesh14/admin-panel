import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-5">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[180px]" />

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
      >

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            JAHVORA
          </h1>

          <p className="text-slate-400 mt-3">
            Admin Panel Login
          </p>

        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 text-red-400 p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Email */}

        <div className="mb-6">

          <label className="text-slate-300 mb-2 block">
            Email
          </label>

          <div className="flex items-center bg-[#0f172a] rounded-xl px-4">

            <FiMail className="text-slate-500" />

            <input
              type="email"
              placeholder="admin@jahvora.com"
              className="w-full bg-transparent outline-none p-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

        </div>

        {/* Password */}

        <div className="mb-8">

          <label className="text-slate-300 mb-2 block">
            Password
          </label>

          <div className="flex items-center bg-[#0f172a] rounded-xl px-4">

            <FiLock className="text-slate-500" />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent outline-none p-4 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] duration-300 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-3"
        >
          <FiLogIn />
          Login
        </button>

      </motion.form>

    </div>
  );
}