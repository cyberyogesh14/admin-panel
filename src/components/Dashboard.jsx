import { motion } from "framer-motion";
import Analytics from "./Analytics";
import LeadsTable from "./LeadsTable";
import {
  FiUsers,
  FiTrendingUp,
  FiGlobe,
  FiDollarSign,
  FiArrowUpRight,
  FiDownload,
} from "react-icons/fi";

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning ☀️"
    : hour < 17
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

const stats = [
  {
    title: "Total Leads",
    value: 154,
    icon: <FiUsers />,
    color: "from-blue-500 to-cyan-500",
    growth: "+18%",
  },
  {
    title: "Today's Leads",
    value: 18,
    icon: <FiTrendingUp />,
    color: "from-purple-500 to-pink-500",
    growth: "+9%",
  },
  {
    title: "Website Orders",
    value: 9,
    icon: <FiGlobe />,
    color: "from-green-500 to-emerald-500",
    growth: "+4%",
  },
  {
    title: "Revenue",
    value: 24,
    icon: <FiDollarSign />,
    color: "from-orange-500 to-yellow-500",
    growth: "+22%",
    suffix: "K",
    prefix: "₹",
  },
];

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -left-40 -top-40 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[170px]" />
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[170px]" />

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center"
        >
          <div>
            <h1 className="text-5xl font-black text-white">{greeting}</h1>
            <p className="text-slate-400 mt-3">
              Welcome back to Jahvora Admin Dashboard
            </p>
          </div>

          <div className="flex gap-4 mt-8 lg:mt-0">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white transition">
              <FiDownload />
              Export
            </button>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-xl text-white">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-12">
          {stats.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-400">{card.title}</p>

                  <h2 className="text-5xl font-black text-white mt-5">
                    {card.prefix}
                    {card.value}
                    {card.suffix}
                  </h2>

                  <div className="flex items-center gap-2 mt-4 text-green-400">
                    <FiArrowUpRight />
                    {card.growth}
                  </div>
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-3xl`}
                >
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PART 2 STARTS BELOW */}
        <div className="mt-10">
          <Analytics />
        </div>

        <div className="bg-red-500 text-white p-4 text-center">
          Leads Component Start
        </div>

        <LeadsTable />

      </div>
    </div>
  );
}