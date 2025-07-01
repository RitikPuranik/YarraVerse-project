import { Card, CardContent } from './Card';
import { Button } from './Button';
import { MapPin, Calendar, Users } from 'lucide-react';

export interface Temple{
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

interface TempleCardProps {
  temple: Temple;
  onClick: () => void;
}

export default function TempleCard({ temple, onClick }: TempleCardProps) {
  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={temple.image} 
          alt={temple.name} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          360°
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {temple.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{temple.location}, {temple.country}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">Built: {temple.built}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {temple.description}
        </p>
        
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-3 transition-all duration-300"
        >
          Begin Virtual Pilgrimage
        </Button>
      </CardContent>
    </Card>
  );
}
