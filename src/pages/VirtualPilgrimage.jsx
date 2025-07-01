// src/pages/VirtualPilgrimage.jsx
import React from "react";

const destinations = [
  {
    name: "Varanasi Ghats",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dashashwamedh_Ghat_on_the_Ganges%2C_Varanasi.jpg/640px-Dashashwamedh_Ghat_on_the_Ganges%2C_Varanasi.jpg",
    description: "Experience the holy Ganges and ancient rituals."
  },
  {
    name: "Golden Temple",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Golden_Temple_Amritsar_India_Punjab_2.jpg/640px-Golden_Temple_Amritsar_India_Punjab_2.jpg",
    description: "Feel the peace at the holiest Sikh shrine."
  },
  {
    name: "Tirumala Temple",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Tirumala_Temple_View_1.jpg/640px-Tirumala_Temple_View_1.jpg",
    description: "Climb the hills to the divine Lord Venkateswara."
  }
];

const VirtualPilgrimage = () => {
  return (
    <section className="bg-yellow-50 py-16 min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-800 mb-2">2048</h1>
        <p className="text-lg text-gray-600">Steps in Your Virtual Yatra</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {destinations.map((place) => (
          <div
            key={place.name}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-orange-700 mb-2">{place.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{place.description}</p>
              <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VirtualPilgrimage;