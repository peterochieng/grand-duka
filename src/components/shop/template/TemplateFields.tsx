
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { TemplateField } from "@/lib/types";
import FieldCard from './FieldCard';

interface TemplateFieldsProps {
  fields: TemplateField[];
  onAddField: () => void;
  onUpdateField: (index: number, updates: Partial<TemplateField>) => void;
  onRemoveField: (index: number) => void;
  onMoveField: (index: number, direction: 'up' | 'down') => void;
}

const TemplateFields: React.FC<TemplateFieldsProps> = ({
  fields,
  onAddField,
  onUpdateField,
  onRemoveField,
  onMoveField
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Template Fields</CardTitle>
          <Button type="button" onClick={onAddField} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
        <CardDescription>
          Define the fields that sellers will need to complete when using this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium">No fields defined</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add fields to define what information sellers need to provide
            </p>
            <Button type="button" onClick={onAddField} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Field
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <FieldCard
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                onUpdate={(updates) => onUpdateField(index, updates)}
                onRemove={() => onRemoveField(index)}
                onMove={(direction) => onMoveField(index, direction)}
              />
            ))}
            
            <Button type="button" onClick={onAddField} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Field
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateFields;
