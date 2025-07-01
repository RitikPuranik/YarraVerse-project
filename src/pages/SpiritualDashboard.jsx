// src/pages/SpiritualDashboard.jsx
import React from "react";
import { FaHeart, FaSeedling, FaBell, FaStar } from "react-icons/fa";

// Pass icon components, not JSX
const stats = [
  { icon: FaHeart, label: "Mindfulness", value: 82 },
  { icon: FaSeedling, label: "Compassion", value: 76 },
  { icon: FaBell, label: "Meditation", value: 94 },
  { icon: FaStar, label: "Spiritual Growth", value: 88 },
];


const SpiritualDashboard = () => {
  return (
    <section className="bg-indigo-50 py-16 min-h-[80vh] px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">Spiritual Dashboard</h1>
        <p className="text-lg text-gray-600">
          Track your inner journey and reflect on your spiritual progress
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((item, i) => (
          <div key={i} className="bg-white shadow rounded p-6 text-center">
            <div className="text-3xl text-indigo-600 mb-2">
              <item.icon />
            </div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-1">{item.label}</h3>
            <p className="text-2xl font-bold text-gray-700">{item.value}%</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Reflection</h2>
        <p className="text-gray-600 mb-6">
          "Daily practice brings clarity. Keep your heart open, your mind still, and your spirit grateful."
        </p>
        <button className="bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-800">
          View Guided Practices
        </button>
      </div>
    </section>
  );
};

export default SpiritualDashboard;
