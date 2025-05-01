
import React from 'react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/lib/types';
import { ExtendedCategory, hasSpecialSubcategories } from '@/lib/types/extendedCategoryTypes';

interface SpecializedSubcategoryFilterProps {
  category: Category;
  selectedValues: Record<string, string[]>;
  onChange: (section: string, value: string, checked: boolean) => void;
}

const SpecializedSubcategoryFilter: React.FC<SpecializedSubcategoryFilterProps> = ({ 
  category, 
  selectedValues, 
  onChange 
}) => {
  // Early return if the category doesn't have specialized subcategories
  if (!hasSpecialSubcategories(category)) return null;
  
  // At this point TypeScript knows category is ExtendedCategory
  const sections = Object.keys(category.specialSubcategories);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Label className="text-sm font-medium">Specialized Categories</Label>
      </div>
      
      <Accordion type="multiple" className="w-full">
        {sections.map(section => (
          <AccordionItem key={section} value={section}>
            <AccordionTrigger className="text-sm py-2">{section}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-1">
                {category.specialSubcategories[section].map(value => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`specialized-${section}-${value}`}
                      checked={selectedValues[section]?.includes(value)}
                      onCheckedChange={(checked) => {
                        onChange(section, value, checked === true);
                      }}
                    />
                    <Label 
                      htmlFor={`specialized-${section}-${value}`} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SpecializedSubcategoryFilter;
