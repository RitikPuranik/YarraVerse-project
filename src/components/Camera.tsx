import { useRef, useEffect, useState } from 'react';
import { X, Camera as CameraIcon, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';

interface CameraProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
  mode: 'photo' | 'qr';
}

const Camera = ({ isOpen, onClose, onCapture, mode }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    if (isOpen) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      onCapture(imageData);
      onClose();
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => (prev === "user" ? "environment" : "user"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-4 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">
            {mode === 'photo' ? 'Capture Photo' : 'Scan QR Code'}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Video + QR Border */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover rounded-lg bg-black"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* QR scan frame */}
          {mode === 'qr' && (
            <div className="absolute inset-4 rounded-lg border-4 border-green-500 pointer-events-none">
              {/* Corner borders */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-green-500" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-green-500" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-green-500" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-green-500" />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-3">
          <button
            onClick={switchCamera}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
          <button
            onClick={capturePhoto}
            className="p-4 rounded-full bg-green-600 hover:bg-green-700 transition"
          >
            <CameraIcon size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Camera;