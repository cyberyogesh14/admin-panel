import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import { getAnalytics } from "../services/analytics";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  async function loadAnalytics() {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadAnalytics();

    const interval = setInterval(loadAnalytics, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!analytics) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
        <h2 className="text-white text-xl">
          Loading Analytics...
        </h2>
      </div>
    );
  }

  const chartData = Object.entries(analytics.chart).map(
    ([month, leads]) => ({
      month,
      leads,
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >
      {/* Top Cards */}

      <div className="grid lg:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400">
            Total Leads
          </p>

          <h1 className="text-5xl font-black text-white mt-3">
            {analytics.totalLeads}
          </h1>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400">
            Today's Leads
          </p>

          <h1 className="text-5xl font-black text-green-400 mt-3">
            {analytics.todayLeads}
          </h1>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400 mb-3">
            Services
          </p>

          {Object.entries(analytics.services).map(
            ([service, count]) => (
              <div
                key={service}
                className="flex justify-between text-white py-1"
              >
                <span>{service}</span>
                <span>{count}</span>
              </div>
            )
          )}
        </div>

      </div>

      {/* Chart */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">
          Leads Analytics
        </h2>

        <span className="text-green-400 font-semibold">
          Live
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="leadColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3B82F6"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="leads"
            stroke="#3B82F6"
            strokeWidth={4}
            fill="url(#leadColor)"
          />

        </AreaChart>
      </ResponsiveContainer>

    </motion.div>
  );
}