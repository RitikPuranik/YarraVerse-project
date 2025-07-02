import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import PracticeSession from "../components/practices/PracticeSession";
import { practicesData } from "../data/practiceData.ts";

const GuidedPractices = () => {
  const [selectedPractice, setSelectedPractice] = useState<number | null>(null);

  if (selectedPractice !== null) {
    return (
      <PracticeSession
        practice={practicesData[selectedPractice]}
        onBack={() => setSelectedPractice(null)}
      />
    );
  }

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-indigo-800 mb-4">
          Guided Practices
        </CardTitle>
        <p className="text-center text-gray-600">
          Choose a practice to deepen your spiritual journey
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practicesData.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <div
                key={index}
                className={`${practice.bgColor} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${practice.color} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {practice.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {practice.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {practice.duration}
                </p>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${practice.color} hover:opacity-90 text-white border-0`}
                  onClick={() => setSelectedPractice(index)}
                >
                  Start Practice
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedPractices;