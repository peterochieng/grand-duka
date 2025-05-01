
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Check, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const VerificationStatus = () => {
  const { user, loading } = useCurrentUser();
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view verification status.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Check if KYC is required for this user
  const isKycRequired = user.kyc_required !== false;
  
  // If KYC is not required, show a message
  if (!isKycRequired) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 mb-4">
            <p className="text-blue-800 dark:text-blue-300">
              KYC verification has been disabled for your account by an administrator.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>Email Address</span>
              </div>
              <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
                <Check className="h-3 w-3" /> Verified
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>Phone Number</span>
              </div>
              <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
                <Check className="h-3 w-3" /> Verified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render the KYC status based on kyc_status field
  const renderKycStatus = () => {
    switch(user.kyc_status) {
      case 'verified':
        return (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
            <Check className="h-3 w-3" /> Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      case 'not_started':
      default:
        return (
          <Badge className="flex items-center gap-1" variant="outline">
            Not Started
          </Badge>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>Email Address</span>
            </div>
            <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
              <Check className="h-3 w-3" /> Verified
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>Phone Number</span>
            </div>
            <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
              <Check className="h-3 w-3" /> Verified
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>Identity Verification</span>
            </div>
            {renderKycStatus()}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>Address Verification</span>
            </div>
            <Badge className="flex items-center gap-1" variant="outline">
              Not Started
            </Badge>
          </div>
        </div>
        
        {(user.kyc_status === 'not_started' || user.kyc_status === 'rejected') && (
          <div className="mt-4">
            <Button className="w-full" asChild>
              <Link to="/kyc-verification">
                {user.kyc_status === 'rejected' ? 'Retry Verification' : 'Start Verification'}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
