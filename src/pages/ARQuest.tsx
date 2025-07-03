import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Medal, X, CheckCircle, Loader } from 'lucide-react';
import ARCamera from '../components/ARCamera.tsx';
import QuestMap from '../components/QuestMap.tsx';
import BlessingsTracker from '../components/BlessingsTracker.tsx';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'scan' | 'location' | 'meditation';
  target?: string;
  reward: number;
  completed: boolean;
  location?: { lat: number; lng: number; name: string };
}

const ARQuest = () => {
  const [activeMode, setActiveMode] = useState<'menu' | 'camera' | 'map' | 'tracker'>('menu');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [blessings, setBlessings] = useState(0);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [quests] = useState<Quest[]>([
    {
      id: 'scan-om',
      title: 'Sacred Om Symbol',
      description: 'Find and scan the Om symbol to receive divine blessings',
      type: 'scan',
      target: 'om-symbol',
      reward: 10,
      completed: false
    },
    {
      id: 'scan-temple',
      title: 'Temple Recognition',
      description: 'Identify a temple structure through your camera',
      type: 'scan',
      target: 'temple',
      reward: 25,
      completed: false
    },
    {
      id: 'location-ganga',
      title: 'Visit Sacred Ghat',
      description: 'Check-in at a sacred ghat location',
      type: 'location',
      reward: 50,
      completed: false,
      location: { lat: 25.3176, lng: 82.9739, name: 'Dashashwamedh Ghat' }
    },
    {
      id: 'meditation-5min',
      title: '5-Minute Meditation',
      description: 'Complete a 5-minute guided meditation session',
      type: 'meditation',
      reward: 15,
      completed: false
    }
  ]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const completeQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !completedQuests.includes(questId)) {
      setCompletedQuests(prev => [...prev, questId]);
      setBlessings(prev => prev + quest.reward);
      
      // Show completion notification
      setTimeout(() => {
        alert(`Quest completed! You earned ${quest.reward} blessings!`);
      }, 500);
    }
  };

  const handleQuestAction = async (quest: Quest) => {
    setLoading(true);
    
    if (quest.type === 'scan') {
      setActiveMode('camera');
    } else if (quest.type === 'location') {
      if (userLocation && quest.location) {
        // Check if user is within 100m of the location (simplified)
        const distance = Math.sqrt(
          Math.pow(userLocation.lat - quest.location.lat, 2) + 
          Math.pow(userLocation.lng - quest.location.lng, 2)
        ) * 111000; // Rough conversion to meters
        
        if (distance < 100) {
          completeQuest(quest.id);
        } else {
          setActiveMode('map');
        }
      }
    } else if (quest.type === 'meditation') {
      // Start meditation timer
      let countdown = 5 * 60; // 5 minutes
      const interval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(interval);
          completeQuest(quest.id);
        }
      }, 1000);
    }
    
    setLoading(false);
  };

  if (activeMode === 'camera') {
    return (
      <ARCamera
        onBack={() => setActiveMode('menu')}
        onQuestComplete={completeQuest}
        activeQuests={quests.filter(q => q.type === 'scan' && !completedQuests.includes(q.id))}
      />
    );
  }

  if (activeMode === 'map') {
    return (
      <QuestMap
        onBack={() => setActiveMode('menu')}
        userLocation={userLocation}
        quests={quests.filter(q => q.type === 'location')}
        onLocationReached={completeQuest}
      />
    );
  }

  if (activeMode === 'tracker') {
    return (
      <BlessingsTracker
        onBack={() => setActiveMode('menu')}
        blessings={blessings}
        completedQuests={completedQuests}
        allQuests={quests}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">AR Quest</h1>
          <p className="text-xl text-gray-600 mb-6">
            Embark on sacred missions and unlock blessings through reality
          </p>
          
          {/* Blessings Counter */}
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
            <Medal className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-purple-800">{blessings} Blessings</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setActiveMode('camera')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-purple-700 mb-2">AR Scanner</h3>
            <p className="text-sm text-gray-600">Use camera to scan sacred symbols and temples</p>
          </button>

          <button
            onClick={() => setActiveMode('map')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-purple-700 mb-2">Sacred Locations</h3>
            <p className="text-sm text-gray-600">Visit real temples and sacred sites</p>
          </button>

          <button
            onClick={() => setActiveMode('tracker')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Medal className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-purple-700 mb-2">Blessings Tracker</h3>
            <p className="text-sm text-gray-600">View your spiritual progress and achievements</p>
          </button>
        </div>

        {/* Active Quests */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Active Quests</h2>
          <div className="space-y-4">
            {quests.map((quest) => {
              const isCompleted = completedQuests.includes(quest.id);
              return (
                <div
                  key={quest.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCompleted
                      ? 'border-green-200 bg-green-50'
                      : 'border-purple-200 bg-purple-50 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : quest.type === 'scan' ? (
                          <Camera className="w-6 h-6 text-purple-500" />
                        ) : quest.type === 'location' ? (
                          <MapPin className="w-6 h-6 text-purple-500" />
                        ) : (
                          <Medal className="w-6 h-6 text-purple-500" />
                        )}
                        <h3 className={`font-bold ${isCompleted ? 'text-green-700' : 'text-purple-700'}`}>
                          {quest.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isCompleted ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'
                        }`}>
                          {quest.reward} blessings
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{quest.description}</p>
                    </div>
                    
                    {!isCompleted && (
                      <button
                        onClick={() => handleQuestAction(quest)}
                        disabled={loading}
                        className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading && <Loader className="w-4 h-4 animate-spin" />}
                        Start Quest
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARQuest;