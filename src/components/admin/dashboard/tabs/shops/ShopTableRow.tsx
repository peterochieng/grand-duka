
import { TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shop } from "@/types/shopTypes";
import { ShopBadges } from "./ShopBadges";
import { ShopStatusBadge } from "./ShopStatusBadge";
import { Badge } from "@/components/ui/badge";

interface ShopTableRowProps {
  shop: Shop;
  onToggleVerified: (shopId: string, currentValue: boolean) => Promise<void>;
  onToggleFeatured: (shopId: string, currentValue: boolean) => Promise<void>;
  onSelectShop: (shop: { id: string; name: string }) => void;
}

export const ShopTableRow = ({
  shop,
  onToggleVerified,
  onToggleFeatured,
  onSelectShop
}: ShopTableRowProps) => {
  return (
    <TableRow key={shop.id}>
      <TableCell className="font-mono text-xs">
        {shop.id.substring(0, 8)}...
      </TableCell>
      <TableCell className="font-medium">{shop.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {shop.type}
        </Badge>
      </TableCell>
      <TableCell><ShopStatusBadge status={shop.status} /></TableCell>
      <TableCell>{shop.item_count}</TableCell>
      <TableCell><ShopBadges shop={shop} /></TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={shop.verified}
            onCheckedChange={() => onToggleVerified(shop.id, shop.verified)}
            title="Verified Status"
          />
          <Switch
            checked={shop.featured}
            onCheckedChange={() => onToggleFeatured(shop.id, shop.featured)}
            title="Featured Status"
          />
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onSelectShop({ id: shop.id, name: shop.name })}
          >
            Manage Perks
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
