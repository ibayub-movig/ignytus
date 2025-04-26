"use client"

import { Flame, Tag, Search, MessageSquare, ArrowRight, Sparkles, Target, Building2, MessageSquareMore, Rocket, CheckCircle2, ArrowUpRight } from "lucide-react";
import { QuickSignup } from "@/components/quick-signup";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Flame className="w-8 h-8" />
              <span>Ignyt</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Craft a purpose-driven career on your terms 
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Find and connect with impact-driven startups. Or start your own
            </p>

            {/* Early Access Form */}
            <QuickSignup />

            {/* Early Access Form */}

            {/* Social Proof */}
            <div className="flex items-center gap-3 text-muted-foreground mt-8">
              <Sparkles className="w-5 h-5" />
              <p>AI where it counts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          {/* Problem Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Finding meaningful work shouldn't be a full-time job itself.
            </h2>
          </div>
          
          {/* Problem Columns */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {/* Column 3: Fit Mismatch */}
                        <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
              <div className="bg-pink-50 p-6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">⚖️</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Fit Mismatch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Struggle to find where both skills AND values align</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Forced to choose between career growth and impact</p>
                </li>
              </ul>
            </div>
            {/* Column 1: Time Wasted */}
            <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-50 p-6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">⏱️</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Time Wasted</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Endless hours spent researching companies</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Sifting through generic job boards with no focus on impact</p>
                </li>
              </ul>
            </div>
            
            {/* Column 2: Missed Opportunities */}
            <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
              <div className="bg-pink-50 p-6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">🔍</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Missed Opportunities</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Hidden impact roles never reach job boards</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-destructive/10 p-1 rounded-full mt-1">
                    <span className="block w-2 h-2 bg-destructive rounded-full" />
                  </span>
                  <p>Roles filled through relationships, not applications</p>
                </li>
              </ul>
            </div>
            

          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-background/50 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Divider/Transition */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Where Purpose Meets Opportunity
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We connect mission-driven talent with impact startups that share your values.
            </p>
          </div>
          
          {/* Solution Columns */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Column 1: Discover */}
            <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">🎯</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Discover</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Find opportunities at companies aligned with your values</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Opportunities based on both your skills AND purpose</p>
                </div>
              </div>
            </div>
            
            {/* Column 2: Connect */}
            <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">🤝</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Connect</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Connect directly with decision-makers</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Stand out with insights that matter</p>
                </div>
              </div>
            </div>
            
            {/* Column 3: Build */}
            <div className="space-y-4 text-left">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p6 rounded-full flex items-center justify-center w-16 h-16">
                  <div className="text-2xl">🌱</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Build</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Build relationships that lead to roles crafted around your strengths</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Get tools and support to bring your impact ideas to life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            How We Help You Make an Impact
          </h2>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Feature 1: North Star Definition */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5">
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">North Star Definition</h3>
            <p className="text-gray-600 mb-6">
              Clarify your unique combo of skills and values
            </p>
            
            {/* Visual: Tags */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Your Impact Areas & Skills</p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  Sustainability
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  Product Management
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  Clean Energy
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  UX Design
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 2: Opportunity Fit */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5">
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Opportunity Fit</h3>
            <p className="text-gray-600 mb-6">
              Discover value aligned companies
            </p>
            
            {/* Visual: Startup list */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-500">Impact Aligned Startups</p>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-xs font-medium">10</span>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3 py-1">
                  <p className="font-medium text-sm">4 actively hiring product managers</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <p className="font-medium text-sm">6 likely looking for your skillset</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">recently raised</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">announced new product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 3: Outreach & Positioning */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="mb-5">
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Outreach & Positioning</h3>
            <p className="text-gray-600 mb-6">
              Reach out to the right people with personalized insights
            </p>
            
            {/* Visual: Personalized message */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">JD</div>
                <div>
                  <p className="font-medium text-sm">Jane Doe, CTO</p>
                  <p className="text-xs text-gray-500">ClimateOS</p>
                </div>
              </div>
              
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm">
                  <span className="font-bold">Personalized message:</span> "I noticed your recent article on product-led climate solutions. Your approach to carbon tracking aligns with my work at..."
                </p>
              </div>
            </div>
          </div>
          
       {/* Feature 4: Impact Incubation */}
       <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all relative">
            <div className="absolute top-3 right-3">
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</span>
            </div>
            <div className="mb-5">
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Impact Incubation</h3>
            <p className="text-gray-600 mb-6">
              Access tools to bring your ideas to life
            </p>
            
            {/* Visual: Toolkit steps */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Startup Toolkit</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">1</div>
                  <p className="text-sm">Problem validation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">2</div>
                  <p className="text-sm">Solution design</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">3</div>
                  <p className="text-sm">User testing</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">4</div>
                  <p className="text-sm">MVP development</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">5</div>
                  <p className="text-sm">Launch strategy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Paths Section */}
      <section className="py-24 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">Choose Your Path</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                Land Your Next Job
                <ArrowUpRight className="w-5 h-5" />
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>Access hidden opportunities at impact startups</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>Direct connections to decision makers</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>Company insights to demonstrate your fit</p>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </Card>
            <Card className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                Create Your Venture
                <ArrowUpRight className="w-5 h-5" />
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>Frameworks to validate your idea</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>AI tools to build an MVP</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <p>Hands-on support and guidance</p>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Startup looking for talent?</h2>
            <p className="text-xl text-muted-foreground">
              Join our curated directory of impact-driven companies and connect with mission-aligned professionals who share your vision for positive change.
            </p>
            <Button size="lg" asChild>
              <Link href="/company-signup">
                List Your Company
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
              <p>We&apos;re building the app we wish existed. Tired of endless research and wasted money on AI tools that were bandaids to a broken system.</p>
              <p>As a mission-driven team, we believe in the power of businesses creating real tangible impact. We&apos;re here to help you cut through the noise and connect with the right work - whether through an existing startup or creating your own.</p>
            </div>
            <Button 
              size="lg" 
              className="mt-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Join Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What types of companies will I find?</h3>
              <p className="text-muted-foreground">We focus on impact-driven startups and companies, particularly those backed by impact investors, working in areas like sustainability, public health, education, and economic opportunity.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Are all the companies actively hiring?</h3>
              <p className="text-muted-foreground">While we prioritize companies with active posts, we&apos;ve found that most startups either don&apos;t have updated job posts or create positions based on fit.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Do I have to choose between joining a company or starting my own?</h3>
              <p className="text-muted-foreground">Not at all. Many users explore both paths simultaneously. Our platform helps you assess which direction is best for your skills, interests, and impact goals.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What are the costs?</h3>
              <p className="text-muted-foreground">We offer both free and premium tiers. Get early access now to be the first to know about our pricing and features.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}