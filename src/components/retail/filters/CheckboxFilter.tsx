
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import RetailFilterSection from './RetailFilterSection';

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  maxHeight?: string;
}

const CheckboxFilter = ({ 
  title, 
  options, 
  selectedValues, 
  onChange,
  maxHeight
}: CheckboxFilterProps) => {
  return (
    <RetailFilterSection title={title}>
      <div className={`space-y-2 pt-1 ${maxHeight ? `max-h-${maxHeight} overflow-y-auto` : ''}`}>
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox 
              id={`${title.toLowerCase()}-${option}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={(checked) => {
                onChange(option, !!checked);
              }}
            />
            <label 
              htmlFor={`${title.toLowerCase()}-${option}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </RetailFilterSection>
  );
};

export default CheckboxFilter;
