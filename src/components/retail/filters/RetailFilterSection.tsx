
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RetailFilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const RetailFilterSection = ({ 
  title, 
  defaultOpen = false,
  children,
  className
}: RetailFilterSectionProps) => {
  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={defaultOpen ? title : undefined}
      className={className}
    >
      <AccordionItem value={title}>
        <AccordionTrigger className="text-base font-medium">{title}</AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RetailFilterSection;
