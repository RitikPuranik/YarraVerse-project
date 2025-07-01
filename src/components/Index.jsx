import React from 'react';
import SmartAssistant from './SmartAssistant';
import { Bot, Sparkles, MapPin, Calendar, Heart, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Bot size={64} className="text-orange-600" />
              <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Yatre Assistant
          </h1>
          <h2 className="text-2xl text-orange-700 mb-4 font-semibold">
            🙏 आपका यात्रा सहायक 2025
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your intelligent companion for the sacred Yatre pilgrimage. Get instant guidance about temple timings, rituals, accommodation, and everything you need for a blessed darshan.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm text-gray-700 mb-8">
            <div className="flex items-center justify-center gap-2 bg-white/70 rounded-lg p-3 shadow-sm">
              <Calendar size={16} className="text-orange-600" />
              <span><strong>Dates:</strong> Jan 13 - Feb 26, 2025</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/70 rounded-lg p-3 shadow-sm">
              <Heart size={16} className="text-red-600" />
              <span><strong>Main Temple:</strong> Mahakaleshwar Jyotirlinga</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/70 rounded-lg p-3 shadow-sm">
              <MapPin size={16} className="text-green-600" />
              <span><strong>Location:</strong> Ujjain, Madhya Pradesh</span>
            </div>
          </div>

          {/* Quick Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <span>Temple Info</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Kumbh Schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Pilgrim Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Travel Help</span>
            </div>
          </div>
        </div>

        {/* Smart Assistant UI */}
        <SmartAssistant />

        {/* Shahi Snan Dates */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-6 max-w-3xl mx-auto shadow-md">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">🛁 Important Shahi Snan Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-orange-700">
              <div>• <strong>Paush Purnima:</strong> January 13, 2025</div>
              <div>• <strong>Makar Sankranti:</strong> January 14, 2025</div>
              <div>• <strong>Mauni Amavasya:</strong> January 29, 2025</div>
              <div>• <strong>Vasant Panchami:</strong> February 3, 2025</div>
              <div>• <strong>Maghi Purnima:</strong> February 12, 2025</div>
              <div>• <strong>Maha Shivratri:</strong> February 26, 2025</div>
            </div>
            <p className="text-xs text-orange-600 mt-4">🙏 हर हर महादेव | जय महाकाल</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;