import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import VirtualPilgrimage from "./pages/VirtualPilgrimage";
import EcoTracker from "./pages/EcoTracker.tsx";
import SmartAssistant from "./pages/SmartAssistant";
import ARQuest from "./pages/ARQuest";
import SpiritualDashboard from "./pages/SpiritualDashboard";
import NotFound from "./pages/NotFound";
import AnimatedIntro from "./components/AnimatedIntro";
import OpeningScreen from "./components/OpeningScreen";

const App = () => {
  const [step, setStep] = useState(0); // 0 = AnimatedIntro, 1 = OpeningScreen, 2 = Main App

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),   // Show OpeningScreen after 1.5s
      setTimeout(() => setStep(2), 18500),  // Show Main App after 18.5s
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`bg-black text-white w-full overflow-x-hidden ${
        step < 2 ? "h-screen overflow-hidden" : "min-h-screen overflow-auto"
      }`}
    >
      {/* Step 0: Show AnimatedIntro */}
      {step === 0 && <AnimatedIntro />}

      {/* Step 1: Show OpeningScreen */}
      {step === 1 && <OpeningScreen />}

      {/* Step 2: Show full app with routing */}
      {step === 2 && (
        <div className="opacity-100 transition-opacity duration-1000 ease-in-out min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/virtual-pilgrimage" element={<VirtualPilgrimage />} />
                <Route path="/eco-tracker" element={<EcoTracker />} />
                <Route path="/smart-assistant" element={<SmartAssistant />} />
                <Route path="/ar-quest" element={<ARQuest />} />
                <Route path="/spiritual-dashboard" element={<SpiritualDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
};

export default App;
