"use client";

import { useState } from 'react';
import type { Route } from 'next';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImpactAreasFilter } from "@/components/impact-areas-filter";
import type { Startup } from "@/lib/airtable";

interface FilteredStartupsProps {
  startups: Startup[];
  initialAreas?: string[];
}

export function FilteredStartups({ startups, initialAreas = [] }: FilteredStartupsProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(initialAreas);
  const [selectedOpportunityType, setSelectedOpportunityType] = useState<string | null>(null);

  const clearAllFilters = () => {
    setSelectedAreas([]);
    setSelectedOpportunityType(null);
  };

  const filteredStartups = startups.filter(startup => {
    const matchesAreas = selectedAreas.length === 0 || 
      startup.impactAreas.some(area => selectedAreas.includes(area));
    
    const matchesOpportunityType = !selectedOpportunityType || 
      startup.opportunityType === selectedOpportunityType;
    
    return matchesAreas && matchesOpportunityType;
  });

  return (
    <>
      <div className="mb-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Impact Areas</h3>
            <ImpactAreasFilter
              startups={startups}
              selectedAreas={selectedAreas}
              setSelectedAreas={setSelectedAreas}
              onClearAll={clearAllFilters}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Opportunity Type</h3>
            <div className="flex gap-2">
              <Badge
                variant={selectedOpportunityType === 'Actively Hiring' ? 'default' : 'secondary'}
                className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                onClick={() => setSelectedOpportunityType(
                  selectedOpportunityType === 'Actively Hiring' ? null : 'Actively Hiring'
                )}
              >
                Actively Hiring
              </Badge>
              <Badge
                variant={selectedOpportunityType === 'Likely Looking' ? 'default' : 'secondary'}
                className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                onClick={() => setSelectedOpportunityType(
                  selectedOpportunityType === 'Likely Looking' ? null : 'Likely Looking'
                )}
              >
                Likely Looking
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {filteredStartups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Sign up for full access to all startups and opportunities</p>
          <Button asChild>
            <Link href="/early-access">Get Early Access</Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <Link 
              key={startup.id} 
              href={startup.companyUrl as Route} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex"
            >
              <Card className="overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] flex flex-col w-full">
                <div className="p-6 flex flex-col gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-cover bg-center" 
                    style={{ backgroundImage: `url(${startup.imageUrl})` }}
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">{startup.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      {startup.location}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {startup.impactAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {startup.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(startup.tags || []).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        startup.opportunityType === 'Actively Hiring' 
                          ? 'bg-primary animate-pulse' 
                          : 'bg-muted-foreground'
                      }`} />
                      <span className={`text-sm font-semibold ${
                        startup.opportunityType === 'Actively Hiring'
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}>
                        {startup.opportunityType}
                      </span>
                    </div>
                    
                    {startup.opportunities.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {startup.opportunities.map((opportunity) => (
                            <Badge 
                              key={opportunity} 
                              variant={startup.opportunityType === 'Actively Hiring' ? 'default' : 'secondary'}
                              className="px-3 py-1"
                            >
                              {opportunity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}