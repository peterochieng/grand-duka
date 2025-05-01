
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useShopManager } from "@/hooks/useShopManager";
import { useState } from "react";
import { ShopPerksDialog } from "./shops/ShopPerksDialog";
import { ShopFilters } from "./shops/ShopFilters";
import { ShopTableRow } from "./shops/ShopTableRow";

export const ShopsTab = () => {
  const {
    shops,
    loading,
    error,
    filter,
    setFilter,
    updateShopStatus,
    toggleShopVerification,
    toggleShopFeatured,
  } = useShopManager();

  const [selectedShop, setSelectedShop] = useState<{ id: string; name: string } | null>(null);

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Shop Management</h3>
      <p className="text-muted-foreground mb-4">
        Manage retail and wholesale shops on the platform.
      </p>
      
      <div className="flex justify-between mb-4">
        <ShopFilters filter={filter} onFilterChange={setFilter} />
      </div>
      
      {error && (
        <div className="text-center py-4 text-red-500">
          <p>Error: {error.message}</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading shops...</div>
      ) : shops.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No shops found matching the selected filter.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop ID</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Badges</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <ShopTableRow
                key={shop.id}
                shop={shop}
                onToggleVerified={toggleShopVerification}
                onToggleFeatured={toggleShopFeatured}
                onSelectShop={setSelectedShop}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {selectedShop && (
        <ShopPerksDialog
          isOpen={true}
          onClose={() => setSelectedShop(null)}
          shopId={selectedShop.id}
          shopName={selectedShop.name}
        />
      )}
    </div>
  );
};
