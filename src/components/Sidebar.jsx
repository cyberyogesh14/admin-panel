import { motion } from "framer-motion";
import {
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

const menu = [
  {
    title: "Dashboard",
    icon: <FiGrid />,
  },
  {
    title: "Leads",
    icon: <FiUsers />,
  },
  {
    title: "Analytics",
    icon: <FiBarChart2 />,
  },
  {
    title: "Settings",
    icon: <FiSettings />,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Mobile Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-slate-900 text-white p-3 rounded-xl"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <motion.aside
        animate={{
          width: open ? 260 : 90,
        }}
        transition={{
          duration: 0.3,
        }}
        className="fixed left-0 top-0 h-screen bg-slate-950 border-r border-white/10 backdrop-blur-xl"
      >
        {/* Logo */}

        <div className="h-24 flex items-center justify-center border-b border-white/10">

          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {open ? "JAHVORA" : "J"}
          </h1>

        </div>

        {/* Menu */}

        <div className="mt-8 px-4">

          {menu.map((item, index) => (

            <motion.button
              key={index}
              whileHover={{
                scale: 1.03,
                x: 5,
              }}
              className="w-full flex items-center gap-4 text-slate-300 hover:text-white hover:bg-blue-600 rounded-xl px-4 py-4 mb-3 transition"
            >

              <span className="text-2xl">

                {item.icon}

              </span>

              {open && (
                <span className="font-medium">

                  {item.title}

                </span>
              )}

            </motion.button>

          ))}

        </div>

        {/* Bottom */}

        <div className="absolute bottom-8 left-0 w-full px-4">

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-4 flex items-center justify-center gap-3 text-white"
          >

            <FiLogOut />

            {open && "Logout"}

          </motion.button>

        </div>

      </motion.aside>
    </>
  );
}