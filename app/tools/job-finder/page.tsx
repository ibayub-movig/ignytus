"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Loader2, Sparkles, ArrowRight, ArrowLeft, Plus, X, CheckCircle2, Timer, Users, HeartHandshake, ArrowUp } from "lucide-react";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_SETUPS = ["Remote", "Hybrid", "In-person"];
const CAUSES = [
  "climate", "education", "health", "equity", "sustainability", "hunger", "accessibility", "social justice", "Other"
];
const INDUSTRIES = [
  "Non-profit", "Tech", "Healthcare", "Education", "Finance", "Government", "Other"
];

const steps = [
  "Contact Info",
  "Job Preferences",
  "Resume & Links",
  "Review & Payment"
];

type Step = 0 | 1 | 2 | 3;

export default function JobFinderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    roles: "",
    industries: [] as string[],
    employmentTypes: [] as string[],
    workSetups: [] as string[],
    location: "",
    causes: [] as string[],
    impactOnly: false,
    notes: "",
    resumeText: "",
    resumeFile: null as File | null,
    linkedin: "",
    personalLinks: [""],
  });
  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Check for success/cancel from Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    
    if (success === 'true') {
      setSubmitted(true);
    } else if (canceled === 'true') {
      setError('Payment was canceled. You can try again anytime.');
    }
  }, []);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultiSelect = (field: keyof typeof form, value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleCauseClick = (cause: string) => handleMultiSelect("causes", cause);
  const handleEmploymentTypeClick = (type: string) => handleMultiSelect("employmentTypes", type);
  const handleWorkSetupClick = (setup: string) => handleMultiSelect("workSetups", setup);
  const handleIndustryClick = (industry: string) => handleMultiSelect("industries", industry);

  const handleResumeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, resumeFile: file }));
  };

  const handlePersonalLinkChange = (idx: number, value: string) => {
    setForm((prev) => {
      const links = [...prev.personalLinks];
      links[idx] = value;
      return { ...prev, personalLinks: links };
    });
  };
  const addPersonalLink = () => setForm((prev) => ({ ...prev, personalLinks: [...prev.personalLinks, ""] }));
  const removePersonalLink = (idx: number) => setForm((prev) => {
    const links = prev.personalLinks.filter((_, i) => i !== idx);
    return { ...prev, personalLinks: links.length ? links : [""] };
  });

  // Step validation
  const isStepValid = () => {
    if (step === 0) {
      return form.name.trim() && form.email.trim();
    }
    if (step === 1) {
      return form.roles.trim();
    }
    // Steps 2 and 3 have no required fields
    return true;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  // Payment
  const handlePayment = async () => {
    setProcessingPayment(true);
    setError(null);
    
    try {
      // Save the request to database first (even if they don't pay)
      const formData = new FormData();
      
      // Add all form fields
      formData.append('email', form.email);
      formData.append('name', form.name);
      formData.append('roles', form.roles);
      formData.append('industries', JSON.stringify(form.industries));
      formData.append('employmentTypes', JSON.stringify(form.employmentTypes));
      formData.append('workSetups', JSON.stringify(form.workSetups));
      formData.append('location', form.location);
      formData.append('causes', JSON.stringify(form.causes));
      formData.append('impactOnly', form.impactOnly.toString());
      formData.append('linkedin', form.linkedin);
      formData.append('personalLinks', JSON.stringify(form.personalLinks));
      formData.append('notes', form.notes);
      formData.append('resumeText', form.resumeText);
      
      // Add resume file if provided
      if (form.resumeFile) {
        formData.append('resumeFile', form.resumeFile);
      }

      console.log('Saving form data:', {
        email: form.email,
        name: form.name,
        roles: form.roles
      });

      const saveResponse = await fetch('/api/job-finder-request', {
        method: 'POST',
        body: formData,
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        console.error('Save response error:', errorData);
        throw new Error('Failed to save request');
      }

      console.log('Successfully saved request');

      // Redirect to Stripe hosted checkout
      const stripeUrl = `https://buy.stripe.com/3cIbIUc1qcAY49m1iO3F600?prefilled_email=${encodeURIComponent(form.email)}&client_reference_id=${encodeURIComponent(form.email)}`;
      window.location.href = stripeUrl;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed');
      setProcessingPayment(false);
    }
  };

  // Progress bar
  function ProgressBar() {
    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 ${
              step === idx
                ? "bg-primary text-primary-foreground border-primary"
                : step > idx
                ? "bg-primary/10 text-primary border-primary"
                : "bg-muted text-muted-foreground border-muted-foreground/30"
            }`}>
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 h-1 rounded-full ${step > idx ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground mb-4">Thank you for your purchase. We&apos;re now processing your job matching request.</p>
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-2">What happens next?</h2>
            <ul className="text-sm space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                We&apos;ll review your profile and preferences
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Find curated job opportunities that match your criteria
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Send you personalized job matches via email within 48 hours
              </li>
            </ul>
          </div>
          <Button onClick={() => setSubmitted(false)} variant="outline">Start Over</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-24 bg-background">
      {/* Hero/Info Section */}
      <section className="w-full pb-10 mb-0">
        <div className="max-w-4xl mx-auto px-4 pt-2 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] text-white mb-6 shadow-lg">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] bg-clip-text text-transparent">Job Finder</h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Get matched with purpose-driven jobs tailored to your skills, interests, and values
          </p>

          {/* Enhanced Features Grid - Moved Above Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-base mb-2 text-gray-800">Curated Matches</span>
              <span className="text-md text-gray-600 leading-relaxed">Personalized to your background</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-base mb-2 text-gray-800">Human Review</span>
              <span className="text-md text-gray-600 leading-relaxed">Manually reviewed, not just AI</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mb-4 shadow-lg">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-base mb-2 text-gray-800">Impact-Driven</span>
              <span className="text-md text-gray-600 leading-relaxed">Mission-aligned roles</span>
            </div>
          </div>
          
          {/* Enhanced Pricing Display */}
          <div className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white rounded-xl px-8 py-6 inline-block shadow-xl">
            <div className="flex items-center justify-center gap-4">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Early Bird</span>
              <span className="text-white/70 line-through text-lg">$29</span>
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-white/90">• 1-time payment • 20 curated matches</span>
            </div>
          </div>
        </div>
      </section>
      {/* Form Card */}
      <div className="max-w-4xl mx-auto px-4">
        <Card className="relative overflow-hidden max-w-4xl w-full p-8 mt-8">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Job Finder</h1>
            <p className="text-muted-foreground text-lg">Get curated job opportunities based on your interests and experience</p>
          </div>
          <ProgressBar />
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Step 1: Contact Info */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Name<span className="text-primary">*</span></label>
                    <Input name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Email<span className="text-primary">*</span></label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                  </div>
                </div>
              </div>
            )}
            {/* Step 2: Job Preferences */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Job Titles or Roles <span className="text-primary">*</span></label>
                  <Input name="roles" value={form.roles} onChange={handleChange} placeholder="e.g. Product Manager, Software Engineer, Marketing Director" required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Industries</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={form.industries.includes(industry) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleIndustryClick(industry)}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Select options</span>
                </div>
                <div>
                  <label className="block font-medium mb-1">Employment Type(s)</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {EMPLOYMENT_TYPES.map((type) => (
                      <Badge
                        key={type}
                        variant={form.employmentTypes.includes(type) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleEmploymentTypeClick(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Select options</span>
                </div>
                <div>
                  <label className="block font-medium mb-1">Work Setup</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {WORK_SETUPS.map((setup) => (
                      <Badge
                        key={setup}
                        variant={form.workSetups.includes(setup) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleWorkSetupClick(setup)}
                      >
                        {setup}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Select options</span>
                </div>
                <div>
                  <label className="block font-medium mb-1">Your location</label>
                  <Input name="location" value={form.location} onChange={handleChange} placeholder="e.g. San Francisco, CA or New York, NY" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Causes You Care About</label>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {CAUSES.map((cause) => (
                      <Badge
                        key={cause}
                        variant={form.causes.includes(cause) ? "default" : "secondary"}
                        className="cursor-pointer capitalize"
                        onClick={() => handleCauseClick(cause)}
                      >
                        {cause}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Select options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="impactOnly" name="impactOnly" checked={form.impactOnly} onCheckedChange={(checked) => setForm(f => ({ ...f, impactOnly: !!checked }))} />
                  <label htmlFor="impactOnly" className="text-sm">Impact-only opportunities (companies with social/environmental mission)</label>
                </div>
              </div>
            )}
            {/* Step 3: Resume & Links */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Resume (optional)</label>
                  <div className="flex flex-col gap-2">
                    <Input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleResumeFile} />
                    <Textarea name="resumeText" value={form.resumeText} onChange={handleChange} placeholder="Or paste your resume text here..." />
                    {form.resumeFile && <span className="text-xs text-muted-foreground">Selected: {form.resumeFile.name}</span>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">LinkedIn URL (optional)</label>
                    <Input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Personal Website(s) (optional)</label>
                    {form.personalLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <Input
                          value={link}
                          onChange={e => handlePersonalLinkChange(idx, e.target.value)}
                          placeholder="https://yourportfolio.com"
                        />
                        {form.personalLinks.length > 1 && (
                          <Button type="button" size="icon" variant="ghost" onClick={() => removePersonalLink(idx)}><X className="w-4 h-4" /></Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" size="sm" variant="outline" onClick={addPersonalLink} className="mt-1"><Plus className="w-4 h-4 mr-1" />Add Link</Button>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Additional Notes</label>
                  <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Tell us more about what you're looking for, your experience, or any specific requirements..." />
                </div>
              </div>
            )}
            {/* Step 4: Review & Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Review your information</h2>
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Name:</span> {form.name}</li>
                    <li><span className="font-medium">Email:</span> {form.email}</li>
                    <li><span className="font-medium">Roles:</span> {form.roles}</li>
                    <li><span className="font-medium">Industries:</span> {form.industries.join(", ") || "-"}</li>
                    <li><span className="font-medium">Employment Types:</span> {form.employmentTypes.join(", ") || "-"}</li>
                    <li><span className="font-medium">Work Setup:</span> {form.workSetups.join(", ") || "-"}</li>
                    <li><span className="font-medium">Location:</span> {form.location || "-"}</li>
                    <li><span className="font-medium">Causes:</span> {form.causes.join(", ") || "-"}</li>
                    <li><span className="font-medium">Impact Only:</span> {form.impactOnly ? "Yes" : "No"}</li>
                    <li><span className="font-medium">Resume:</span> {form.resumeFile ? form.resumeFile.name : form.resumeText ? "(pasted text)" : "-"}</li>
                    <li><span className="font-medium">LinkedIn:</span> {form.linkedin || "-"}</li>
                    <li><span className="font-medium">Personal Links:</span> {form.personalLinks.filter(Boolean).join(", ") || "-"}</li>
                    <li><span className="font-medium">Notes:</span> {form.notes || "-"}</li>
                  </ul>
                </div>


              </div>
                        )}
            {/* Navigation Buttons */}
            <div className="flex justify-between gap-2 pt-2">
              <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={() => isStepValid() && setStep((s) => ((s + 1) as Step))} disabled={!isStepValid()}>
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  type="button" 
                  className="w-48" 
                  disabled={processingPayment}
                  onClick={handlePayment}
                >
                  {processingPayment ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</>
                  ) : (
                    <>Pay $29 & Get Started</>
                  )}
                </Button>
              )}
            </div>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </form>
        </Card>
      </div>


    </main>
  );
} 