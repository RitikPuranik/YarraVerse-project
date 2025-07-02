import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { Button } from "../Button";
import { Progress } from "../Progress";
import { Play, Pause, RotateCcw, ArrowLeft } from "lucide-react";

interface PracticeSessionProps {
  practice: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    duration: string;
    color: string;
    bgColor: string;
    instructions: string[];
  };
  onBack: () => void;
}

const PracticeSession: React.FC<PracticeSessionProps> = ({ practice, onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const Icon = practice.icon;
  
  // Parse duration to seconds
  useEffect(() => {
    const minutes = parseInt(practice.duration.split(' ')[0]);
    const seconds = minutes * 60;
    setTimeRemaining(seconds);
    setTotalTime(seconds);
  }, [practice.duration]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  // Auto-advance steps based on time
  useEffect(() => {
    const stepDuration = totalTime / practice.instructions.length;
    const elapsedTime = totalTime - timeRemaining;
    const newStep = Math.floor(elapsedTime / stepDuration);
    
    if (newStep < practice.instructions.length && newStep !== currentStep) {
      setCurrentStep(newStep);
    }
  }, [timeRemaining, totalTime, practice.instructions.length, currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


  const handleStart = () => setIsActive(!isActive);
  const handleReset = () => {
    setIsActive(false);
    setTimeRemaining(totalTime);
    setCurrentStep(0);
  };

  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Practices
        </Button>

        <Card className={`${practice.bgColor} border-0 shadow-lg`}>
          <CardHeader className="text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${practice.color} flex items-center justify-center`}>
              <Icon size={32} className="text-white" />
            </div>
            <CardTitle className="text-3xl text-gray-800 mb-2">
              {practice.title}
            </CardTitle>
            <p className="text-gray-600">{practice.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-4">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={progress} className="h-3 mb-6" />
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={handleStart}
                size="lg"
                className={`bg-gradient-to-r ${practice.color} hover:opacity-90 text-white`}
              >
                {isActive ? <Pause size={20} /> : <Play size={20} />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
              >
                <RotateCcw size={20} />
                Reset
              </Button>
            </div>

            {/* Current Instruction */}
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Step {currentStep + 1} of {practice.instructions.length}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {practice.instructions[currentStep]}
                </p>
              </CardContent>
            </Card>

            {/* All Instructions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Practice Steps:
              </h3>
              {practice.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg transition-all ${
                    index === currentStep
                      ? 'bg-white border-2 border-indigo-300 shadow-md'
                      : index < currentStep
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className="font-medium">Step {index + 1}:</span> {instruction}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeSession;