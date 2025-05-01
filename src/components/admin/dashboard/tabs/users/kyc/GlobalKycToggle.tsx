
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface GlobalKycToggleProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEnabled: boolean;
  isLoading: boolean;
  onToggle: () => Promise<void>;
}

export const GlobalKycToggle = ({
  isOpen,
  onOpenChange,
  isEnabled,
  isLoading,
  onToggle
}: GlobalKycToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-medium">Global KYC Requirement</h3>
        <p className="text-sm text-muted-foreground">
          {isEnabled 
            ? "KYC verification is currently required for all users" 
            : "KYC verification is currently disabled for all users"}
        </p>
      </div>
      
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant={isEnabled ? "destructive" : "default"}>
            {isEnabled ? "Disable for All" : "Enable for All"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {isEnabled 
                ? "Disable KYC Verification?" 
                : "Enable KYC Verification?"}
            </DialogTitle>
            <DialogDescription>
              {isEnabled 
                ? "This will disable KYC verification for ALL users in the system. Users will be able to transact without identity verification. This is not recommended for production environments."
                : "This will enable KYC verification for ALL users in the system. Users will need to complete identity verification before accessing certain features."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-md border border-amber-200 dark:border-amber-900 mt-2">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <p className="font-medium">Important:</p>
                <p>This action will affect all users in the marketplace. Individual user exceptions can still be set after this change.</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant={isEnabled ? "destructive" : "default"}
              onClick={onToggle}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (isEnabled ? "Disable for All" : "Enable for All")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
