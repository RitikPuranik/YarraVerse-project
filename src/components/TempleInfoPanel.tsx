import { Card, CardContent } from '../components/Card';
import { Star } from 'lucide-react';

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

interface TempleInfoPanelProps {
  temple: Temple;
  isVisible: boolean;
}

export default function TempleInfoPanel({ temple, isVisible }: TempleInfoPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute right-4 top-20 bottom-4 w-80 z-20">
      <Card className="h-full bg-black/80 text-white border-white/20 backdrop-blur-md">
        <CardContent className="p-6 h-full overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-orange-400 mb-2">
                {temple.name}
              </h2>
              <div className="flex items-center text-gray-300 mb-2">
                <span>{temple.location}, {temple.country}</span>
              </div>
              <div className="flex items-center text-gray-300 mb-4">
                <span>Built: {temple.built}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Description</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {temple.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Significance</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {temple.significance}
              </p>
            </div>

            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm">Sacred Heritage Site</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
