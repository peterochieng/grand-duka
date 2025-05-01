
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { 
  Sheet,
  SheetContent, 
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

interface MobileFilterDrawerProps {
  children: React.ReactNode;
  onClearAll: () => void;
}

const MobileFilterDrawer = ({ 
  children,
  onClearAll 
}: MobileFilterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mb-4">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[90vw] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your search with our filtering options
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {children}
        </div>
        
        <SheetFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={onClearAll}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;
