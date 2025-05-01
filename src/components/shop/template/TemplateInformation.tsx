
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TemplateInformationProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  templateCategory: string;
  setTemplateCategory: (category: string) => void;
  templateType: 'standard' | 'custom' | 'local';
  setTemplateType: (type: 'standard' | 'custom' | 'local') => void;
}

const TemplateInformation: React.FC<TemplateInformationProps> = ({
  templateName,
  setTemplateName,
  templateCategory,
  setTemplateCategory,
  templateType,
  setTemplateType
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name</Label>
          <Input 
            id="template-name" 
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="e.g., Smartphone Listing, Vintage Watch" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template-category">Category</Label>
          <Select value={templateCategory} onValueChange={setTemplateCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Vehicles">Vehicles</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Home & Garden">Home & Garden</SelectItem>
              <SelectItem value="Watches">Watches</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template-type">Template Type</Label>
          <Select value={templateType} onValueChange={setTemplateType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">
                Local Template (private)
              </SelectItem>
              <SelectItem value="custom">
                Custom Template (requires approval)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Standard templates can only be created by platform administrators.
          </p>
        </div>

        {templateType === 'custom' && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertTitle>Custom Template</AlertTitle>
            <AlertDescription>
              Custom templates require approval before they become available to all sellers.
              This ensures consistency and quality across the platform.
            </AlertDescription>
          </Alert>
        )}
        
        {templateType === 'local' && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Local Template</AlertTitle>
            <AlertDescription>
              Local templates are only available to you and won't be shared with other sellers.
              Note that local templates may not be supported during platform updates.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateInformation;
