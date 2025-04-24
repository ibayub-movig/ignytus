import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

export function QuickSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'quick' }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message ?? 'Unknown error');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-8">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className="h-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || submitted}
          required
        />
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 px-8" 
          disabled={isSubmitting || submitted}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : submitted ? (
            "Thanks for joining!"
          ) : (
            <>
              Get Early Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </>
  );
}