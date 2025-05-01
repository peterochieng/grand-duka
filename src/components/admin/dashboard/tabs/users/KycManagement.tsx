import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useKycManagement } from '@/hooks/admin/useKycManagement';
import { GlobalKycToggle } from './kyc/GlobalKycToggle';
import { UserSearch } from './kyc/UserSearch';
import { BypassedUsersList } from './kyc/BypassedUsersList';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";

export const KycManagement = () => {
  const {
    isGlobalDialogOpen,
    setIsGlobalDialogOpen,
    isUserDialogOpen,
    setIsUserDialogOpen,
    isGlobalKycEnabled,
    isLoading,
    isBypassLoading,
    targetUserId,
    setTargetUserId,
    targetUserEmail,
    setTargetUserEmail,
    userSearchTerm,
    setUserSearchTerm,
    searchResults,
    isSearching,
    bypassedUsers,
    handleToggleGlobalKyc,
    handleSearchUser,
    handleToggleUserKyc
  } = useKycManagement();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          KYC Verification Management
        </CardTitle>
        <CardDescription>
          Control identity verification requirements for users in the marketplace
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <GlobalKycToggle
          isOpen={isGlobalDialogOpen}
          onOpenChange={setIsGlobalDialogOpen}
          isEnabled={isGlobalKycEnabled}
          isLoading={isLoading}
          onToggle={handleToggleGlobalKyc}
        />
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">User-Specific KYC Bypass</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enable or disable KYC verification for specific users
          </p>
          
          <UserSearch
            searchTerm={userSearchTerm}
            setSearchTerm={setUserSearchTerm}
            onSearch={handleSearchUser}
            isSearching={isSearching}
            searchResults={searchResults}
            onSelectUser={(id, email) => {
              setTargetUserId(id);
              setTargetUserEmail(email);
            }}
          />
          
          {targetUserId && (
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <div className="flex items-center justify-between border p-3 rounded-md mt-4">
                <div>
                  <p className="font-medium">{targetUserEmail}</p>
                  <p className="text-sm text-muted-foreground">ID: {targetUserId}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsUserDialogOpen(true)}
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Enable KYC
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsUserDialogOpen(true)}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Bypass KYC
                  </Button>
                </div>
              </div>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {targetUserEmail}
                  </DialogTitle>
                  <DialogDescription>
                    Do you want to enable or bypass KYC verification for this user?
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex justify-between gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleToggleUserKyc(true)}
                    disabled={isBypassLoading}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Enable KYC
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleToggleUserKyc(false)}
                    disabled={isBypassLoading}
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Bypass KYC
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          <BypassedUsersList
            users={bypassedUsers}
            onRestoreKyc={(userId, userEmail) => {
              setTargetUserId(userId);
              setTargetUserEmail(userEmail);
              setIsUserDialogOpen(true);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
