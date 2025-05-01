
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Upload, FileText, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Template } from "@/lib/types";

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "temp1",
    name: "Standard Vehicle",
    category: "Vehicles",
    type: "standard",
    fields: [
      { id: "make", name: "Make", type: "text", required: true },
      { id: "model", name: "Model", type: "text", required: true },
      { id: "year", name: "Year", type: "number", required: true },
      { id: "mileage", name: "Mileage", type: "number", required: true },
      { id: "color", name: "Color", type: "text", required: false },
      { id: "transmission", name: "Transmission", type: "select", required: true, options: ["Automatic", "Manual"] },
      { id: "fuel", name: "Fuel Type", type: "select", required: true, options: ["Petrol", "Diesel", "Electric", "Hybrid"] },
    ],
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "temp2",
    name: "Electronics",
    category: "Electronics",
    type: "standard",
    fields: [
      { id: "brand", name: "Brand", type: "text", required: true },
      { id: "model", name: "Model", type: "text", required: true },
      { id: "condition", name: "Condition", type: "select", required: true, options: ["New", "Like New", "Good", "Fair", "Poor"] },
      { id: "warranty", name: "Warranty", type: "select", required: false, options: ["None", "30 days", "90 days", "1 year", "2+ years"] },
    ],
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "temp3",
    name: "Custom Jewelry",
    category: "Fashion",
    type: "custom",
    approvalStatus: "approved",
    createdBy: "user123",
    fields: [
      { id: "material", name: "Material", type: "text", required: true },
      { id: "weight", name: "Weight (g)", type: "number", required: true },
      { id: "gemstone", name: "Gemstone", type: "text", required: false },
      { id: "certification", name: "Certification", type: "boolean", required: false },
    ],
    createdAt: "2023-02-15T00:00:00Z"
  },
  {
    id: "temp4",
    name: "Local Furniture",
    category: "Home & Garden",
    type: "local",
    createdBy: "currentUser",
    fields: [
      { id: "furniture_type", name: "Furniture Type", type: "text", required: true },
      { id: "material", name: "Material", type: "text", required: true },
      { id: "dimensions", name: "Dimensions", type: "text", required: true },
      { id: "assembly_required", name: "Assembly Required", type: "boolean", required: true },
    ],
    createdAt: "2023-05-20T00:00:00Z"
  }
];

interface TemplateManagerProps {
  onSelectTemplate?: (template: Template) => void;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({ onSelectTemplate }) => {
  const [activeTab, setActiveTab] = useState("standard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  // Filter templates based on type and search term
  const filteredTemplates = SAMPLE_TEMPLATES.filter(template => {
    const matchesType = activeTab === "all" || template.type === activeTab;
    const matchesSearch = searchTerm === "" || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };
  
  const getTemplateTypeBadge = (type: string) => {
    switch (type) {
      case 'standard':
        return <Badge className="bg-blue-500">Standard</Badge>;
      case 'custom':
        return <Badge className="bg-purple-500">Custom</Badge>;
      case 'local':
        return <Badge className="bg-orange-500">Local</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product Templates</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Input 
          placeholder="Search templates..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select defaultValue="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onSelect={handleSelectTemplate} 
          />
        </TabsContent>
        
        <TabsContent value="standard" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onSelect={handleSelectTemplate} 
          />
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onSelect={handleSelectTemplate}
          />
        </TabsContent>
        
        <TabsContent value="local" className="mt-4">
          <TemplateList 
            templates={filteredTemplates} 
            onSelect={handleSelectTemplate}
          />
        </TabsContent>
      </Tabs>
      
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedTemplate.name}</CardTitle>
                <CardDescription>{selectedTemplate.category}</CardDescription>
              </div>
              <div className="flex space-x-2">
                {getTemplateTypeBadge(selectedTemplate.type)}
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-medium">Template Fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{field.name}</span>
                      {field.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    </div>
                    <span className="text-sm text-muted-foreground">Type: {field.type}</span>
                    {field.options && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Options: {field.options.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Sub-component to display template cards
const TemplateList = ({ 
  templates, 
  onSelect 
}: { 
  templates: Template[]; 
  onSelect: (template: Template) => void 
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-muted/20">
        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-medium">No templates found</h3>
        <p className="text-sm text-muted-foreground">Try changing your search criteria</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => onSelect(template)}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">{template.name}</CardTitle>
              {template.type === 'standard' && (
                <Badge className="bg-blue-500">Standard</Badge>
              )}
              {template.type === 'custom' && (
                <Badge className="bg-purple-500">Custom</Badge>
              )}
              {template.type === 'local' && (
                <Badge className="bg-orange-500">Local</Badge>
              )}
            </div>
            <CardDescription>{template.category}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              {template.fields.length} fields
            </p>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Use Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplateManager;
