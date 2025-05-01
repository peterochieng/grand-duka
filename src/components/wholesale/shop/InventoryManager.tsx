
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { InventoryItem, getInitialInventoryItems } from './inventory/types';
import InventorySearch from './inventory/InventorySearch';
import InventoryActions from './inventory/InventoryActions';
import InventoryTable from './inventory/InventoryTable';

const InventoryManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(getInitialInventoryItems());
  
  const handleToggleVisibility = (id: string) => {
    setInventoryItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isPublic: !item.isPublic } : item
      )
    );
    
    const item = inventoryItems.find(item => item.id === id);
    toast({
      title: `Visibility updated`,
      description: `${item?.title.substring(0, 30)}... is now ${item?.isPublic ? 'private' : 'public'}`,
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter items based on search term
    // In a real app, this would likely be a backend search
  };
  
  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`https://yourdomain.com/wholesale/item/${id}`);
    toast({
      title: "Link copied!",
      description: "Item link has been copied to clipboard",
    });
  };
  
  const handleAddNew = () => {
    toast({
      title: "Add Item",
      description: "Form to add new inventory item would open here",
    });
  };
  
  const handleUpload = () => {
    toast({
      title: "Upload Inventory",
      description: "Bulk upload form would open here",
    });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <InventorySearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
            />
            
            <InventoryActions 
              onAddNew={handleAddNew}
              onUpload={handleUpload}
            />
          </div>
          
          <InventoryTable 
            items={inventoryItems}
            onToggleVisibility={handleToggleVisibility}
            onCopyLink={handleCopyLink}
          />
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {inventoryItems.length} items
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManager;
