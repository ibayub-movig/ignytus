"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Building2, Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyUrl: z.string().min(1, "Please enter your company website"),
  notes: z.string().optional(),
});

export default function CompanySignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      companyUrl: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: values.email,
          name: values.name,
          companyName: values.companyName,
          companyUrl: values.companyUrl,
          notes: values.notes,
          type: 'company'
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
    } catch (error) {
      form.setError("email", { 
        type: "submit",
        message: "Failed to submit. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter">Thank You!</h1>
              <p className="text-xl text-muted-foreground">
                We&apos;ll review your submission and get back to you soon about featuring your company.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                  List Your Impact Company
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect with purpose-driven professionals who align with your mission.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Showcase Your Mission</h3>
                  <p className="text-sm text-muted-foreground">Share your story and impact with aligned talent</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Find Aligned Talent</h3>
                  <p className="text-sm text-muted-foreground">Connect with professionals who share your values</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Build Your Team</h3>
                  <p className="text-sm text-muted-foreground">Grow your impact with the right people</p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input placeholder="google.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your company and what kind of talent you&apos;re looking for..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}