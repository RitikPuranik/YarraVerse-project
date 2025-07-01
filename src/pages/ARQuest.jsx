// src/pages/ARQuest.jsx
import React from "react";
import { FaCamera, FaMapMarkedAlt, FaMedal } from "react-icons/fa";

const ARQuest = () => {
  return (
    <section className="bg-purple-50 py-16 min-h-[80vh] px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">AR Quest</h1>
        <p className="text-lg text-gray-600">
          Embark on sacred missions and unlock blessings through your camera
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow-md rounded p-6">
          <FaCamera className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="font-semibold text-purple-700 mb-2">Scan Sacred Symbols</h3>
          <p className="text-sm text-gray-600">Use your camera to identify temples, icons, and spiritual signs.</p>
        </div>

        <div className="bg-white shadow-md rounded p-6">
          <FaMapMarkedAlt className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="font-semibold text-purple-700 mb-2">Complete Temple Quests</h3>
          <p className="text-sm text-gray-600">Check-in at real or virtual locations to earn blessings.</p>
        </div>

        <div className="bg-white shadow-md rounded p-6">
          <FaMedal className="text-purple-600 text-4xl mx-auto mb-4" />
          <h3 className="font-semibold text-purple-700 mb-2">Earn Divine Medals</h3>
          <p className="text-sm text-gray-600">Accumulate blessings and badges by completing AR challenges.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800">
          Start AR Quest
        </button>
      </div>
    </section>
  );
};

export default ARQuest;