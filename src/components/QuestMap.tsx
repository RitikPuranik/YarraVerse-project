import React, { useState, useEffect } from 'react';
import { X, MapPin, Navigation, CheckCircle, Clock, Zap } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  reward: number;
  location?: { lat: number; lng: number; name: string };
}

interface QuestMapProps {
  onBack: () => void;
  userLocation: { lat: number; lng: number } | null;
  quests: Quest[];
  onLocationReached: (questId: string) => void;
}

const QuestMap: React.FC<QuestMapProps> = ({ onBack, userLocation, quests, onLocationReached }) => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [distances, setDistances] = useState<{ [key: string]: number }>({});
  const [checkingIn, setCheckingIn] = useState<string | null>(null);

  // Calculate distances to quest locations
  useEffect(() => {
    if (userLocation) {
      const newDistances: { [key: string]: number } = {};
      
      quests.forEach(quest => {
        if (quest.location) {
          // Haversine formula for distance calculation
          const R = 6371; // Earth's radius in km
          const dLat = (quest.location.lat - userLocation.lat) * Math.PI / 180;
          const dLon = (quest.location.lng - userLocation.lng) * Math.PI / 180;
          const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(quest.location.lat * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = R * c * 1000; // Convert to meters
          
          newDistances[quest.id] = distance;
        }
      });
      
      setDistances(newDistances);
    }
  }, [userLocation, quests]);

  const handleCheckIn = async (quest: Quest) => {
    if (!quest.location || !userLocation) return;
    
    setCheckingIn(quest.id);
    
    // Simulate check-in process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const distance = distances[quest.id];
    if (distance < 500) { // Within 500 meters
      onLocationReached(quest.id);
    } else {
      alert(`You need to be within 500 meters of ${quest.location.name} to check in. Current distance: ${Math.round(distance)}m`);
    }
    
    setCheckingIn(null);
  };

  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-50">
      {/* Header */}
      <div className="bg-white shadow-lg p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-purple-800">Sacred Location Quests</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Simplified Map View */}
        <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-200 relative overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path
                d="M80 50 Q120 30 160 40 Q200 35 240 50 Q280 60 320 80 L330 120 Q340 160 330 200 Q320 240 280 260 L240 270 Q200 275 160 270 Q120 265 80 250 Q40 220 30 180 Q25 140 40 100 Q50 70 80 50Z"
                fill="url(#mapGradient)"
                stroke="#059669"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* User Location */}
          {userLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  You are here
                </div>
              </div>
            </div>
          )}

          {/* Quest Locations */}
          {quests.map((quest, index) => {
            if (!quest.location) return null;
            
            const positions = [
              { x: 25, y: 45 },
              { x: 65, y: 75 },
              { x: 35, y: 55 },
              { x: 50, y: 85 }
            ];
            const position = positions[index] || { x: 50, y: 50 };
            const distance = distances[quest.id];
            const isNear = distance && distance < 500;
            
            return (
              <div
                key={quest.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
                onClick={() => setSelectedQuest(quest)}
              >
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg ${
                    isNear ? 'bg-green-500 animate-bounce' : 'bg-purple-500'
                  }`}>
                    <MapPin className="w-4 h-4 text-white m-auto mt-1" />
                  </div>
                  {distance && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {formatDistance(distance)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quest List */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {quests.map((quest) => {
            const distance = distances[quest.id];
            const isNear = distance && distance < 500;
            
            return (
              <div
                key={quest.id}
                className={`bg-white rounded-lg p-4 shadow-md border-2 transition-all cursor-pointer ${
                  selectedQuest?.id === quest.id ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                } ${isNear ? 'ring-2 ring-green-400' : ''}`}
                onClick={() => setSelectedQuest(quest)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className={`w-5 h-5 ${isNear ? 'text-green-500' : 'text-purple-500'}`} />
                      <h3 className="font-bold text-gray-800">{quest.title}</h3>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {quest.reward} blessings
                      </span>
                    </div>
                    
                    {quest.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Navigation className="w-4 h-4" />
                        <span>{quest.location.name}</span>
                        {distance && (
                          <span className={`font-medium ${isNear ? 'text-green-600' : 'text-gray-500'}`}>
                            • {formatDistance(distance)} away
                          </span>
                        )}
                      </div>
                    )}
                    
                    {isNear && (
                      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>You're close enough to check in!</span>
                      </div>
                    )}
                  </div>
                  
                  {isNear && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckIn(quest);
                      }}
                      disabled={checkingIn === quest.id}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {checkingIn === quest.id ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Checking in...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Check In</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestMap;
