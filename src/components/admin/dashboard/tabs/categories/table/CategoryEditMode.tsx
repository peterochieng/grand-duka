
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { CategoryRow } from "@/lib/types/supabaseTypes";

// Available Lucide icon names that can be used for categories
const availableIcons = [
  "Package", "ShoppingBag", "Briefcase", "Car", "Shirt", "Building", 
  "DeviceDesktop", "Dumbbell", "Music", "Sofa", "Trophy", "Baby", 
  "Book", "Clock", "HeartPulse", "History", "Library", "Paw", "Star", 
  "GamepadIcon", "Toy"
];

const tradingTypes = [
  { value: "retail", label: "Retail Only" },
  { value: "wholesale", label: "Wholesale Only" },
  { value: "both", label: "Both Retail & Wholesale" }
];

interface CategoryEditModeProps {
  editedCategory: CategoryRow | null;
  subcategoryCount: number;
  onEditCategoryChange: (updatedCategory: CategoryRow) => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
}

export const CategoryEditMode = ({
  editedCategory,
  subcategoryCount,
  onEditCategoryChange,
  onSaveEditing,
  onCancelEditing,
}: CategoryEditModeProps) => {
  if (!editedCategory) return null;
  
  return (
    <>
      <TableCell>
        <Input 
          value={editedCategory.name || ""} 
          onChange={(e) => onEditCategoryChange({...editedCategory, name: e.target.value})}
        />
      </TableCell>
      <TableCell>
        <Select 
          value={editedCategory.icon || "Package"} 
          onValueChange={(value) => onEditCategoryChange({...editedCategory, icon: value})}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            {availableIcons.map((icon) => (
              <SelectItem key={icon} value={icon}>
                {icon}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select 
          value={editedCategory.trading_type || "both"} 
          onValueChange={(value) => onEditCategoryChange({...editedCategory, trading_type: value as 'retail' | 'wholesale' | 'both'})}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select trading type" />
          </SelectTrigger>
          <SelectContent>
            {tradingTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        {subcategoryCount}
      </TableCell>
      <TableCell>
        <Switch 
          checked={editedCategory.is_published !== false}
          onCheckedChange={(checked) => onEditCategoryChange({...editedCategory, is_published: checked})}
        />
      </TableCell>
      <TableCell>
        <Switch 
          checked={editedCategory.restricted === true}
          onCheckedChange={(checked) => onEditCategoryChange({...editedCategory, restricted: checked})}
        />
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={onSaveEditing}>
            <Save className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={onCancelEditing}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
