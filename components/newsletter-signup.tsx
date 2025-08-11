import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  variant?: 'default' | 'hero';
}

export function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Debug: Log the email
      console.log('Email being submitted:', email);
      
      // Build the Substack subscribe URL with proper parameters
      // Using the subscribe URL with additional parameters to skip confirmation
      const encodedEmail = encodeURIComponent(email);
      const subscribeUrl = `https://ignyt.substack.com/subscribe?just_signed_up=true&skip_redirect_check=true&utm_medium=web&utm_source=embed&freeSignupEmail=${encodedEmail}&auto_confirm=true&no_confirmation=true`;
      
      // Debug: Log the URL to console
      console.log('Substack URL:', subscribeUrl);
      
      // Open Substack subscribe page in a new tab
      window.open(subscribeUrl, '_blank');
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Failed to open subscription page. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "w-full rounded-lg border bg-card text-card-foreground shadow-sm",
      variant === 'hero' ? 'max-w-lg p-6' : 'p-4'
    )}>
      <div className="space-y-2 mb-4">
        <h3 className={cn(
          "font-semibold leading-none tracking-tight",
          variant === 'hero' ? 'text-xl' : 'text-lg'
        )}>
          Subscribe to our newsletter
        </h3>
        <p className="text-sm text-muted-foreground">
          Get weekly insights on purpose-driven careers and impact
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className={cn(
            "w-full",
            variant === 'hero' ? 'h-14 text-lg' : 'h-11'
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || submitted}
          required
        />
        <Button 
          type="submit" 
          className={cn(
            "w-full",
            variant === 'hero' ? 'h-14 text-lg' : 'h-11'
          )}
          disabled={isSubmitting || submitted}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : submitted ? (
            "Check your email to confirm!"
          ) : (
            <>
              Subscribe to newsletter
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
