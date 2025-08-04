"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Route } from 'next';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilteredCompaniesProps {
  companies: any[]; // Changed from Company[] to any[] as Airtable is no longer used
  initialAreas?: string[];
  searchQuery?: string;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Helper function to sort company sizes from small to large
const sortCompanySizes = (sizes: string[]) => {
  const sizeOrder = [
    '2-10',
    '11-50', 
    '51-200',
    '201-500',
    '501-1K',
    '1K-5K',
    '5K+'
  ];
  
  return sizes.sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a);
    const bIndex = sizeOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
};

export function FilteredCompanies({ companies, initialAreas = [], searchQuery = "" }: FilteredCompaniesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current URL parameters
  const currentImpact = searchParams.get('impact') || '';
  const currentHiring = searchParams.get('hiring') || '';
  const currentSize = searchParams.get('size') || '';
  const currentRecentlyRaised = searchParams.get('recentlyRaised') || '';

  // Parse multiple impact areas and sizes from URL (comma-separated)
  const selectedImpactAreas = currentImpact ? currentImpact.split(',').filter(Boolean) : [];
  const selectedSizes = currentSize ? currentSize.split(',').filter(Boolean) : [];

  // Helper function to check if a company has raised funding in the last 6 months
  const isRecentlyRaised = (lastFundingDate: string | undefined) => {
    if (!lastFundingDate) return false;
    
    const fundingDate = new Date(lastFundingDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    return fundingDate >= sixMonthsAgo;
  };

  // Get unique impact areas from the companies
  const availableImpactAreas = useMemo(() => {
    const areas = new Set<string>();
    companies.forEach(company => {
      const companyImpactAreas = Array.isArray(company.impactAreas) ? company.impactAreas : [];
      companyImpactAreas.forEach((area: string) => areas.add(area));
    });
    return Array.from(areas).sort();
  }, [companies]);

  // Get unique company sizes for the filter, sorted from small to large
  const companySizes = useMemo(() => {
    const sizes = Array.from(new Set(companies.map(company => company.size).filter(Boolean)));
    return sortCompanySizes(sizes);
  }, [companies]);

  // Update URL when filters change
  const updateFilters = (newImpactAreas: string[], newHiring: string, newSizes: string[], newRecentlyRaised: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (newImpactAreas.length > 0) {
      params.set('impact', newImpactAreas.join(','));
    } else {
      params.delete('impact');
    }
    
    if (newHiring) {
      params.set('hiring', newHiring);
    } else {
      params.delete('hiring');
    }

    if (newSizes.length > 0) {
      params.set('size', newSizes.join(','));
    } else {
      params.delete('size');
    }

    if (newRecentlyRaised) {
      params.set('recentlyRaised', newRecentlyRaised);
    } else {
      params.delete('recentlyRaised');
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl as any, { scroll: false });
  };

  // Filter companies based on URL parameters and search query
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      // Search filtering
      const matchesSearch = searchQuery === "" || 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (company.impactAreas || []).some((area: string) => area.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (company.tags || []).some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Ensure impactAreas is always an array
      const companyImpactAreas = Array.isArray(company.impactAreas) ? company.impactAreas : [];
      
      const matchesImpact = selectedImpactAreas.length === 0 || 
        companyImpactAreas.some((area: string) => selectedImpactAreas.includes(area));
      
      const matchesHiring = !currentHiring || 
        (currentHiring === 'true' && company.opportunityType === 'Actively Hiring') ||
        (currentHiring === 'false' && company.opportunityType === 'Not hiring');
      
      const matchesSize = selectedSizes.length === 0 || (company.size && selectedSizes.includes(company.size));
      
      const matchesRecentlyRaised = !currentRecentlyRaised || 
        (currentRecentlyRaised === 'true' && isRecentlyRaised(company.lastFundingDate || undefined));
      
      return matchesSearch && matchesImpact && matchesHiring && matchesSize && matchesRecentlyRaised;
    });
  }, [companies, searchQuery, selectedImpactAreas, currentHiring, selectedSizes, currentRecentlyRaised]);

  const clearAllFilters = () => {
    router.replace(pathname as any, { scroll: false });
  };

  // Handle size selection
  const handleSizeToggle = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    updateFilters(selectedImpactAreas, currentHiring, newSizes, currentRecentlyRaised);
  };

  return (
    <>
      <div className="mb-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Impact Areas</h3>
            <div className="flex flex-wrap gap-2">
              {availableImpactAreas.map(area => (
                <Badge
                  key={area}
                  variant={selectedImpactAreas.includes(area) ? 'default' : 'secondary'}
                  className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newAreas = selectedImpactAreas.includes(area)
                      ? selectedImpactAreas.filter(a => a !== area)
                      : [...selectedImpactAreas, area];
                    updateFilters(newAreas, currentHiring, selectedSizes, currentRecentlyRaised);
                  }}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Company Size</h3>
            <div className="flex flex-wrap gap-2">
              {companySizes.map((size) => (
                <Badge
                  key={size}
                  variant={selectedSizes.includes(size) ? 'default' : 'secondary'}
                  className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                  onClick={(e) => handleSizeToggle(size, e)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex gap-2">
              <Badge
                variant={currentHiring === 'true' ? 'default' : 'secondary'}
                className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateFilters(selectedImpactAreas, currentHiring === 'true' ? '' : 'true', selectedSizes, currentRecentlyRaised);
                }}
              >
                Actively Hiring
              </Badge>
              <Badge
                variant={currentRecentlyRaised === 'true' ? 'default' : 'secondary'}
                className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateFilters(selectedImpactAreas, currentHiring, selectedSizes, currentRecentlyRaised === 'true' ? '' : 'true');
                }}
              >
                Recently Raised
              </Badge>
            </div>
            {(selectedImpactAreas.length > 0 || currentHiring || selectedSizes.length > 0 || currentRecentlyRaised) && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearAllFilters();
                }} 
                className="px-2 py-0.5 h-auto"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No companies match your current filters</p>
          <Button onClick={clearAllFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link 
              key={company.id} 
              href={`/companies/${slugify(company.name)}`}
              rel="noopener noreferrer" 
              className="block h-full"
            >
              <Card className="overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] h-full flex flex-col relative">
                {/* Status Badges - Top Right */}
                <div className="absolute top-3 right-3 z-10 flex gap-1">
                  {company.opportunityType === 'Actively Hiring' && (
                    <Badge variant="default" className="text-xs px-2 py-1">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Hiring
                    </Badge>
                  )}
                  {isRecentlyRaised(company.lastFundingDate) && (
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Raised
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col h-full p-4">
                  {/* Company Logo */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-cover bg-center mb-4 flex-shrink-0" 
                    style={{ backgroundImage: `url(${company.imageUrl})` }}
                  />
                  
                  {/* Company Info */}
                  <div className="space-y-2 mb-4 flex-shrink-0">
                    <h3 className="font-semibold text-xl">{company.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{company.location}</span>
                    </div>
                    {/* Company Size */}
                    {company.size && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Users className="h-4 w-4 flex-shrink-0" />
                        <span>{company.size}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Impact Areas */}
                  {company.impactAreas.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0">
                      {company.impactAreas.map((area: string) => (
                        <Badge key={area} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Description - This will expand to fill available space */}
                  {company.description && (
                    <p className="text-muted-foreground line-clamp-2 mb-4 flex-grow">
                      {company.description}
                    </p>
                  )}
                  
                  {/* Industry Tags */}
                  {(company.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                      {(company.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}