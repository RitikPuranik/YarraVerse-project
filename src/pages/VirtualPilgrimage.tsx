import { useState } from "react";
import PanoramicViewer from "../components/PanoramicViewer.tsx";
import TempleCard from "../components/TempleCard.tsx";
import { templeData } from "../components/templeData.ts";


export default function VirtualPilgrimage() {
  const [selected, setSelected] = useState<typeof templeData[number] | null>(
    null
  );

  return selected ? (
    <PanoramicViewer temple={selected} onBack={() => setSelected(null)} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Sacred Destination
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templeData.map((t) => (
          <TempleCard key={t.id} temple={t} onClick={() => setSelected(t)} />
        ))}
      </div>
    </div>
  );
}