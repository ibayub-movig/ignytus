import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DirectoryErrorProps {
  error: string;
}

export function DirectoryError({ error }: DirectoryErrorProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Loading Directory</AlertTitle>
      <AlertDescription className="mt-2">
        {error}
        <p className="mt-2 text-sm">
          Please check your internet connection and try again. If the problem persists, the service may be temporarily unavailable.
        </p>
      </AlertDescription>
    </Alert>
  );
}