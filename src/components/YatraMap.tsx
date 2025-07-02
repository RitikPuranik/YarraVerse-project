import { useRef, useEffect, useState } from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';

interface YatraMapProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteYatra: (location: { lat: number; lng: number; name: string }) => void;
}

const YatraMap = ({ isOpen, onClose, onCompleteYatra }: YatraMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);

  // Famous spiritual places in India
  const spiritualPlaces = [
    { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
    { name: "Haridwar", lat: 29.9457, lng: 78.1642 },
    { name: "Rishikesh", lat: 30.0869, lng: 78.2676 },
    { name: "Vrindavan", lat: 27.5819, lng: 77.7000 },
    { name: "Tirupati", lat: 13.6288, lng: 79.4192 },
    { name: "Dwarka", lat: 22.2394, lng: 68.9678 },
    { name: "Puri", lat: 19.8135, lng: 85.8312 },
    { name: "Amritsar", lat: 31.6340, lng: 74.8723 },
  ];

  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [isOpen]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCompleteYatra = () => {
    if (selectedLocation) {
      onCompleteYatra(selectedLocation);
      onClose();
    }
  };

  if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
    <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Complete Your Yatra</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 flex items-start gap-3">
          <Navigation className="text-blue-500 mt-1" size={20} />
          <div>
            <p className="font-medium text-sm text-blue-800">Select a Spiritual Destination</p>
            <p className="text-sm text-gray-600">
              Choose from these sacred places to complete your virtual yatra
            </p>
          </div>
        </div>

        {/* Place selection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {spiritualPlaces.map((place) => {
            const distance = userLocation
              ? calculateDistance(userLocation.lat, userLocation.lng, place.lat, place.lng)
              : null;

            const isSelected = selectedLocation?.name === place.name;

            return (
              <div
                key={place.name}
                onClick={() => setSelectedLocation(place)}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  isSelected
                    ? "ring-2 ring-green-500 bg-green-50 border-green-300"
                    : "hover:border-gray-300"
                }`}
              >
                <MapPin className="text-green-600" size={18} />
                <div>
                  <h4 className="font-medium text-gray-800">{place.name}</h4>
                  {distance && (
                    <p className="text-xs text-gray-500">{Math.round(distance)} km away</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Location Info */}
        {userLocation && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-6 flex items-center gap-2 text-sm text-gray-700">
            <Navigation className="text-blue-500" size={16} />
            Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompleteYatra}
            disabled={!selectedLocation}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Complete Yatra (+100 points)
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);
};

export default YatraMap;