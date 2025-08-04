import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, title, url, type, focus, value } = body;

    // Validate required fields
    if (!name || !email || !title || !url || !type || !focus || !value) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // First, try to get existing contact to check current user groups
    let existingUserGroups = [];
    try {
      const findResponse = await fetch(`https://app.loops.so/api/v1/contacts/find?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        },
      });

      if (findResponse.ok) {
        const existingContact = await findResponse.json();
        if (existingContact.userGroup) {
          existingUserGroups = Array.isArray(existingContact.userGroup) 
            ? existingContact.userGroup 
            : [existingContact.userGroup];
        }
      }
    } catch (error) {
      console.log('Could not fetch existing contact, will create new one');
    }

    // Add 'resource' to existing user groups if not already present
    if (!existingUserGroups.includes('resource')) {
      existingUserGroups.push('resource');
    }

    // Create contact in Loops
    const loopsContactData = {
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      userGroup: existingUserGroups,
    };

    console.log('Submitting to Loops:', {
      url: 'https://app.loops.so/api/v1/contacts/update',
      apiKey: process.env.LOOPS_API_KEY ? 'Present' : 'Missing',
      data: loopsContactData
    });

    const loopsResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify(loopsContactData),
    });

    if (!loopsResponse.ok) {
      let errorMessage = 'Failed to submit resource';
      let responseText = '';
      
      try {
        responseText = await loopsResponse.text();
        const errorData = JSON.parse(responseText);
        console.error('Loops API error:', errorData);
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // If response is not JSON (like HTML error page)
        console.error('Loops API non-JSON error:', responseText);
        errorMessage = `API Error: ${loopsResponse.status} ${loopsResponse.statusText}`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: loopsResponse.status }
      );
    }

    let responseData;
    try {
      const responseText = await loopsResponse.text();
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Loops response:', parseError);
      return NextResponse.json(
        { error: 'Invalid response from Loops API' },
        { status: 500 }
      );
    }

    // Add resource to Supabase database
    const supabase = createClient();
    const { data: dbResource, error: dbError } = await supabase
      .from('resources')
      .insert({
        title,
        url,
        type,
        priority: 'Medium', // Default priority for user-submitted resources
        focus,
        value,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save resource to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Resource submitted successfully',
      contact: responseData,
      resource: dbResource,
    });

  } catch (error) {
    console.error('Error submitting resource:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 