import { Suspense } from 'react';
import type { Startup } from "@/lib/airtable";
import { DirectoryError } from "@/components/directory-error";
import { FilteredStartups } from "@/components/filtered-startups";

export const revalidate = 3600; // Revalidate every hour

async function getStartups() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  
  if (!apiKey || !baseId) {
    throw new Error('Missing required Airtable configuration');
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/Companies?view=Finalized`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch startups from Airtable');
  }
  const data = await response.json();
  
  if (!data.records) {
    throw new Error('Invalid response format from Airtable');
  }
  
  return data.records.map((record: any) => ({
    id: record.id,
    name: record.fields.name || '',
    description: record.fields.description || '',
    companyUrl: record.fields.companyUrl || '',
    location: record.fields.location || '',
    opportunityType: record.fields.opportunityType || 'Looking for',
    opportunities: Array.isArray(record.fields.opportunities) ? record.fields.opportunities : [],
    impactAreas: record.fields.impactAreas || [],
    imageUrl: record.fields.imageUrl || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    tags: Array.isArray(record.fields.tags) ? record.fields.tags : [],
  }));
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const startups = await getStartups();
  const initialAreas = typeof searchParams.areas === 'string' ? searchParams.areas.split(',') : [];

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
            Sample Impact Startup Directory
          </h1>
          <p className="text-xl text-muted-foreground">
            Sign up to get full access of startups and opportunities best fit fot you.
          </p>
        </div>

        <Suspense fallback={<DirectoryError error="Failed to load startup directory. Please try again." />}>
          <FilteredStartups startups={startups} initialAreas={initialAreas} />
        </Suspense>
      </div>
    </main>
  );
}