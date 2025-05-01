
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { KycManagement } from '../users/KycManagement';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface KycManagerTabProps {
  onBack?: () => void;
}

export const KycManagerTab = ({ onBack }: KycManagerTabProps) => {
  return (
    <>
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      )}
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">KYC & Verification Management</CardTitle>
          <CardDescription>
            Manage user identity verification requirements and review KYC submissions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <KycManagement />
        </CardContent>
      </Card>
    </>
  );
};
