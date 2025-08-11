"use client"

import { Flame, Tag, Search, MessageSquare, ArrowRight, Sparkles, Target, Building2, MessageSquareMore, Rocket, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX } from "react";
import { Badge } from "@/components/ui/badge";
import { RotatingCompaniesBanner } from "@/components/rotating-companies-banner";
import { SupascribeEmbed } from "@/components/supascribe-embed";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20 px-4 hero-bg-blur">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          {/* Large blur blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl glow-blob" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl glow-blob" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl glow-blob" />
          
          {/* Floating pulses */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary/20 rounded-full floating-pulse" />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/15 rounded-full floating-pulse" />
          <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-primary/25 rounded-full floating-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-primary/18 rounded-full floating-pulse" />
          <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-primary/20 rounded-full floating-pulse" />
          <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-primary/22 rounded-full floating-pulse" />
          
          {/* Drifting particles */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary/30 rounded-full drifting-particle" />
          <div className="absolute top-20 right-0 w-1 h-1 bg-primary/25 rounded-full drifting-particle" />
          <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-primary/35 rounded-full drifting-particle" />
          
          {/* Additional subtle elements */}
          <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-primary/8 rounded-full blur-xl" />
          <div className="absolute bottom-1/3 right-1/5 w-12 h-12 bg-primary/6 rounded-full blur-xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold text-black">
              <Flame className="w-8 h-8" />
              <span>Ignyt</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl text-black pb-2">
              Build a purpose-driven career
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Discover curated startups, roles, and tools for meaningful work
            </p>

            {/* Newsletter Signup */}
            <SupascribeEmbed variant="hero" />

            {/* Secondary Explore Button */}
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link href="/companies">
                  Explore Startups
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Rotating Companies Banner */}
      <RotatingCompaniesBanner />



<section className="py-20 bg-background/50 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Solution Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
        Where purpose meets opportunity
      </h2>
     </div>
    
    {/* Solution Columns */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* Solution 1: Perfect Fit */}
      <div className="bg-white rounded-xl p-6 shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#14b8a6]/10 rounded-full flex items-center justify-center w-16 h-16">
            <CheckCircle2 className="w-7 h-7 text-[#14b8a6]" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Find your perfect fit</h3>
        <p className="text-muted-foreground">
          Discover companies and opportunities based on your values and skills 
        </p>
      </div>
      
      {/* Solution 2: Save Time */}
      <div className="bg-white rounded-xl p-6 shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#14b8a6]/10 rounded-full flex items-center justify-center w-16 h-16">
            <CheckCircle2 className="w-7 h-7 text-[#14b8a6]" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Skip the grunt work</h3>
        <p className="text-muted-foreground">
          Access insights and connections to the right people with our AI trained on social impact
        </p>
      </div>
      
      {/* Solution 3: Hidden Opportunities */}
      <div className="bg-white rounded-xl p-6 shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#14b8a6]/10 rounded-full flex items-center justify-center w-16 h-16">
            <CheckCircle2 className="w-7 h-7 text-[#14b8a6]" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Uncover hidden opportunities </h3>
        <p className="text-muted-foreground">
          Use real-time signals to find companies that need people like you</p>
      </div>
    </div>

  </div>
</section>
      

      {/* For Companies Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Are you a company looking for talent?</h2>
            <p className="text-xl text-muted-foreground">
              Connect with mission-aligned professionals who share your vision for positive change.
            </p>
            <Button size="lg" variant="teal" asChild>
              <Link href="/company-signup">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-secondary/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">About Ignyt</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>We’re building the tool we always wanted—because finding aligned work shouldn’t feel like a second job.</p>
              <p>As a mission-driven team, we believe real impact starts with the right people. Whether you’re looking to join a startup or build your own, we’ll help you cut through the noise and get moving.</p>
            </div>
            <Button 
              size="lg" 
              variant="teal"
              className="mt-8"
              asChild
            >
              <Link href="/subscribe">
                Join Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}