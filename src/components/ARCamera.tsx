import React, { useRef, useEffect, useState } from 'react';
import { X, Zap, Target, CheckCircle } from 'lucide-react';

interface ARCameraProps {
  onBack: () => void;
  onQuestComplete: (questId: string) => void;
  activeQuests: Array<{
    id: string;
    title: string;
    target?: string;
    reward: number;
  }>;
}

const ARCamera: React.FC<ARCameraProps> = ({ onBack, onQuestComplete, activeQuests }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for AR scanning. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const simulateARScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate detection results (in real app, this would use computer vision)
    const detectionChance = Math.random();
  
let detected: string | null = null;

if (detectionChance > 0.7) {
  const possibleDetections = ['om-symbol', 'temple', 'lotus', 'sacred-text'];
  detected = possibleDetections[Math.floor(Math.random() * possibleDetections.length)];
}

    
    setIsScanning(false);
    
    if (detected) {
      setScanResult(detected);
      
      // Check if this completes any quest
      const completedQuest = activeQuests.find(quest => quest.target === detected);
      if (completedQuest) {
        setTimeout(() => {
          onQuestComplete(completedQuest.id);
        }, 1500);
      }
    } else {
      setScanResult('no-detection');
      setTimeout(() => setScanResult(null), 2000);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Add AR overlay effects
        context.strokeStyle = '#8B5CF6';
        context.lineWidth = 3;
        context.setLineDash([10, 10]);
        
        // Draw scanning grid
        for (let i = 0; i < canvas.width; i += 50) {
          context.beginPath();
          context.moveTo(i, 0);
          context.lineTo(i, canvas.height);
          context.stroke();
        }
        
        for (let i = 0; i < canvas.height; i += 50) {
          context.beginPath();
          context.moveTo(0, i);
          context.lineTo(canvas.width, i);
          context.stroke();
        }
      }
    }
  };

  useEffect(() => {
    if (cameraActive) {
      const interval = setInterval(captureFrame, 100);
      return () => clearInterval(interval);
    }
  }, [cameraActive]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera View */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* AR Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />
        
        {/* AR Interface Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanning Reticle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-48 h-48 border-4 border-purple-400 rounded-lg ${isScanning ? 'animate-pulse' : ''}`}>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-400"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-400"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-400"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-400"></div>
              
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-spin" />
                      <span>Scanning...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Scan Result */}
          {scanResult && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32">
              <div className={`px-6 py-4 rounded-lg ${
                scanResult === 'no-detection' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                <div className="flex items-center gap-2">
                  {scanResult === 'no-detection' ? (
                    <Target className="w-5 h-5" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {scanResult === 'no-detection' 
                      ? 'No sacred symbols detected' 
                      : `Detected: ${scanResult.replace('-', ' ').toUpperCase()}`
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Top UI Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-black/50 text-white px-4 py-2 rounded-full">
              <span className="text-sm font-medium">AR Scanner Active</span>
            </div>
          </div>
        </div>
        
        {/* Active Quests Display */}
        <div className="absolute top-20 left-4 right-4 pointer-events-none">
          {activeQuests.map((quest) => (
            <div key={quest.id} className="bg-purple-600/90 text-white p-3 rounded-lg mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">{quest.title}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">
                  {quest.reward} blessings
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-auto">
          <div className="flex justify-center">
            <button
              onClick={simulateARScan}
              disabled={isScanning}
              className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-3"
            >
              <Zap className={`w-6 h-6 ${isScanning ? 'animate-spin' : ''}`} />
              <span className="text-lg font-medium">
                {isScanning ? 'Scanning...' : 'Scan for Sacred Symbols'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARCamera;