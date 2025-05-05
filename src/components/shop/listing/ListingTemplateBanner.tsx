
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Template } from "@/lib/types";

interface ListingTemplateBannerProps {
  template: Template;
  subcategoryId?:any;
}

const ListingTemplateBanner: React.FC<ListingTemplateBannerProps> = ({ template }) => {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertTitle>Using template: {template.name}</AlertTitle>
      <AlertDescription>
        This template has {template.fields.length} predefined fields to help you create a standardized listing.
      </AlertDescription>
    </Alert>
  );
};

export default ListingTemplateBanner;
