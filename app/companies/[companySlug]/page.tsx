import { Metadata } from 'next';
import { createClient } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Users, Building2, ExternalLink, ArrowRight, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

function unslugify(slug: string) {
  return slug.replace(/-/g, ' ');
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function generateMetadata({ params }: { params: { companySlug: string } }): Promise<Metadata> {
  const companyName = unslugify(params.companySlug);
  return {
    title: `${companyName} | Ignytus`,
    description: `Learn more about ${companyName} and their impact-driven mission.`,
  };
}

export default async function CompanyPage({ params }: { params: { companySlug: string } }) {
  const supabase = createClient();
  const slug = params.companySlug;
  const companyName = unslugify(slug);

  // Fetch company by slugified name (case-insensitive)
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .ilike('name', companyName.replace(/\b\w/g, c => c.toUpperCase()));
  const company = companies?.[0];

  // Fetch jobs for this company
  let jobs = [];
  if (company) {
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .eq('company_id', company.id)
      .eq('status', 'Live');
    jobs = jobsData || [];
    
    // Debug logging
    console.log(`Company: ${company.name} (ID: ${company.id})`);
    console.log(`Found ${jobs.length} jobs for this company:`, jobs.map(j => ({ id: j.id, title: j.title })));
  }

  // Fetch similar companies (any matching cause_tags, exclude self)
  let similarCompanies = [];
  if (company && company.cause_tags && company.cause_tags.length > 0) {
    // Use a more flexible approach - find companies that share any cause tags
    // First, let's try to get all companies and filter in JavaScript for debugging
    const { data: allCompanies } = await supabase
      .from('companies')
      .select('*')
      .eq('status', 'Live')
      .neq('id', company.id);
    
    // Filter companies that share any cause tags
    similarCompanies = (allCompanies || []).filter(otherCompany => {
      if (!otherCompany.cause_tags || otherCompany.cause_tags.length === 0) return false;
      return company.cause_tags.some((tag: string) => otherCompany.cause_tags.includes(tag));
    }).slice(0, 3);
    
    // Debug logging
    console.log(`Company: ${company.name}, Cause tags:`, company.cause_tags);
    console.log(`Found ${similarCompanies.length} similar companies:`, similarCompanies.map(c => ({ name: c.name, cause_tags: c.cause_tags })));
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Company not found</h1>
        <p className="text-gray-600">We couldn&apos;t find a company with the name &quot;{companyName}&quot;.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/companies" className="hover:text-foreground transition-colors">
            Companies
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{company.name}</span>
        </nav>

        {/* Company Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={company.logo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=96&h=96'}
              alt={company.name}
              className="w-24 h-24 rounded-xl object-cover border flex-shrink-0"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{company.location}</span>
                {company.country && company.country !== company.location && (
                  <>
                    <span>•</span>
                    <span>{company.country}</span>
                  </>
                )}
              </div>
              {company.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">{company.description}</p>
              )}
            </div>
          </div>

          {/* Company Tags */}
          {(company.cause_tags?.length > 0 || company.industry_tags?.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {company.cause_tags?.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
              {company.industry_tags?.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Company Stats */}
          {(company.stage || company.size || company.last_funding_date || company.last_funding_amt) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {company.stage && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Stage</div>
                  <div className="font-semibold">{company.stage}</div>
                </div>
              )}
              {company.size && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Size</div>
                  <div className="font-semibold">{company.size}</div>
                </div>
              )}
              {company.last_funding_date && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Last Funding</div>
                  <div className="font-semibold">
                    {new Date(company.last_funding_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                </div>
              )}
              {company.last_funding_amt && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Amount</div>
                  <div className="font-semibold">
                    {company.last_funding_amt >= 1000000 
                      ? `$${(company.last_funding_amt / 1000000).toFixed(1)}M`
                      : `$${(company.last_funding_amt / 1000).toFixed(1)}K`
                    }
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Company Links */}
          {(company.website || company.linkedin || company.careers) && (
            <div className="flex flex-wrap gap-3">
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm"
                >
                  <Globe className="w-4 h-4" />
                  Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors font-medium shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {company.careers && (
                <a
                  href={company.careers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium shadow-sm"
                >
                  <Users className="w-4 h-4" />
                  Careers
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Jobs Section - Only show if there are jobs */}
        {jobs.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-sm border mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Jobs at {company.name}
            </h2>
            <div className="space-y-4">
              {jobs.map((job: any) => (
                <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                      {job.location && (
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.description && (
                        <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                      )}
                    </div>
                    {job.apply_link && (
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm ml-4"
                      >
                        Apply
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore other companies section - Always show */}
        <div className="bg-white rounded-xl p-8 shadow-sm border mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Explore other companies
          </h3>
          {similarCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCompanies.map((other: any) => (
                <Link
                  key={other.id}
                  href={`/companies/${slugify(other.name)}`}
                  className="border rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-shadow group"
                >
                  <img
                    src={other.logo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=96&h=96'}
                    alt={other.name}
                    className="w-16 h-16 rounded-xl object-cover mb-4 border"
                  />
                  <h4 className="font-semibold text-lg text-center mb-2 group-hover:text-primary transition-colors">
                    {other.name}
                  </h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {(other.cause_tags || []).slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No similar companies found</p>
              <Link 
                href="/companies" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              >
                Browse all companies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 