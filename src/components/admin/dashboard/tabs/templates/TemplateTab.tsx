
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateManager } from "./templates/TemplateManager";
import { SubcategoryTemplates } from "./templates/SubcategoryTemplates";
import { CategoryRequests } from "./templates/CategoryRequests";
import { File, MessageSquare, Grid3X3 } from "lucide-react";

export const TemplateTab = () => {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Template Management</h2>
        <p className="text-muted-foreground">
          Create and manage product templates for different subcategories
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates" className="flex items-center gap-1">
            <File className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="subcategory-templates" className="flex items-center gap-1">
            <Grid3X3 className="h-4 w-4" />
            Subcategory Templates
          </TabsTrigger>
          <TabsTrigger value="category-requests" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Category Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <TemplateManager />
        </TabsContent>

        <TabsContent value="subcategory-templates">
          <SubcategoryTemplates />
        </TabsContent>

        <TabsContent value="category-requests">
          <CategoryRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};
