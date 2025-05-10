
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VerificationSuccess = () => {
  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Verification Submitted</h2>
        <p className="text-muted-foreground">
          Your identity verification documents have been submitted successfully.
          Our team will review your submission and update your account status.
        </p>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md text-sm">
        <p className="font-medium mb-1">What happens next?</p>
        <ol className="list-decimal list-inside text-left space-y-1 text-muted-foreground">
          <li>Our team will review your documents (usually within 24-48 hours)</li>
          <li>You'll receive an email notification once verification is complete</li>
          <li>Once verified, you'll have full access to all platform features</li>
        </ol>
      </div>
      
      <div className="pt-4">
        <Link to="/signin">
          <Button>
            Please sign in to your account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;
