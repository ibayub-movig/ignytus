"use client"

import { Flame, ArrowRight, Sparkles, Target, Building2, MessageSquareMore, Rocket, CheckCircle2, ArrowUpRight } from "lucide-react";
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
              Connect with Purpose-Driven Startups
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Join a community of innovators building companies that make a difference. Find your next role or start your own venture.
            </p>

            {/* Early Access Form */}
            <QuickSignup />

            {/* Early Access Form */}

            {/* Social Proof */}
            <div className="flex items-center gap-3 text-muted-foreground mt-8">
              <Sparkles className="w-5 h-5" />
              <p>Join 200+ purpose-driven professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The Challenge</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">Finding truly impactful work shouldn&apos;t be this hard. Yet many face:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-destructive/10 p-1 rounded-full mt-1">
                      <span className="block w-2 h-2 bg-destructive rounded-full" />
                    </span>
                    <p>Difficulty finding impactful companies beyond nonprofits</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-destructive/10 p-1 rounded-full mt-1">
                      <span className="block w-2 h-2 bg-destructive rounded-full" />
                    </span>
                    <p>Application black holes and endless research</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-destructive/10 p-1 rounded-full mt-1">
                      <span className="block w-2 h-2 bg-destructive rounded-full" />
                    </span>
                    <p>Overwhelming process to start your own venture</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Approach</h2>
              <p className="text-lg text-muted-foreground">Meaningful roles aren&apos;t found through application portals. They&apos;re formed through relationships or built from scratch.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Find opportunities at companies aligned with your values</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Connect directly with decision-makers with insights to stand out</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
                  <p>Get the tools and support to bring your impact ideas to life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">How We Help You Make an Impact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 space-y-4 bg-background/60 backdrop-blur">
              <Target className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Define Your North Star</h3>
              <p className="text-muted-foreground">Clarify your unique combination of skills, values, and impact areas</p>
            </Card>
            <Card className="p-6 space-y-4 bg-background/60 backdrop-blur">
              <Building2 className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Discover Mission-Aligned Startups</h3>
              <p className="text-muted-foreground">Get matched with values-aligned companies using real-world signals</p>
            </Card>
            <Card className="p-6 space-y-4 bg-background/60 backdrop-blur">
              <MessageSquareMore className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Connect & Stand Out</h3>
              <p className="text-muted-foreground">Reach out to the right people with insights on shared missions</p>
            </Card>
            <Card className="p-6 space-y-4 bg-background/60 backdrop-blur">
              <Rocket className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Impact Idea Builder</h3>
              <p className="text-muted-foreground">Access tools to bring your ideas to life in days</p>
            </Card>
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