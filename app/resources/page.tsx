"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from '@/lib/supabase';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Mail, 
  Building2,
  AlertCircle,
  Filter,
  Plus
} from "lucide-react";

interface Resource {
  id: number;
  title: string;
  url: string;
  type: string;
  priority: string;
  focus: string;
  value: string;
  created_at: string;
}

const typeIcons = {
  "Job Board": Briefcase,
  "Newsletter": Mail,
  "Community": Users,
  "Accelerator": TrendingUp,
  "Thought Leader": BookOpen,
  "Platform": Building2
};

const typeColors = {
  "Job Board": "bg-blue-100 text-blue-800 border-blue-200",
  "Newsletter": "bg-purple-100 text-purple-800 border-purple-200",
  "Community": "bg-green-100 text-green-800 border-green-200",
  "Accelerator": "bg-orange-100 text-orange-800 border-orange-200",
  "Thought Leader": "bg-pink-100 text-pink-800 border-pink-200",
  "Platform": "bg-indigo-100 text-indigo-800 border-indigo-200"
};





export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("status", "Live")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: false });
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setResources(data || []);
      setLoading(false);
    }
    fetchResources();
  }, []);

  // Get unique types and priorities for filters
  const availableTypes = useMemo(() => {
    return Array.from(new Set(resources.map(resource => resource.type))).sort();
  }, [resources]);



  // Filter resources based on type
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesType = selectedType === "" || resource.type === selectedType;
      return matchesType;
    });
  }, [resources, selectedType]);

  const clearFilters = () => {
    setSelectedType("");
  };

  return (
    <main className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Curated tools, communities, and insights to help you build a purpose-driven career
          </p>
        </div>

        {/* Submit Button and Filters */}
        <div className="mb-8 space-y-4">
          {/* Submit Button */}
          <div className="flex justify-center">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit Resource
          </Button>
        </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Submit a Resource</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      title: formData.get('title') as string,
                      url: formData.get('url') as string,
                      type: formData.get('type') as string,
                      focus: formData.get('focus') as string,
                      value: formData.get('value') as string,
                    };

                    await fetch('/api/submit-resource', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                    });

                    // Close dialog and show notification
                    setIsDialogOpen(false);
                    alert('Submitted successfully! We\'ll review your resource soon.');
                  }}
                  className="grid gap-4 py-4"
                >
                  
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="title">Resource Title</Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      placeholder="Enter resource title"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      required
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="focus">Focus Area</Label>
                    <Input
                      id="focus"
                      name="focus"
                      required
                      placeholder="What does this resource focus on?"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="value">Description</Label>
                    <Textarea
                      id="value"
                      name="value"
                      required
                      placeholder="Describe the value this resource provides"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              variant={selectedType === "" ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
              onClick={() => setSelectedType("")}
            >
              All Types
            </Badge>
            {availableTypes.map(type => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1.5"
                onClick={() => setSelectedType(selectedType === type ? "" : type)}
              >
                {type}
              </Badge>
            ))}
          </div>

          {selectedType && (
            <div className="flex justify-center">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="animate-spin mr-2"><Plus className="w-6 h-6 text-primary" /></span>
            <span className="text-lg font-medium text-muted-foreground">Loading resources...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-destructive mb-2" />
            <span className="text-lg font-medium text-destructive">{error}</span>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredResources.length === 0 && (
          <div className="flex flex-col items-center py-12">
            <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-lg font-medium text-muted-foreground">
              {resources.length === 0 ? "No resources found." : "No resources match your criteria."}
            </span>
            {selectedType && (
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear filters
              </Button>
            )}
          </div>
        )}

        {/* Resources Grid */}
        {!loading && !error && filteredResources.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons] || Building2;
              
              return (
                <Card key={resource.id} className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
                  <div className="p-6 flex flex-col h-full">
                    {/* Header with Type Icon */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${typeColors[resource.type as keyof typeof typeColors] || 'bg-gray-100'}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>

                    {/* Focus */}
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      {resource.focus}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                      {resource.value}
                    </p>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && filteredResources.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        )}
      </div>
    </main>
  );
} 