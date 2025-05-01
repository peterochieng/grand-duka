
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, Trash2, Copy } from 'lucide-react';
import { InventoryItem } from './types';

interface InventoryTableProps {
  items: InventoryItem[];
  onToggleVisibility: (id: string) => void;
  onCopyLink: (id: string) => void;
}

const InventoryTable = ({ items, onToggleVisibility, onCopyLink }: InventoryTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Image</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-center">Visibility</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="h-10 w-10 rounded overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">{item.currency} {item.price.toLocaleString()} {item.priceUnit}</TableCell>
              <TableCell className="text-right">{item.quantity.toLocaleString()} {item.quantityUnit}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-2">
                  {item.isPublic ? 
                    <Eye className="h-4 w-4 text-green-500" /> : 
                    <EyeOff className="h-4 w-4 text-amber-500" />
                  }
                  <Switch 
                    checked={item.isPublic}
                    onCheckedChange={() => onToggleVisibility(item.id)}
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onCopyLink(item.id)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
