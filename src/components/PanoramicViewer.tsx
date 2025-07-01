import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PanoramaSphere from './PanoramaSphere';
import PanoramaControls from './PanoramaControls';
import TempleInfoPanel from './TempleInfoPanel';
import LoadingFallback from "./LoadingFallback.jsx";

interface Temple {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  description: string;
  built: string;
  significance: string;
  panorama360: string;
}

interface PanoramicViewerProps {
  temple: Temple;
  onBack: () => void;
}

export default function PanoramicViewer({ temple, onBack }: PanoramicViewerProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Three.js Canvas for 360° View */}
      <Canvas
        camera={{ 
          position: [0, 0, 0.1], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <PanoramaSphere imageUrl={temple.panorama360} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            rotateSpeed={-0.5}
            minDistance={0.1}
            maxDistance={10}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Loading Screen */}
      <Suspense fallback={<LoadingFallback />}>
        <div />
      </Suspense>

      {/* Controls */}
      <PanoramaControls 
        onBack={onBack}
        onToggleInfo={() => setShowInfo(!showInfo)}
        showInfo={showInfo}
      />

      {/* Temple Information Panel */}
      <TempleInfoPanel temple={temple} isVisible={showInfo} />
    </div>
  );
}