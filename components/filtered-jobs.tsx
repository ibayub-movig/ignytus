"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Route } from 'next';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Clock, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  company_name?: string;
  location?: string;
  employment_type?: string;
  role_type?: string;
  is_active?: boolean;
  apply_link?: string;
  created_at?: string;
  salary_range?: string;
  experience_level?: string;
  remote_work?: boolean;
}

interface FilteredJobsProps {
  jobs: Job[];
}

export function FilteredJobs({ jobs }: FilteredJobsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current URL parameters
  const currentSearch = searchParams.get('search') || '';
  const currentRoleType = searchParams.get('roleType') || '';

  const availableRoleTypes = useMemo(() => {
    const roleTypes = new Set<string>();
    jobs.forEach(job => {
      if (job.role_type) roleTypes.add(job.role_type);
    });
    return Array.from(roleTypes).sort();
  }, [jobs]);

  // Update URL when filters change
  const updateFilters = (newSearch: string, newRoleType: string) => {
    try {
      const params = new URLSearchParams(searchParams);
      
      if (newSearch) {
        params.set('search', newSearch);
      } else {
        params.delete('search');
      }
      
      if (newRoleType) {
        params.set('roleType', newRoleType);
      } else {
        params.delete('roleType');
      }
      
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newUrl as Route, { scroll: false });
    } catch (error) {
      console.error('Error updating filters:', error);
    }
  };

  // Filter jobs based on URL parameters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !currentSearch || 
        (job.title && job.title.toLowerCase().includes(currentSearch.toLowerCase())) ||
        (job.description && job.description.toLowerCase().includes(currentSearch.toLowerCase())) ||
        (job.company_name && job.company_name.toLowerCase().includes(currentSearch.toLowerCase()));
      
      const matchesRoleType = !currentRoleType || 
        (job.role_type && job.role_type === currentRoleType);
      
      return matchesSearch && matchesRoleType;
    });
  }, [jobs, currentSearch, currentRoleType]);

  const clearAllFilters = () => {
    try {
      router.replace(pathname as Route, { scroll: false });
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  const handleSearchChange = (value: string) => {
    try {
      console.log('Search value:', value);
      console.log('Current jobs:', jobs);
      updateFilters(value, currentRoleType);
    } catch (error) {
      console.error('Error handling search change:', error);
    }
  };

  const handleRoleTypeClick = (roleType: string) => {
    try {
      const newRoleType = currentRoleType === roleType ? '' : roleType;
      updateFilters(currentSearch, newRoleType);
    } catch (error) {
      console.error('Error handling role type click:', error);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="space-y-2">
              <h3 className="font-semibold">Search Job Sample</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by title, company, or description..."
                  value={currentSearch}
                  onChange={(e) => {
                    try {
                      const value = e.target?.value || '';
                      handleSearchChange(value);
                    } catch (error) {
                      console.error('Error in input onChange:', error);
                    }
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role Type Pills */}
            <div className="space-y-2">
              <h3 className="font-semibold">Role Type</h3>
              <div className="flex flex-wrap gap-2">
                {availableRoleTypes.map(roleType => (
                  <Badge
                    key={roleType}
                    variant={currentRoleType === roleType ? 'default' : 'secondary'}
                    className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRoleTypeClick(roleType);
                    }}
                  >
                    {roleType}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(currentSearch || currentRoleType) && (
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

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No jobs match your current filters</p>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clearAllFilters();
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Job Title and Company */}
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{job.title}</h3>
                    {job.company_name && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{job.company_name}</span>
                      </div>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.employment_type && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.employment_type}</span>
                      </div>
                    )}
                    {job.created_at && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatRelativeDate(job.created_at)}</span>
                      </div>
                    )}
                    {job.remote_work && (
                      <Badge variant="secondary">Remote</Badge>
                    )}
                    {job.salary_range && (
                      <Badge variant="outline">{job.salary_range}</Badge>
                    )}
                  </div>

                  {/* Description */}
                  {job.description && (
                    <p className="text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.role_type && (
                      <Badge variant="secondary">{job.role_type}</Badge>
                    )}
                    {job.is_active === false && (
                      <Badge variant="destructive">Closed</Badge>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex-shrink-0">
                  {job.apply_link ? (
                    <Link href={job.apply_link as any} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full lg:w-auto">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" disabled className="w-full lg:w-auto">
                      Apply Link Unavailable
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
} 