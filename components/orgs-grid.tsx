"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CheckCircle2, AlertCircle, Globe, Linkedin, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";

interface Org {
  id: string;
  name: string;
  description: string;
  website: string;
  country: string;
  causes: string[];
  careers_url: string;
  linkedin_url: string;
  logo_url: string;
  stage: string;
  size: string;
  is_hiring: string;
  last_funding_amt: number;
}

export function OrgsGrid({ orgs }: { orgs: Org[] }) {
  if (orgs.length === 0) {
    return (
      <div className="flex flex-col items-center py-12">
        <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
        <span className="text-lg font-medium text-muted-foreground">No organizations found.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {orgs.map((org) => (
        <Card key={org.id} className="flex flex-col h-full p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={org.logo_url || `https://img.logo.dev/${org.website?.replace(/^https?:\/\//, '').replace(/\/$/, '')}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=64&format=png`}
              alt={org.name}
              className="w-16 h-16 rounded-full object-cover border"
              onError={(e) => {
                // Fallback to a generic company icon if logo.dev fails
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=96&h=96";
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold truncate">{org.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{org.country}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{org.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {org.causes?.map((cause) => (
              <Badge key={cause} variant="secondary" className="text-xs">{cause}</Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t">
            <div className="flex items-center gap-3">
              {org.is_hiring === 'Yes' ? (
                <span className="flex items-center gap-1 text-green-600 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 animate-pulse" /> Hiring
                </span>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Users className="w-4 h-4" /> Not hiring
                </span>
              )}
              {org.stage && (
                <Badge variant="outline" className="text-xs">{org.stage}</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {org.website && (
                <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {org.linkedin_url && (
                <a href={org.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {org.careers_url && (
                <a href={org.careers_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Briefcase className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          {(org.size || org.last_funding_amt > 0) && (
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              {org.size && <span>{org.size}</span>}
              {org.last_funding_amt > 0 && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {org.last_funding_amt.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
} 