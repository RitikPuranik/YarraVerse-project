import React from 'react';
import { Button } from '../components/Button';
import { ArrowLeft, Info } from 'lucide-react';

interface PanoramaControlsProps {
  onBack: () => void;
  onToggleInfo: () => void;
  showInfo: boolean;
}

export default function PanoramaControls({ onBack, onToggleInfo, showInfo }: PanoramaControlsProps) {
  return (
    <>
      {/* Navigation Controls */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={onBack}
          variant="secondary"
          size="sm"
          className="bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Temples
        </Button>
      </div>

      {/* Temple Info Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={onToggleInfo}
          variant="secondary"
          size="sm"
          className="bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm"
        >
          <Info className="w-4 h-4 mr-2" />
          {showInfo ? 'Hide Info' : 'Show Info'}
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm">
          <p>Drag to look around • Scroll to zoom • Experience the sacred space in 360°</p>
        </div>
      </div>
    </>
  );
}