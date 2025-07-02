import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "../components/Progress";

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-indigo-800">
          Meditation Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="text-6xl font-mono font-bold text-indigo-700">
          {formatTime(timeLeft)}
        </div>
        
        <Progress value={progress} className="h-3 bg-indigo-200" />
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={toggle}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
          >
            {isActive ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            <RotateCcw className="mr-2" size={20} />
            Reset
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          {[300, 600, 900, 1800].map((time) => (
            <Button
              key={time}
              variant="ghost"
              size="sm"
              onClick={() => {
                setDuration(time);
                setTimeLeft(time);
                setIsActive(false);
              }}
              className="text-indigo-600 hover:bg-indigo-100"
            >
              {time / 60}min
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationTimer;