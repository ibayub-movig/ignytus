"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Flame className="h-6 w-6" />
              <span>Ignyt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Where purpose meets opportunity.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/subscribe" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Job Seekers & Builders
                </Link>
              </li>
              <li>
                <Link href="/company-signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Companies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}