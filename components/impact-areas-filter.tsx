"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Startup } from "@/lib/airtable";

interface ImpactAreasFilterProps {
  startups: Startup[];
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
  onClearAll: () => void;
}

export function ImpactAreasFilter({ startups, selectedAreas, setSelectedAreas, onClearAll }: ImpactAreasFilterProps) {
  // Get unique impact areas from all startups
  const allImpactAreas = Array.from(
    new Set(startups.flatMap(startup => startup.impactAreas))
  ).sort();

  const toggleArea = (area: string) => {
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    
    setSelectedAreas(newAreas);
    
    // Create the new query string
    const searchParams = new URLSearchParams(window.location.search);
    
    if (newAreas.length > 0) {
      searchParams.set('areas', newAreas.join(','));
      window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    } else {
      // If no areas selected, remove the query parameter
      window.history.replaceState({}, '', window.location.pathname);
      searchParams.delete('areas');
    }
    
    // Use the pathname with search params for router.push
    const newPath = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  };

  const clearFilters = () => {
    setSelectedAreas([]);
    
    // Use just the pathname when clearing filters
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {allImpactAreas.map((area) => (
          <Badge
            key={area}
            variant={selectedAreas.includes(area) ? "default" : "secondary"}
            className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
            onClick={() => toggleArea(area)}
          >
            {area}
            {selectedAreas.includes(area) && (
              <X className="ml-1 h-3 w-3" />
            )}
          </Badge>
        ))}
      </div>
      
      {selectedAreas.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all filters
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}