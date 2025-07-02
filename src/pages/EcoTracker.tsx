import { Camera, QrCode, Trophy, Leaf, Award, MapPin } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Badge } from "../components/Badge";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import CameraComponent from "../components/Camera";
import YatraMap from "../components/YatraMap.tsx";

const EcoTracker = () => {
  const [stats, setStats] = useState({
    karma_points: 0,
    eco_badges: 0,
    yatras_completed: 0,
  });
  const [cameraOpen, setCameraOpen] = useState(false);
 const [cameraMode, setCameraMode] = useState<"photo" | "qr">("photo");
  const [mapOpen, setMapOpen] = useState(false);
  const { toast } = useToast();

  const handleCaptureNow = () => {
    setCameraMode("photo");
    setCameraOpen(true);
  };

  const handleScanQR = () => {
    setCameraMode("qr");
    setCameraOpen(true);
  };

  const handlePhotoCapture = (imageData) => {
    setStats((prev) => ({ ...prev, karma_points: prev.karma_points + 50 }));
    toast({
      title: "Great job!",
      description: "You earned 50 karma points for photo capture!",
    });
  };

  const handleQRCapture = (imageData) => {
    setStats((prev) => ({
      ...prev,
      karma_points: prev.karma_points + 30,
      eco_badges: prev.eco_badges + 1,
    }));
    toast({
      title: "Great job!",
      description: "You earned 30 karma points and 1 eco badge for QR scan!",
    });
  };

  const handleViewRankings = () => {
    toast({
      title: "Rankings",
      description: "Rankings feature coming soon!",
    });
  };

  const handleCompleteYatra = (location) => {
    setStats((prev) => ({
      ...prev,
      karma_points: prev.karma_points + 100,
      yatras_completed: prev.yatras_completed + 1,
    }));
    toast({
      title: "Yatra Completed!",
      description: `You earned 100 karma points for visiting ${location.name}!`,
    });
  };

  const ecoTips = [
    "Carry a reusable bottle during yatras.",
    "Use digital prasad/token instead of plastic.",
    "Offset travel emissions with tree donations.",
    "Opt for walking/biking in temple areas.",
    "Support local eco‑friendly vendors.",
  ];

  return (
    <>
      <section className="min-h-screen px-4 py-16 bg-[#f0fff4]">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="text-green-600" size={28} />
            <h1 className="text-3xl font-bold text-green-800">Your Green Impact</h1>
          </div>
          <p className="text-base text-gray-600">
            Track your eco‑friendly actions and spiritual karma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          <Card className="bg-white rounded-xl shadow-md">
            <CardContent className="px-4 py-5 text-center">
              <Award className="text-green-600 mx-auto mb-1" size={24} />
              <p className="text-3xl font-bold text-green-700">{stats.karma_points}</p>
              <p className="text-xs tracking-wide text-gray-500 mt-1">KARMA POINTS</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="text-green-600 mr-2" size={24} />
                <p className="text-3xl font-bold text-green-700">{stats.eco_badges}</p>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Eco Badges</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl shadow-md">
            <CardContent className="px-4 py-5 text-center">
              <MapPin className="text-green-600 mx-auto mb-1" size={24} />
              <p className="text-3xl font-bold text-green-700">{stats.yatras_completed}</p>
              <p className="text-xs tracking-wide text-gray-500 mt-1">YATRAS COMPLETED</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={handleCaptureNow}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 text-sm font-medium flex items-center gap-2 rounded-md shadow-sm"
          >
            <Camera size={18} /> Capture Now (+50 points)
          </Button>

          <Button
            onClick={handleScanQR}
            className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 px-5 py-2.5 text-sm font-medium flex items-center gap-2 rounded-md"
          >
            <QrCode size={18} /> Scan QR Code (+30 points)
          </Button>

          <Button
            onClick={() => setMapOpen(true)}
            className="bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 px-5 py-2.5 text-sm font-medium flex items-center gap-2 rounded-md"
          >
            <MapPin size={18} /> Complete Yatra (+100 points)
          </Button>

          <Button
            onClick={handleViewRankings}
            className="bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 px-5 py-2.5 text-sm font-medium flex items-center gap-2 rounded-md"
          >
            <Trophy size={18} /> View Rankings
          </Button>
        </div>

        <Card className="max-w-3xl mx-auto bg-white shadow-md rounded-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-green-600" size={22} />
              <h2 className="text-xl font-semibold text-green-700">Eco Tips</h2>
            </div>
            <ul className="space-y-3">
              {ecoTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span className="text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="max-w-xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl shadow-md">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-green-700 mb-2">Next Level Progress</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.karma_points % 500) / 5}%` }}
                />
              </div>
              <p className="text-xs text-green-600 mt-1">
                {500 - (stats.karma_points % 500)} points to next level
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CameraComponent
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={cameraMode === "photo" ? handlePhotoCapture : handleQRCapture}
        mode={cameraMode}
      />

      <YatraMap
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        onCompleteYatra={handleCompleteYatra}
      />
    </>
  );
};

export default EcoTracker;
