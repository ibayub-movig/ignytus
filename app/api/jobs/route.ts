import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createClient();
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        name,
        website,
        logo
      )
    `)
    .eq('status', 'Live')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform the data to include company name
  const transformedJobs = jobs?.map(job => ({
    ...job,
    company_name: job.companies?.name || null,
    company_website: job.companies?.website || null,
    company_logo: job.companies?.logo || null,
  })) || [];

  return NextResponse.json(transformedJobs);
} 