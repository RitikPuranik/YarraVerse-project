// src/pages/EcoTracker.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTree, FaSeedling } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const EcoTracker = () => {
  return (
    <motion.section
      className="bg-gradient-to-b from-green-50 to-green-100 py-20 min-h-[90vh] px-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        variants={fadeInUp}
      >
        <div className="inline-flex items-center justify-center bg-green-200 text-green-700 px-4 py-2 rounded-full mb-4 shadow">
          <FaLeaf className="mr-2" /> Eco Dashboard
        </div>
        <h1 className="text-4xl font-extrabold text-green-800 mb-2">Your Green Impact</h1>
        <p className="text-lg text-gray-600">Track your eco-friendly actions and spiritual karma</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {[
          { value: 1320, label: "Karma Points", icon: <FaSeedling className="text-green-500 text-2xl" /> },
          { value: 8, label: "Eco Badges", icon: <FaLeaf className="text-green-600 text-2xl" /> },
          { value: 3, label: "Yatras Completed", icon: <FaTree className="text-green-700 text-2xl" /> },
        ].map(({ value, label, icon }, i) => (
          <motion.div
            key={label}
            className="bg-white p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition"
            custom={i}
            variants={fadeInUp}
          >
            <div className="mb-2">{icon}</div>
            <p className="text-3xl font-bold text-green-700">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div className="flex flex-wrap justify-center gap-4 mb-16" variants={fadeInUp}>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
          Capture Now
        </button>
        <button className="bg-green-100 text-green-800 px-6 py-3 rounded-lg border border-green-300 hover:bg-green-200 transition">
          Scan QR Code
        </button>
        <button className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg border border-yellow-300 hover:bg-yellow-200 transition">
          View Rankings
        </button>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md"
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <FaLeaf /> Eco Tips
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
          <li>Carry a reusable bottle during yatras.</li>
          <li>Use digital prasad/token instead of plastic.</li>
          <li>Offset travel emissions with tree donations.</li>
          <li>Opt for walking/biking in temple areas.</li>
          <li>Support local eco-friendly vendors.</li>
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default EcoTracker;
