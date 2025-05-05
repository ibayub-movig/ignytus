import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable caching

export async function GET() {
  try {
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
        next: { revalidate: 0 }, // Disable caching for this specific request
        cache: 'no-store', // Ensure no caching
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch startups from Airtable');
    }

    const data = await response.json();
    
    console.log('Airtable response:', {
      recordCount: data.records?.length,
      firstRecord: data.records?.[0]?.fields
    });
    
    if (!data.records) {
      throw new Error('Invalid response format from Airtable');
    }
    
    const startups = data.records.map((record: any) => ({
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

    return NextResponse.json(startups);
  } catch (error) {
    console.error('Failed to fetch startups:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch startups' },
      { status: 500 }
    );
  }
}