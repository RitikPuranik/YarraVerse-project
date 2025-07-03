import React from 'react';
import { X, Medal, Star, Trophy, Gift, Zap } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  reward: number;
  type: string;
}

interface BlessingsTrackerProps {
  onBack: () => void;
  blessings: number;
  completedQuests: string[];
  allQuests: Quest[];
}

const BlessingsTracker: React.FC<BlessingsTrackerProps> = ({ 
  onBack, 
  blessings, 
  completedQuests, 
  allQuests 
}) => {
  const completedQuestData = allQuests.filter(quest => completedQuests.includes(quest.id));
  const totalPossibleBlessings = allQuests.reduce((sum, quest) => sum + quest.reward, 0);
  const progressPercent = totalPossibleBlessings > 0 ? (blessings / totalPossibleBlessings) * 100 : 0;

  // Achievement levels based on blessings
  const getAchievementLevel = (blessings: number) => {
    if (blessings >= 200) return { level: 'Divine Master', icon: Trophy, color: 'text-yellow-500' };
    if (blessings >= 100) return { level: 'Sacred Seeker', icon: Star, color: 'text-purple-500' };
    if (blessings >= 50) return { level: 'Blessed Pilgrim', icon: Medal, color: 'text-blue-500' };
    return { level: 'Spiritual Novice', icon: Gift, color: 'text-green-500' };
  };

  const achievement = getAchievementLevel(blessings);
  const AchievementIcon = achievement.icon;

  // Next milestone calculation
  const milestones = [50, 100, 200, 500];
  const nextMilestone = milestones.find(m => m > blessings) || milestones[milestones.length - 1];
  const blessingsToNext = nextMilestone - blessings;

  return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-purple-800">Spiritual Progress</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <div className=" p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Stats Card */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AchievementIcon className={`w-12 h-12 ${achievement.color}`} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{blessings} Blessings</h2>
              <p className="text-purple-200 text-lg">{achievement.level}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Spiritual Progress</span>
                <span>{Math.round(progressPercent)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Next Milestone */}
            {blessingsToNext > 0 && (
              <div className="text-center">
                <p className="text-purple-200">
                  {blessingsToNext} more blessings to reach {nextMilestone} milestone
                </p>
              </div>
            )}
          </div>

          {/* Achievement Badges */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'First Steps', requirement: 10, icon: Gift, achieved: blessings >= 10 },
                { name: 'Blessed Pilgrim', requirement: 50, icon: Medal, achieved: blessings >= 50 },
                { name: 'Sacred Seeker', requirement: 100, icon: Star, achieved: blessings >= 100 },
                { name: 'Divine Master', requirement: 200, icon: Trophy, achieved: blessings >= 200 },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    badge.achieved
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${
                    badge.achieved ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <h4 className={`font-medium text-sm ${
                    badge.achieved ? 'text-purple-800' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {badge.requirement} blessings
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Quests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Completed Sacred Quests</h3>
            {completedQuestData.length > 0 ? (
              <div className="space-y-3">
                {completedQuestData.map((quest) => (
                  <div
                    key={quest.id}
                    className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        {quest.type === 'scan' ? (
                          <Zap className="w-5 h-5 text-white" />
                        ) : quest.type === 'location' ? (
                          <Medal className="w-5 h-5 text-white" />
                        ) : (
                          <Star className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{quest.title}</h4>
                        <p className="text-sm text-gray-500 capitalize">{quest.type} quest</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600">
                        <Medal className="w-4 h-4" />
                        <span className="font-bold">+{quest.reward}</span>
                      </div>
                      <p className="text-xs text-gray-500">Blessings earned</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No quests completed yet</p>
                <p className="text-sm">Start your spiritual journey to earn blessings!</p>
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Medal className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">{completedQuests.length}</h4>
              <p className="text-gray-600">Quests Completed</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">{blessings}</h4>
              <p className="text-gray-600">Total Blessings</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800">{Math.round(progressPercent)}%</h4>
              <p className="text-gray-600">Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlessingsTracker;