import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiMail,
  FiPhone,
  FiGlobe,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi";

export default function LeadModal({ open, onClose, lead }) {
  if (!lead) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-5"
        >
          <motion.div
            initial={{ y: 40, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/10 p-8"
          >
            {/* Header */}

            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-3xl font-bold text-white">
                  Lead Details
                </h2>

                <p className="text-slate-400 mt-1">
                  Customer Information
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition"
              >
                <FiX size={22} />
              </button>

            </div>

            {/* Details */}

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4">
                <FiMail className="text-blue-400 text-xl" />
                <span className="text-white">{lead.email}</span>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="text-green-400 text-xl" />
                <span className="text-white">{lead.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <FiGlobe className="text-cyan-400 text-xl" />
                <span className="text-white">{lead.service}</span>
              </div>

              <div className="flex items-center gap-4">
                <FiCalendar className="text-yellow-400 text-xl" />
                <span className="text-white">{lead.date}</span>
              </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-3 gap-4 mt-10">

              <a
                href={`https://wa.me/91${lead.phone}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 rounded-xl py-3 text-white text-center flex items-center justify-center gap-2"
              >
                <FiMessageCircle />
                WhatsApp
              </a>

              <a
                href={`tel:${lead.phone}`}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-white text-center"
              >
                Call
              </a>

              <a
                href={`mailto:${lead.email}`}
                className="bg-purple-600 hover:bg-purple-700 rounded-xl py-3 text-white text-center"
              >
                Email
              </a>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}