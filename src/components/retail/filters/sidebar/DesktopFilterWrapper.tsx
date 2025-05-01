
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface DesktopFilterWrapperProps {
  onClearAll: () => void;
  children: ReactNode;
}

const DesktopFilterWrapper = ({ 
  onClearAll,
  children
}: DesktopFilterWrapperProps) => {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default DesktopFilterWrapper;
