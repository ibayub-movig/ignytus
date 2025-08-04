"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { AlertCircle, Briefcase, ArrowRight } from "lucide-react";
import { FilteredJobs } from "@/components/filtered-jobs";
import { QuickSignup } from "@/components/quick-signup";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  company_name?: string;
  company_website?: string;
  company_logo?: string;
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            name,
            website,
            logo
          )
        `)
        .eq("status", "Live")
        .order("created_at", { ascending: false });
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Transform the data to include company name
      const transformedJobs = data?.map(job => ({
        ...job,
        company_name: job.companies?.name || null,
        company_website: job.companies?.website || null,
        company_logo: job.companies?.logo || null,
        // Ensure all required fields have fallback values
        title: job.title || '',
        description: job.description || '',
        location: job.location || null,
        employment_type: job.employment_type || null,
        role_type: job.role_type || null,
        remote_work: job.remote_work || false,
      })) || [];

      setJobs(transformedJobs);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Jobs</h1>
          <p className="text-xl text-muted-foreground">
            Find your next opportunity at purpose-driven companies.
          </p>
        </div>
        
        {/* Beta Finder and Stay Updated - 2 columns */}
        <div className="mb-12 grid md:grid-cols-2 gap-6">
          {/* Beta Job Finder */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 rounded-xl text-center border border-gray-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Find your perfect fit</h3>
            <p className="text-sm text-gray-600 mb-3">Get curated handpicked opps</p>
            <Link href={"/tools/job-finder" as any}>
              <Button size="sm" variant="teal" className="font-semibold">
                Get early access
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>

          {/* Stay Updated */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base">Stay Updated</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Get the latest job opportunities delivered to your inbox</p>
            <QuickSignup />
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="animate-spin mr-2"><Briefcase className="w-6 h-6 text-primary" /></span>
            <span className="text-lg font-medium text-muted-foreground">Loading jobs...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-destructive mb-2" />
            <span className="text-lg font-medium text-destructive">{error}</span>
          </div>
        )}
        
        {!loading && !error && jobs.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-lg font-medium text-muted-foreground">No jobs found.</span>
          </div>
        )}
        
        {!loading && !error && jobs.length > 0 && (
          <FilteredJobs jobs={jobs} />
      )}
    </div>
    </main>
  );
} 