import React, { useState, useEffect } from "react";
import { Heart, Sprout, Bell, Star } from "lucide-react";
import StatCard from "../components/StatCard.tsx";
import MeditationTimer from "../components/MeditationTimer";
import ReflectionSection from "../components/ReflectionSection.tsx";
import GuidedPractices from "../components/GuidedPractices.tsx";

const SpiritualDashboard = () => {
  const [stats, setStats] = useState([
    { icon: Heart, label: "Mindfulness", value: 82, target: 90, color: "text-rose-500" },
    { icon: Sprout, label: "Compassion", value: 76, target: 85, color: "text-green-500" },
    { icon: Bell, label: "Meditation", value: 94, target: 95, color: "text-blue-500" },
    { icon: Star, label: "Spiritual Growth", value: 88, target: 100, color: "text-yellow-500" },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for real-time feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate real-time stat updates (you can connect this to actual data)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: Math.min(stat.target, stat.value + Math.random() * 0.5)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {greeting()}, Seeker
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Track your inner journey and reflect on your spiritual progress
          </p>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Meditation Timer */}
          <MeditationTimer />
          
          {/* Daily Reflection */}
          <ReflectionSection />
        </div>

        {/* Guided Practices */}
        <GuidedPractices />
      </div>
    </div>
  );
};

export default SpiritualDashboard;