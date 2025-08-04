import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Flame, Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Flame className="h-6 w-6" />
          <span>Ignyt</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a
              href="/companies"
              className="nav-link"
            >
              Companies
            </a>
            <a
              href="/jobs"
              className="nav-link"
            >
              Jobs
            </a>
            <Link href="/resources" className="transition-colors hover:text-foreground/80">
              Resources
            </Link>
          </nav>

          <Button asChild className="hidden md:inline-flex">
            <Link href="/subscribe">Subscribe</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/resources" className="text-lg font-medium">
                  Resources
                </Link>
                <Button asChild className="mt-4">
                  <Link href="/subscribe">Subscribe</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}