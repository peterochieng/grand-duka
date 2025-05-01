
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, MoveVertical } from "lucide-react";
import { TemplateField } from "@/lib/types";

interface FieldCardProps {
  field: TemplateField;
  index: number;
  totalFields: number;
  onUpdate: (updates: Partial<TemplateField>) => void;
  onRemove: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  index,
  totalFields,
  onUpdate,
  onRemove,
  onMove
}) => {
  return (
    <Card className="relative">
      <CardContent className="pt-4">
        <div className="absolute right-2 top-2 flex space-x-1">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => onMove('up')}
            disabled={index === 0}
            className="h-8 w-8 p-0"
          >
            <MoveVertical className="h-4 w-4 rotate-180" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => onMove('down')}
            disabled={index === totalFields - 1}
            className="h-8 w-8 p-0"
          >
            <MoveVertical className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-2">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor={`field-name-${index}`}>Field Name</Label>
            <Input 
              id={`field-name-${index}`} 
              value={field.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g., Brand, Model, Size" 
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor={`field-type-${index}`}>Field Type</Label>
            <Select 
              value={field.type} 
              onValueChange={(value: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'image') => 
                onUpdate({ type: value })
              }
            >
              <SelectTrigger id={`field-type-${index}`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Yes/No</SelectItem>
                <SelectItem value="select">Dropdown</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-1 space-y-2">
            <Label className="block mb-2">Required</Label>
            <Switch 
              checked={field.required}
              onCheckedChange={(checked) => onUpdate({ required: checked })}
            />
          </div>
          
          <div className="md:col-span-1 flex items-center justify-center">
            <Badge variant="outline">
              Field #{index + 1}
            </Badge>
          </div>
        </div>
        
        {field.type === 'select' && (
          <div className="mt-4 space-y-2">
            <Label htmlFor={`field-options-${index}`}>Options (comma separated)</Label>
            <Textarea 
              id={`field-options-${index}`} 
              value={field.options?.join(', ') || ''}
              onChange={(e) => {
                const options = e.target.value.split(',').map(opt => opt.trim()).filter(Boolean);
                onUpdate({ options });
              }}
              placeholder="Option 1, Option 2, Option 3" 
            />
          </div>
        )}
        
        {(field.type === 'text' || field.type === 'number') && (
          <div className="mt-4 space-y-2">
            <Label htmlFor={`field-default-${index}`}>Default Value (optional)</Label>
            <Input 
              id={`field-default-${index}`} 
              type={field.type === 'number' ? 'number' : 'text'}
              value={field.defaultValue !== undefined ? String(field.defaultValue) : ''}
              onChange={(e) => {
                const value = field.type === 'number' ? Number(e.target.value) : e.target.value;
                onUpdate({ defaultValue: value });
              }}
              placeholder="Default value" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldCard;
