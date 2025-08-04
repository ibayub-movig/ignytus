"use client";

import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building2, CheckCircle2, AlertCircle, Search } from "lucide-react";
import Link from "next/link";
import { FilteredCompanies } from "@/components/filtered-companies";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  location: string;
  industry_tags: string[];
  cause_tags: string[];
  stage: string;
  founder_name: string;
  founder_linkedin: string;
  is_hiring: boolean;
  created_at: string;
  size: string;
  logo: string;
  linkedin: string;
  careers: string;
  hiring_as_of: string;
  status: string;
  last_funding_date?: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("status", "Live") // Only show Live companies
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setCompanies(data || []);
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  // Search filtering is now handled in the FilteredCompanies component

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Explore</h1>
          <p className="text-xl text-muted-foreground">
            Curated list of startups that are making a difference.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies, locations, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="animate-spin mr-2"><Building2 className="w-6 h-6 text-primary" /></span>
            <span className="text-lg font-medium text-muted-foreground">Loading companies...</span>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-destructive mb-2" />
            <span className="text-lg font-medium text-destructive">{error}</span>
          </div>
        )}
        {!loading && !error && companies.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-lg font-medium text-muted-foreground">
              No companies found.
            </span>
          </div>
        )}
        {!loading && !error && companies.length > 0 && (
          <FilteredCompanies
            companies={companies.map(company => ({
              id: company.id,
              name: company.name,
              description: company.description,
              location: company.location,
              companyUrl: company.website || `https://example.com/companies/${company.id}`,
              imageUrl: company.logo,
              impactAreas: Array.isArray(company.cause_tags) ? company.cause_tags : [],
              tags: Array.isArray(company.industry_tags) ? company.industry_tags : [],
              opportunityType: company.is_hiring ? "Actively Hiring" : "Not hiring",
              opportunities: [], // You can map this if you have opportunity data
              size: company.size || null, // Add size to the mapped data
              lastFundingDate: company.last_funding_date || null, // Add last funding date
            }))}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </main>
  );
} 