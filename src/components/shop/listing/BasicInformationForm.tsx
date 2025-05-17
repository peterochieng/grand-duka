import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import CategoryFieldsMapper from './category-fields/CategoryFieldsMapper';
import { TemplateField } from '@/services/useBasicInfoTemplate';

interface BasicInformationFormProps {
  selectedProduct: any;
  presetCategory: string;
  basicInfo: { [key: string]: string };
  onBasicInfoChange: (fieldKey: string, value: string) => void;
  // New optional prop for dynamic basic info template
  basicInfoTemplate?: TemplateField[] | null;
}

const BasicInformationForm: React.FC<BasicInformationFormProps> = ({ 
  selectedProduct, 
  presetCategory,
  basicInfo,
  onBasicInfoChange,
  basicInfoTemplate
}) => {
  
  // Utility: render label with required indicator if applicable.
  const renderLabel = (label: string, required?: boolean) => (
    <span>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </span>
  );
  
  // If a dynamic template is provided, render fields based on it.
  const renderFields = () => {
    if (basicInfoTemplate && basicInfoTemplate.length > 0) {
      return basicInfoTemplate.map((field, index) => {
        const key = field.id || field.label;
        if (field.type === 'textarea') {
          return (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {renderLabel(field.label, field.required)}
              </label>
              <Textarea 
                id={key}
                placeholder={field.label}
                rows={5}
                value={basicInfo[key] || ""}
                onChange={(e) => onBasicInfoChange(key, e.target.value)}
              />
            </div>
          );
        } else if (field.type === 'select' && field.options) {
          return (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {renderLabel(field.label, field.required)}
              </label>
              <select 
                id={key}
                value={basicInfo[key] || ""}
                onChange={(e) => onBasicInfoChange(key, e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">-- Select --</option>
                {field.options.split(',').map(option => (
                  <option key={option.trim()} value={option.trim()}>
                    {option.trim()}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {renderLabel(field.label, field.required)}
              </label>
              <input 
                type="text" 
                id={key}
                placeholder={field.label}
                value={basicInfo[key] || ""}
                onChange={(e) => onBasicInfoChange(key, e.target.value)}
                className="border rounded p-2 w-full"
              />
            </div>
          );
        }
      });
    } else {
      // Default layout with clear labels for required fields.
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {renderLabel("Title", true)}
            </label>
            <input 
              type="text" 
              placeholder="Enter the title"
              value={basicInfo.title}
              onChange={(e) => onBasicInfoChange("title", e.target.value)}
              className="border rounded p-2 w-full mb-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {renderLabel("Description", true)}
            </label>
            <Textarea 
              id="description" 
              placeholder="Describe your item in detail"
              rows={5}
              value={basicInfo.description}
              onChange={(e) => onBasicInfoChange("description", e.target.value)}
            />
          </div>
          {presetCategory && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">{presetCategory} Details</h3>
              <CategoryFieldsMapper category={presetCategory} /> 
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {renderFields()}
    </div>
  );
};

export default BasicInformationForm;