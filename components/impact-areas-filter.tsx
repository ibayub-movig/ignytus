import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImpactAreasFilterProps {
  companies: any[]; // Changed from Company[] to any[] as Airtable is no longer used
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
  onClearAll: () => void;
  availableAreas?: string[];
}

export function ImpactAreasFilter({ companies, selectedAreas, setSelectedAreas, onClearAll, availableAreas }: ImpactAreasFilterProps) {
  // Use provided availableAreas or fall back to computing from companies
  const allImpactAreas = availableAreas || (() => {
    const uniqueAreas = new Set(companies.flatMap(company => company.impactAreas));
    return Array.from(uniqueAreas).sort();
  })();

  const toggleArea = (area: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {allImpactAreas.map(area => (
          <Button
            key={area}
            size="sm"
            variant={selectedAreas.includes(area) ? "default" : "outline"}
            onClick={(e) => toggleArea(area, e)}
            className="rounded-full px-3 py-1 text-xs"
          >
            {area}
          </Button>
        ))}
      </div>
    </div>
  );
} 