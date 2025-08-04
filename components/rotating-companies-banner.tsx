"use client";

import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase';
import { Badge } from "@/components/ui/badge";
import { Building2, BookOpen, Globe, Users, Leaf, Heart, Zap, Target, Shield, Lightbulb } from "lucide-react";
import Link from "next/link";

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
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Icon mapping for different impact areas (fallback)
const getIconForImpactArea = (impactArea: string) => {
  const area = impactArea.toLowerCase();
  if (area.includes('health') || area.includes('medical')) {
    return <Heart className="w-6 h-6 text-pink-600" />;
  }
  if (area.includes('education') || area.includes('learning')) {
    return <BookOpen className="w-6 h-6 text-blue-600" />;
  }
  if (area.includes('climate') || area.includes('environment')) {
    return <Leaf className="w-6 h-6 text-green-600" />;
  }
  if (area.includes('social') || area.includes('community')) {
    return <Users className="w-6 h-6 text-purple-600" />;
  }
  if (area.includes('sustainability') || area.includes('green')) {
    return <Leaf className="w-6 h-6 text-emerald-600" />;
  }
  if (area.includes('tech') || area.includes('ai')) {
    return <Zap className="w-6 h-6 text-yellow-600" />;
  }
  if (area.includes('finance') || area.includes('economic')) {
    return <Target className="w-6 h-6 text-indigo-600" />;
  }
  if (area.includes('security') || area.includes('safety')) {
    return <Shield className="w-6 h-6 text-red-600" />;
  }
  if (area.includes('innovation') || area.includes('research')) {
    return <Lightbulb className="w-6 h-6 text-orange-600" />;
  }
  return <Building2 className="w-6 h-6 text-gray-600" />;
};

// Background color mapping for different impact areas
const getBgColorForImpactArea = (impactArea: string) => {
  const area = impactArea.toLowerCase();
  if (area.includes('health') || area.includes('medical')) {
    return 'bg-pink-100';
  }
  if (area.includes('education') || area.includes('learning')) {
    return 'bg-blue-100';
  }
  if (area.includes('climate') || area.includes('environment')) {
    return 'bg-green-100';
  }
  if (area.includes('social') || area.includes('community')) {
    return 'bg-purple-100';
  }
  if (area.includes('sustainability') || area.includes('green')) {
    return 'bg-emerald-100';
  }
  if (area.includes('tech') || area.includes('ai')) {
    return 'bg-yellow-100';
  }
  if (area.includes('finance') || area.includes('economic')) {
    return 'bg-indigo-100';
  }
  if (area.includes('security') || area.includes('safety')) {
    return 'bg-red-100';
  }
  if (area.includes('innovation') || area.includes('research')) {
    return 'bg-orange-100';
  }
  return 'bg-gray-100';
};

// Status badge color mapping
const getStatusBadge = (company: Company) => {
  if (company.is_hiring) {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
        Hiring
      </Badge>
    );
  }
  if (company.stage) {
    return (
      <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
        {company.stage}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
      Active
    </Badge>
  );
};

export function RotatingCompaniesBanner() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("status", "Live") // Only show Live companies
        .order("created_at", { ascending: false })
        .limit(8); // Limit to 8 companies for the banner
      
      if (error) {
        console.error('Error fetching companies:', error);
        setLoading(false);
        return;
      }
      
      setCompanies(data || []);
      setLoading(false);
    }
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Latest companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated and updated weekly
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return null; // Don't show the banner if no companies
  }

  // Get the primary impact area for each company
  const getPrimaryImpactArea = (company: Company) => {
    return company.cause_tags?.[0] || company.industry_tags?.[0] || 'Impact';
  };

  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Latest companies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Curated and updated weekly
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Infinite scrolling container */}
          <div className="flex animate-scroll" style={{ width: 'fit-content' }}>
            {/* First set of companies */}
            <div className="flex gap-6 min-w-max">
              {companies.map((company) => {
                const primaryImpactArea = getPrimaryImpactArea(company);
                const bgColor = getBgColorForImpactArea(primaryImpactArea);
                
                return (
                  <Link 
                    key={company.id} 
                    href={`/companies/${slugify(company.name)}`}
                    className="bg-white rounded-xl p-6 shadow-md border min-w-[280px] flex items-center gap-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 border">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={`${company.name} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      {/* Fallback icon */}
                      <div className={`w-full h-full ${bgColor} flex items-center justify-center ${company.logo ? 'hidden' : ''}`}>
                        {getIconForImpactArea(primaryImpactArea)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(company)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{primaryImpactArea}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Gap between sets */}
            <div className="w-6"></div>

            {/* Duplicate set for seamless infinite loop */}
            <div className="flex gap-6 min-w-max">
              {companies.map((company) => {
                const primaryImpactArea = getPrimaryImpactArea(company);
                const bgColor = getBgColorForImpactArea(primaryImpactArea);
                
                return (
                  <Link 
                    key={`${company.id}-duplicate`} 
                    href={`/companies/${slugify(company.name)}`}
                    className="bg-white rounded-xl p-6 shadow-md border min-w-[280px] flex items-center gap-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 border">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={`${company.name} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      {/* Fallback icon */}
                      <div className={`w-full h-full ${bgColor} flex items-center justify-center ${company.logo ? 'hidden' : ''}`}>
                        {getIconForImpactArea(primaryImpactArea)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(company)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{primaryImpactArea}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 