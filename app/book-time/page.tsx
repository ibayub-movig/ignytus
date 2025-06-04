"use client";

import { useEffect } from "react";

export default function BookTimePage() {
  useEffect(() => {
    // Load the Fillout script
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
            Book a Time to Chat
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's discuss how we can help you build your purpose-driven career.
          </p>
        </div>

        {/* Fillout Form */}
        <div className="max-w-3xl mx-auto">
          <div 
            style={{ width: "100%", height: "500px" }} 
            data-fillout-id="iUai5HcXGKus" 
            data-fillout-embed-type="standard" 
            data-fillout-inherit-parameters 
            data-fillout-dynamic-resize 
            data-fillout-domain="signup.getmovig.com"
          />
        </div>
      </div>
    </main>
  );
} 