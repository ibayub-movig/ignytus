import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Route } from 'next';

const posts = [
  {
    title: "Building a Purpose-Driven Career in Tech",
    slug: "purpose-driven-career",
    excerpt: "Discover how to align your technical skills with meaningful impact and find fulfilling work in the startup ecosystem.",
    date: "May 5, 2025",
    readTime: "2 min read"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
              Impact Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Practical advice for building a meaningful career in the impact space.
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}` as Route} 
                className="no-underline"
              >
                <Card className="p-6 transition-colors hover:bg-muted/50">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight inline-flex items-center group">
                        {post.title}
                        <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                      </h2>
                      <div className="text-sm text-muted-foreground no-underline">
                        {post.date} · {post.readTime}
                      </div>
                    </div>
                    <p className="text-muted-foreground no-underline">{post.excerpt}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}