"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, BookOpen, Image } from "lucide-react";
import { SupascribeEmbed } from "@/components/supascribe-embed";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  author: string;
  enclosure?: {
    link: string;
    type: string;
  };
  thumbnail?: string;
}

interface RSSResponse {
  status: string;
  feed: {
    title: string;
    description: string;
  };
  items: SubstackPost[];
}

export default function WeeklyRoundupPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIgnytPosts();
  }, []);

  async function fetchIgnytPosts() {
    try {
      setLoading(true);
      setError(null);
      
      const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fignyt.substack.com%2Ffeed`;
      const response = await fetch(feedUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feed');
      }
      
      const data: RSSResponse = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('RSS feed returned error status');
      }

      // Filter posts that contain "Ignyt" in the title (case-insensitive)
      const ignytPosts = data.items.filter(item => 
        item.title.toLowerCase().includes('weekly')
      );

      setPosts(ignytPosts);
    } catch (err) {
      console.error('Error fetching Substack posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  function extractImageUrl(post: SubstackPost): string | null {
    // Check thumbnail first (common in RSS feeds)
    if (post.thumbnail) {
      console.log('Using thumbnail:', post.thumbnail);
      return post.thumbnail;
    }

    // Check enclosure (media attachments)
    if (post.enclosure && post.enclosure.type?.startsWith('image/')) {
      console.log('Using enclosure:', post.enclosure.link);
      return post.enclosure.link;
    }

    // Try multiple patterns to extract images from content and description
    const content = post.content + ' ' + (post.description || '');
    const patterns = [
      /<img[^>]+src=["']([^"']+)["'][^>]*>/i,  // Standard img tag with quotes
      /<img[^>]+src=([^\s>]+)[^>]*>/i,         // Img tag without quotes
      /https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^\s]*)?/i, // Direct URLs
      /<media:content[^>]+url=["']([^"']+)["']/i, // Media RSS
      /<enclosure[^>]+url=["']([^"']+)["']/i,  // Enclosure tag
      /src=["']([^"']*\.(?:jpg|jpeg|png|gif|webp)[^"']*)["']/i, // Specific image extensions
      /cdn\.substack\.com[^\s"']+\.(?:jpg|jpeg|png|gif|webp)/i, // Substack CDN images
      /substackcdn\.com[^\s"']+\.(?:jpg|jpeg|png|gif|webp)/i   // Alternative Substack CDN
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        const url = match[1] || match[0];
        if (url && url.includes('.')) {
          console.log('Found image URL via pattern:', url);
          return url;
        }
      }
    }
    
    console.log('No image found in post:', post.title);
    console.log('Content preview:', content.substring(0, 500));
    return null;
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function stripHtml(html: string): string {
    return decodeHtmlEntities(html.replace(/<[^>]*>/g, '')).substring(0, 150) + '...';
  }

  function decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Weekly Roundup</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest startups and opportunities to do well by doing good 
          </p>
            <div className="mt-8 flex justify-center">
              <SupascribeEmbed variant="default" />
            </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {loading && (
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="w-full md:w-64 h-48" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-destructive mb-4">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg font-medium">Failed to load posts</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No Ignyt posts found</h2>
              <p className="text-muted-foreground">
                We couldn&apos;t find any posts with &quot;Ignyt&quot; in the title. Check back later for updates!
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  Latest Posts ({posts.length} {posts.length === 1 ? 'post' : 'posts'})
                </h2>
              </div>

              <div className="space-y-6">
                {posts.map((post, index) => {
                  const imageUrl = extractImageUrl(post);
                  
                  return (
                    <a
                      key={index}
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden flex-shrink-0">
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={decodeHtmlEntities(post.title)}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  console.log('Image failed to load:', imageUrl);
                                  const target = e.currentTarget;
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  target.style.display = 'none';
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className={`w-full h-full bg-muted flex items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
                              style={{ display: imageUrl ? 'none' : 'flex' }}
                            >
                              <Image className="w-12 h-12 text-muted-foreground/50" />
                            </div>
                          </div>
                          
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.pubDate)}
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {decodeHtmlEntities(post.title)}
                            </h3>
                            
                            <p className="text-muted-foreground line-clamp-3">
                              {stripHtml(post.description || post.content)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {!loading && posts.length > 0 && (
          <div className="mt-16 text-center p-8">
            <div className="flex justify-center">
              <SupascribeEmbed variant="default" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}