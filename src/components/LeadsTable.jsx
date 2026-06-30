import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FiEye,
    FiEdit,
    FiTrash2,
    FiSearch,
} from "react-icons/fi";

import LeadModal from "./LeadModal";
import { getLeads } from "../services/api";

export default function LeadsTable() {
    const [leadData, setLeadData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedLead, setSelectedLead] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loadLeads(showLoader = false) {
        try {
            if (showLoader) {
                setLoading(true);
            }

            const data = await getLeads();

            setLeadData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            if (showLoader) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        loadLeads(true); // sirf first time loader

        const interval = setInterval(() => {
            loadLeads(false); // background refresh
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const filteredLeads = leadData.filter((lead) => {
        const query = search.toLowerCase();

        return (
            (lead.name || "").toLowerCase().includes(query) ||
            (lead.email || "").toLowerCase().includes(query) ||
            (lead.service || "").toLowerCase().includes(query)
        );
    });

    console.log("LeadData:", leadData);
    console.log("Filtered:", filteredLeads);
    if (loading) {
        return (
            <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
                <h2 className="text-white text-xl font-semibold">
                    Loading Leads...
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="bg-green-600 text-white text-center p-5 text-2xl">
                LeadsTable Loaded
            </div>

            <motion.div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                > */}
                {/* Header */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-5 p-6 border-b border-white/10">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Recent Leads
                        </h2>

                        <p className="text-slate-400 mt-1">
                            Total Leads : {filteredLeads.length}
                        </p>

                    </div>

                    <div className="flex items-center w-full md:w-80 bg-slate-900 rounded-xl px-4 py-3">

                        <FiSearch className="text-slate-500 mr-3" />

                        <input
                            type="text"
                            placeholder="Search Leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-white w-full"
                        />

                    </div>

                </div>

                <div className="overflow-x-auto">
                    <div className="p-5 text-white bg-red-500">
                        Total : {leadData.length}
                    </div>
                    <table className="w-full">

                        <thead className="bg-slate-900">
                            <tr>
                                <th className="p-4 text-left text-slate-400">Name</th>
                                <th className="p-4 text-left text-slate-400">Service</th>
                                <th className="p-4 text-left text-slate-400">Phone</th>
                                <th className="p-4 text-left text-slate-400">Date</th>
                                <th className="p-4 text-left text-slate-400">Status</th>
                                <th className="p-4 text-center text-slate-400">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLeads.map((lead) => (
                                <motion.tr
                                    key={lead.id}
                                    whileHover={{
                                        backgroundColor: "#162033",
                                    }}
                                    className="border-b border-white/5"
                                >
                                    <td className="p-4">
                                        <h3 className="text-white font-semibold">
                                            {lead.name}
                                        </h3>

                                        <p className="text-slate-400 text-sm">
                                            {lead.email}
                                        </p>
                                    </td>

                                    <td className="p-4 text-slate-300">
                                        {lead.service}
                                    </td>

                                    <td className="p-4 text-slate-300">
                                        {lead.phone}
                                    </td>

                                    <td className="p-4 text-slate-300">
                                        {new Date(lead.date).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${lead.status === "New"
                                                ? "bg-green-500/20 text-green-400"
                                                : lead.status === "Pending"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-blue-500/20 text-blue-400"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => {
                                                    setSelectedLead(lead);
                                                    setOpen(true);
                                                }}
                                                className="text-cyan-400 hover:scale-110 duration-300"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            <button
                                                className="text-yellow-400 hover:scale-110 duration-300"
                                            >
                                                <FiEdit size={18} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setLeadData(
                                                        leadData.filter(
                                                            (item) => item.id !== lead.id
                                                        )
                                                    )
                                                }
                                                className="text-red-400 hover:scale-110 duration-300"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </motion.tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </motion.div>

            <LeadModal
                open={open}
                onClose={() => setOpen(false)}
                lead={selectedLead}
            />

        </>
    );
}