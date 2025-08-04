import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Use service role client to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Extract form data
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const roles = formData.get('roles') as string;
    
    console.log('Received form data:', { email, name, roles });
    const industries = JSON.parse(formData.get('industries') as string);
    const employmentTypes = JSON.parse(formData.get('employmentTypes') as string);
    const workSetups = JSON.parse(formData.get('workSetups') as string);
    const location = formData.get('location') as string;
    const causes = JSON.parse(formData.get('causes') as string);
    const impactOnly = formData.get('impactOnly') === 'true';
    const linkedin = formData.get('linkedin') as string;
    const personalLinks = JSON.parse(formData.get('personalLinks') as string);
    const notes = formData.get('notes') as string;
    const resumeText = formData.get('resumeText') as string;
    const resumeFile = formData.get('resumeFile') as File | null;

    let resumeFilePath = null;

    // Upload resume file if provided
    if (resumeFile && resumeFile.size > 0) {
      // Create folder structure: resumes/email/filename
      const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${sanitizedEmail}/${Date.now()}-${resumeFile.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (uploadError) {
        console.error('File upload error:', uploadError);
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
      }

      resumeFilePath = fileName;
    }

    // Save to database using existing search_requests table
    const { data, error } = await supabase
      .from('search_requests')
      .insert([
        {
          user_id: null, // Public form - no user authentication required
          name: name,
          email: email,
          job_titles: roles,
          location,
          cause_tags: causes.join(', '),
          employment_type: employmentTypes,
          location_setup: workSetups,
          industries: industries.join(', '),
          impact_only: impactOnly,
          notes: `${notes}\n\nLinkedIn: ${linkedin}\nPersonal Links: ${personalLinks.join(', ')}\nResume Text: ${resumeText}`,
          resume_url: resumeFilePath,
          paid: false,
          status: 'open'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data[0].id });
  } catch (error) {
    console.error('Error saving request:', error);
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }
} 