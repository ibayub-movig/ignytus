import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      firstName,
      lastName,
      source,
      subscribed,
      userGroup,
      userId,
      mailingLists,
      role,
      type,
      companyName,
      companyUrl,
      notes
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const payload: Record<string, any> = { email };
    
    // Handle name field - split if it's a full name
    if (name) {
      const nameParts = name.trim().split(' ');
      if (nameParts.length > 1) {
        payload.firstName = nameParts[0];
        payload.lastName = nameParts.slice(1).join(' ');
      } else {
        payload.firstName = name;
      }
    }
    
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (source) payload.source = source;
    if (typeof subscribed === 'boolean') payload.subscribed = subscribed;
    if (userGroup) payload.userGroup = userGroup;
    if (userId) payload.userId = userId;
    if (mailingLists) payload.mailingLists = mailingLists;
    
    // Map role to focus field for Loops
    if (role) {
      const focusMap: Record<string, string> = {
        'job_seeker': 'jobs',
        'founder': 'building'
      };
      payload.focus = focusMap[role] || role;
    }

    // Handle company signups
    if (type === 'company') {
      payload.userGroup = 'companies';
      
      // Store all company form data in details field
      const companyDetails = {
        companyName,
        companyUrl,
        notes,
        signupDate: new Date().toISOString(),
        source: 'company-signup'
      };
      
      payload.details = JSON.stringify(companyDetails);
    }

    const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.message || 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}