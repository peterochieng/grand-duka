
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, File, Settings } from "lucide-react";
import { Template, TemplateField } from "@/lib/types/templateTypes";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const TemplateManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");
  const [templateType, setTemplateType] = useState<"standard" | "custom" | "local">("standard");
  const [templateFields, setTemplateFields] = useState<TemplateField[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Mock templates for now - would be replaced with actual data from Supabase
  const templates: Template[] = [
    {
      id: "1",
      name: "Standard Vehicle",
      category: "Vehicles",
      type: "standard",
      fields: [
        { id: "1", name: "Make", type: "text", required: true },
        { id: "2", name: "Model", type: "text", required: true },
        { id: "3", name: "Year", type: "number", required: true }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Electronics",
      category: "Electronics",
      type: "standard",
      fields: [
        { id: "1", name: "Brand", type: "text", required: true },
        { id: "2", name: "Model", type: "text", required: true }
      ],
      createdAt: new Date().toISOString()
    }
  ];

  const handleCreateTemplate = () => {
    setIsCreating(true);
    setSelectedTemplate(null);
    setTemplateName("");
    setTemplateCategory("");
    setTemplateType("standard");
    setTemplateFields([]);
  };

  const handleEditTemplate = (template: Template) => {
    setIsCreating(false);
    setSelectedTemplate(template);
    setTemplateName(template.name);
    setTemplateCategory(template.category);
    setTemplateType(template.type);
    setTemplateFields(template.fields);
  };

  const handleAddField = () => {
    const newField: TemplateField = {
      id: uuidv4(),
      name: "",
      type: "text",
      required: false
    };
    setTemplateFields([...templateFields, newField]);
  };

  const handleFieldChange = (index: number, field: Partial<TemplateField>) => {
    const updatedFields = [...templateFields];
    updatedFields[index] = { ...updatedFields[index], ...field };
    setTemplateFields(updatedFields);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...templateFields];
    updatedFields.splice(index, 1);
    setTemplateFields(updatedFields);
  };

  const handleSaveTemplate = () => {
    if (!templateName || !templateCategory || templateFields.length === 0) {
      toast.error("Please fill in all required fields and add at least one field");
      return;
    }

    // Here we would save to Supabase
    toast.success(isCreating ? "Template created" : "Template updated");
    setSelectedTemplate(null);
  };

  const filteredTemplates = templates.filter(template => {
    if (activeTab === "all") return true;
    return template.type === activeTab;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Template Library</h3>
        <Button onClick={handleCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onEdit={handleEditTemplate}
            onDelete={() => {}} // Not implemented for now
          />
        </TabsContent>
        
        <TabsContent value="standard" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onEdit={handleEditTemplate}
            onDelete={() => {}} // Not implemented for now
          />
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onEdit={handleEditTemplate}
            onDelete={() => {}} // Not implemented for now
          />
        </TabsContent>
        
        <TabsContent value="local" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onEdit={handleEditTemplate}
            onDelete={() => {}} // Not implemented for now
          />
        </TabsContent>
      </Tabs>

      <Dialog 
        open={selectedTemplate !== null || isCreating} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTemplate(null);
            setIsCreating(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Template" : "Edit Template"}</DialogTitle>
            <DialogDescription>
              Define the fields that sellers need to complete when listing products
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label htmlFor="template-category">Category</Label>
                <Select value={templateCategory} onValueChange={setTemplateCategory}>
                  <SelectTrigger id="template-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Vehicles">Vehicles</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="template-type">Template Type</Label>
              <Select value={templateType} onValueChange={(value: "standard" | "custom" | "local") => setTemplateType(value)}>
                <SelectTrigger id="template-type">
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-2" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>Template Fields</Label>
                <Button type="button" onClick={handleAddField} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Field
                </Button>
              </div>

              {templateFields.length === 0 ? (
                <div className="text-center p-6 border border-dashed rounded-md">
                  <File className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">No fields added yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={handleAddField}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add First Field
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {templateFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start border p-3 rounded-md">
                      <div className="flex-1">
                        <Label htmlFor={`field-name-${index}`}>Field Name</Label>
                        <Input
                          id={`field-name-${index}`}
                          value={field.name}
                          onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                          placeholder="Enter field name"
                          className="mb-2"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`field-type-${index}`}>Field Type</Label>
                            <Select 
                              value={field.type} 
                              onValueChange={(value: "text" | "number" | "boolean" | "select" | "date" | "image") => 
                                handleFieldChange(index, { type: value })
                              }
                            >
                              <SelectTrigger id={`field-type-${index}`}>
                                <SelectValue placeholder="Field type" />
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
                          <div className="flex items-center space-x-2 mt-8">
                            <input
                              type="checkbox"
                              id={`field-required-${index}`}
                              checked={field.required}
                              onChange={(e) => handleFieldChange(index, { required: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor={`field-required-${index}`}>Required</Label>
                          </div>
                        </div>
                        {field.type === "select" && (
                          <div className="mt-2">
                            <Label htmlFor={`field-options-${index}`}>Options (comma separated)</Label>
                            <Input
                              id={`field-options-${index}`}
                              value={field.options?.join(", ") || ""}
                              onChange={(e) => handleFieldChange(index, { options: e.target.value.split(",").map(opt => opt.trim()) })}
                              placeholder="Option 1, Option 2, Option 3"
                            />
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveField(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              {isCreating ? "Create Template" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates, onEdit, onDelete }) => {
  if (templates.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <File className="h-12 w-12 mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-medium">No templates found</h3>
        <p className="text-sm text-muted-foreground mb-4">
          There are no templates in this category yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">{template.name}</CardTitle>
              <Badge 
                variant={
                  template.type === 'standard' ? 'default' :
                  template.type === 'custom' ? 'secondary' : 'outline'
                }
              >
                {template.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{template.category}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {template.fields.length} fields
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {template.fields.slice(0, 3).map((field) => (
                  <Badge key={field.id} variant="outline" className="text-xs">
                    {field.name}
                  </Badge>
                ))}
                {template.fields.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.fields.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(template)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
