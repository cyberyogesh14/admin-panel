import { motion } from "framer-motion";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-white">
            <FiMenu size={24} />
          </button>

          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              JAHVORA
            </h1>

            <p className="text-xs tracking-[4px] text-slate-400">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* Search */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="hidden md:flex items-center w-[420px] bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
        >
          <FiSearch className="text-slate-400 mr-3 text-lg" />

          <input
            type="text"
            placeholder="Search leads..."
            className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
          />
        </motion.div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <FiBell className="text-white text-xl" />

            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <FiSettings className="text-white text-xl" />
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <FiUser className="text-white text-lg" />
            </div>

            <div className="hidden sm:block">
              <h2 className="text-white font-semibold">
                Admin
              </h2>

              <p className="text-slate-400 text-sm">
                Super Admin
              </p>
            </div>

            <FiChevronDown className="text-slate-400 hidden sm:block" />

          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  );
}