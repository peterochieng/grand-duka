
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Template } from "@/lib/types/templateTypes";
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Eye, 
  EyeOff, 
  Settings 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types for the subcategory with template
interface SubcategoryWithTemplate {
  id: string;
  name: string;
  category_id: string;
  is_published: boolean;
  category_name: string;
  template_id?: string;
  template_name?: string;
}

export const SubcategoryTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryWithTemplate | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Mock templates data - would be replaced with actual query
  const templates: Template[] = [
    {
      id: "1",
      name: "Standard Vehicle",
      category: "Vehicles",
      type: "standard",
      fields: [],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Electronics",
      category: "Electronics",
      type: "standard",
      fields: [],
      createdAt: new Date().toISOString()
    }
  ];

  // Mock categories data - would be replaced with actual query
  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Vehicles" },
    { id: "3", name: "Fashion" },
    { id: "4", name: "Home & Garden" }
  ];

  // Mock subcategories data - would be replaced with actual query
  const subcategories: SubcategoryWithTemplate[] = [
    { 
      id: "1", 
      name: "Smartphones", 
      category_id: "1", 
      is_published: true,
      category_name: "Electronics",
      template_id: "2",
      template_name: "Electronics"
    },
    { 
      id: "2", 
      name: "Laptops", 
      category_id: "1", 
      is_published: true,
      category_name: "Electronics"
    },
    { 
      id: "3", 
      name: "Cars", 
      category_id: "2", 
      is_published: true,
      category_name: "Vehicles",
      template_id: "1",
      template_name: "Standard Vehicle"
    },
    { 
      id: "4", 
      name: "Motorcycles", 
      category_id: "2", 
      is_published: false,
      category_name: "Vehicles"
    }
  ];

  const filteredSubcategories = subcategories.filter(subcat => {
    const matchesSearch = subcat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subcat.category_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || subcat.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAssignTemplate = (subcategory: SubcategoryWithTemplate) => {
    setSelectedSubcategory(subcategory);
    setSelectedTemplate(subcategory.template_id || null);
    setTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    // Here we would save to Supabase
    toast.success(`Template ${selectedTemplate ? 'assigned to' : 'removed from'} ${selectedSubcategory?.name}`);
    setTemplateDialogOpen(false);
  };

  const handleTogglePublish = (subcategory: SubcategoryWithTemplate, isPublished: boolean) => {
    // Here we would update in Supabase
    toast.success(`${subcategory.name} is now ${isPublished ? 'published' : 'hidden'}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={categoryFilter || ""} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subcategory Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div className="col-span-2">Subcategory</div>
              <div>Category</div>
              <div>Template</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredSubcategories.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No subcategories found
                </div>
              ) : (
                filteredSubcategories.map((subcategory) => (
                  <div key={subcategory.id} className="grid grid-cols-5 p-4 items-center">
                    <div className="col-span-2 flex items-center">
                      <div>
                        <div className="font-medium">{subcategory.name}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant={subcategory.is_published ? "default" : "secondary"} className="text-xs">
                            {subcategory.is_published ? "Published" : "Hidden"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>{subcategory.category_name}</div>
                    <div>
                      {subcategory.template_name ? (
                        subcategory.template_name
                      ) : (
                        <span className="text-muted-foreground text-sm">No template</span>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleTogglePublish(subcategory, !subcategory.is_published)}
                        title={subcategory.is_published ? "Hide subcategory" : "Publish subcategory"}
                      >
                        {subcategory.is_published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleAssignTemplate(subcategory)}
                        title="Assign template"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Template</DialogTitle>
            <DialogDescription>
              Select a template for the subcategory "{selectedSubcategory?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="template-select">Template</Label>
            <Select 
              value={selectedTemplate || ""} 
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger id="template-select">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None (Remove template)</SelectItem>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="publish-switch"
                  checked={selectedSubcategory?.is_published || false}
                  // This would need a setter in a real implementation
                />
                <Label htmlFor="publish-switch">
                  Publish subcategory with template
                </Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                When published, sellers will be required to use this template
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
