import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, name, type = 'quick', role, companyName, companyUrl, notes } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // Validate required fields based on signup type
    if ((type === 'full' || type === 'company') && !name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    if (type === 'company' && (!companyName || !companyUrl)) {
      return NextResponse.json({ error: 'Missing required company information' }, { status: 400 });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      console.error('Missing Airtable configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const apiUrl = `https://api.airtable.com/v0/${baseId}/Submissions`;

    const airtable = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          { 
            fields: { 
              Email: email,
              Name: name || '',
              CompanyName: companyName || '',
              CompanyUrl: companyUrl || '',
              Notes: notes || '',
              SignupType: type,
              MainInterest: role === 'job_seeker' ? 'Jobs' : role === 'founder' ? 'Building' : null
            } 
          },
        ],
      }),
    });

    if (!airtable.ok) {
      const details = await airtable.json();
      console.error('Airtable error:', {
        status: airtable.status,
        details,
        email,
        type
      });
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: airtable.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}