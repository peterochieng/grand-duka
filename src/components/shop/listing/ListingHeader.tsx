
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Product } from "@/lib/types";

interface ListingHeaderProps {
  isRelisting?: boolean;
  selectedProduct: Product | null;
  setShowImportModal: (show: boolean) => void;
  setShowTemplateManager: (show: boolean) => void;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ 
  isRelisting, 
  selectedProduct, 
  setShowImportModal, 
  setShowTemplateManager 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {isRelisting ? 'Relist Item' : selectedProduct ? 'Edit Listing' : 'Create New Listing'}
        </h1>
        <p className="text-muted-foreground">
          {isRelisting 
            ? 'Create a new listing based on your previous auction that didn\'t sell'
            : 'Fill in the details below to create your listing'}
        </p>
      </div>
      
      {!selectedProduct && !isRelisting && (
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Copy className="h-4 w-4 mr-2" />
            Import from Existing
          </Button>
          <Button onClick={() => setShowTemplateManager(true)}>
            Use Template
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListingHeader;
