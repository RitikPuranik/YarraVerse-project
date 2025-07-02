import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./Card";
import { Progress } from "./Progress";

interface StatCardProps {
  stat: {
    icon: React.ComponentType<any>;
    label: string;
    value: number;
    target: number;
    color: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { icon: Icon, label, value, target, color } = stat;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (value / target) * 100;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-md">
      <CardContent className="p-6 text-center">
        <div className={`text-4xl ${color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={40} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
        <div className="space-y-3">
          <p className="text-3xl font-bold text-gray-700">
            {Math.round(displayValue)}%
          </p>
          <Progress 
            value={percentage} 
            className="h-2 bg-gray-200"
          />
          <p className="text-sm text-gray-500">
            Target: {target}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;