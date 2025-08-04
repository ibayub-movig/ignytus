import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

interface QuickSignupProps {
  variant?: 'default' | 'hero';
}

export function QuickSignup({ variant = 'default' }: QuickSignupProps) {
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
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 w-full ${variant === 'hero' ? 'max-w-lg' : ''}`}>
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className={variant === 'hero' ? 'h-14 text-lg' : 'h-11'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || submitted}
          required
        />
        <Button 
          type="submit" 
          className={variant === 'hero' ? 'h-14 text-lg' : 'h-11'} 
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
              Find good work 
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