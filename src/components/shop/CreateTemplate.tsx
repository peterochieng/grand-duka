
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Template, TemplateField } from "@/lib/types";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TemplateInformation from './template/TemplateInformation';
import TemplateFields from './template/TemplateFields';

interface CreateTemplateProps {
  existingTemplate?: Template;
}

const CreateTemplate: React.FC<CreateTemplateProps> = ({ existingTemplate }) => {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState(existingTemplate?.name || '');
  const [templateCategory, setTemplateCategory] = useState(existingTemplate?.category || '');
  const [templateType, setTemplateType] = useState<'standard' | 'custom' | 'local'>(existingTemplate?.type || 'local');
  const [fields, setFields] = useState<TemplateField[]>(existingTemplate?.fields || []);
  
  const addField = () => {
    const newField: TemplateField = {
      id: `field-${Date.now()}`,
      name: '',
      type: 'text',
      required: false,
    };
    setFields([...fields, newField]);
  };
  
  const updateField = (index: number, updates: Partial<TemplateField>) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], ...updates };
    setFields(updatedFields);
  };
  
  const removeField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };
  
  const moveField = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }
    
    const updatedFields = [...fields];
    const offset = direction === 'up' ? -1 : 1;
    const field = updatedFields[index];
    updatedFields[index] = updatedFields[index + offset];
    updatedFields[index + offset] = field;
    setFields(updatedFields);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!templateCategory.trim()) {
      toast({
        title: "Error",
        description: "Category is required",
        variant: "destructive",
      });
      return;
    }
    
    if (fields.length === 0) {
      toast({
        title: "Error",
        description: "At least one field is required",
        variant: "destructive",
      });
      return;
    }
    
    const emptyFieldIndex = fields.findIndex(field => !field.name.trim());
    if (emptyFieldIndex !== -1) {
      toast({
        title: "Error",
        description: `Field #${emptyFieldIndex + 1} is missing a name`,
        variant: "destructive",
      });
      return;
    }
    
    const template: Template = {
      id: existingTemplate?.id || `template-${Date.now()}`,
      name: templateName,
      category: templateCategory,
      type: templateType,
      fields: fields,
      createdAt: existingTemplate?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (templateType === 'custom') {
      template.approvalStatus = 'pending';
      template.createdBy = 'currentUser';
    }
    
    console.log('Template created:', template);
    
    toast({
      title: existingTemplate ? "Template Updated" : "Template Created",
      description: templateType === 'custom' 
        ? "Your custom template has been submitted for approval."
        : "Your template has been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">
          {existingTemplate ? 'Edit Template' : 'Create New Template'}
        </h1>
        <p className="text-muted-foreground">
          Define a structured template for your product listings
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <TemplateInformation
          templateName={templateName}
          setTemplateName={setTemplateName}
          templateCategory={templateCategory}
          setTemplateCategory={setTemplateCategory}
          templateType={templateType}
          setTemplateType={setTemplateType}
        />
        
        <TemplateFields
          fields={fields}
          onAddField={addField}
          onUpdateField={updateField}
          onRemoveField={removeField}
          onMoveField={moveField}
        />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {existingTemplate ? 'Update Template' : 'Save Template'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTemplate;
