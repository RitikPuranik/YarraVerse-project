import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { useToast } from "../hooks/useToast";

const ReflectionSection = () => {
  const [reflection, setReflection] = useState("");
  const [dailyQuote] = useState(
    "Daily practice brings clarity. Keep your heart open, your mind still, and your spirit grateful."
  );
  const { toast } = useToast();

  const handleSaveReflection = () => {
    if (reflection.trim()) {
      toast({
        title: "Reflection Saved",
        description: "Your daily reflection has been recorded.",
      });
      setReflection("");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-purple-800">
          Daily Reflection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
          <p className="text-purple-700 italic text-center font-medium">
            "{dailyQuote}"
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-purple-800">
            How are you feeling today?
          </h3>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your thoughts, insights, or gratitude from today..."
            className="w-full h-32 p-3 border border-purple-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70 text-black"
            />
          <Button
            onClick={handleSaveReflection}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!reflection.trim()}
          >
            Save Reflection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReflectionSection;