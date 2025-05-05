"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Rocket, Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
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
  role: z.enum(["job_seeker", "founder"], {
    required_error: "Please select your primary interest",
  }),
});

export default function EarlyAccessPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
          type: 'full',
          role: values.role
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
              <h1 className="text-4xl font-bold tracking-tighter">You&apos;re In!</h1>
              <p className="text-xl text-muted-foreground">
                Thanks for joining! We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                  Ignite your Impact
                </h1>
                <p className="text-xl text-muted-foreground">
                  Where purpose meets opportunity.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">First Access</h3>
                  <p className="text-sm text-muted-foreground">Shape the platform to your needs</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Exclusive Network</h3>
                  <p className="text-sm text-muted-foreground">Connect with mission-aligned peers and startups</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Premium Features</h3>
                  <p className="text-sm text-muted-foreground">Get free access to premium tools</p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I&apos;m primarily interested in:</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <Label
                              htmlFor="job_seeker"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <RadioGroupItem value="job_seeker" id="job_seeker" className="sr-only" />
                              <Users className="mb-2 h-6 w-6" />
                              <span className="text-sm font-medium">Finding Impact Work</span>
                            </Label>
                            <Label
                              htmlFor="founder"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <RadioGroupItem value="founder" id="founder" className="sr-only" />
                              <Rocket className="mb-2 h-6 w-6" />
                              <span className="text-sm font-medium">Starting a Venture</span>
                            </Label>
                          </RadioGroup>
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
                        Get Early Access
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