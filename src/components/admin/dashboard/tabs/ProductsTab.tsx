
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductManager } from "@/hooks/useProductManager";
import { FileDigit, FileCheck, Settings } from "lucide-react";
import { ProductApprovals } from "./products/ProductApprovals";
import { CategorySettings } from "./products/CategorySettings";

export const ProductsTab = () => {
  const { 
    products, 
    loading, 
    error, 
    filter, 
    setFilter, 
    handleApprove, 
    handleReject 
  } = useProductManager();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Product Management</h2>
        <p className="text-muted-foreground">Manage products, approvals, and listings.</p>
      </div>

      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="approvals" className="flex items-center gap-1">
            <FileCheck className="h-4 w-4" />
            Approvals
          </TabsTrigger>
          {/* <TabsTrigger value="category-settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            Category Settings
          </TabsTrigger> */}
          <TabsTrigger value="all-products" className="flex items-center gap-1">
            <FileDigit className="h-4 w-4" />
            All Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-4">
          <ProductApprovals />
        </TabsContent>

        <TabsContent value="category-settings" className="space-y-4">
          <CategorySettings />
        </TabsContent>

        <TabsContent value="all-products" className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">All Products Management</h3>
            <p className="text-muted-foreground text-sm">
              Coming soon - Manage all products across the platform.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
