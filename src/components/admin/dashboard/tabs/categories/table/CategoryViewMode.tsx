
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash, Lock, Unlock } from "lucide-react";
import { CategoryRow } from "@/lib/types/supabaseTypes";

interface CategoryViewModeProps {
  category: CategoryRow;
  subcategoryCount: number;
  selectedCategoryId?: string;
  onSelectCategory: (category: CategoryRow) => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onToggleRestriction: (id: string, currentState: boolean) => void;
  onStartEditing: (category: CategoryRow) => void;
  onDeleteCategory: (category: CategoryRow) => void;
}

export const CategoryViewMode = ({
  category,
  subcategoryCount,
  selectedCategoryId,
  onSelectCategory,
  onToggleVisibility,
  onToggleRestriction,
  onStartEditing,
  onDeleteCategory,
}: CategoryViewModeProps) => {
  return (
    <>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          <span
            className={`cursor-pointer ${selectedCategoryId === category.id ? 'text-primary font-bold' : 'text-blue-600 hover:underline'}`}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </span>
        </div>
      </TableCell>
      <TableCell>{category.icon || "—"}</TableCell>
      <TableCell>
        <Badge variant={
          category.trading_type === "retail" ? "default" : 
          category.trading_type === "wholesale" ? "secondary" : 
          "outline"
        }>
          {category.trading_type === "retail" ? "Retail Only" : 
           category.trading_type === "wholesale" ? "Wholesale Only" : 
           "Both"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-slate-100">
          {subcategoryCount}
        </Badge>
      </TableCell>
      <TableCell>
        <Switch 
          checked={category.is_published === true}
          onCheckedChange={(checked) => onToggleVisibility(category.id, checked)}
        />
      </TableCell>
      <TableCell>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => onToggleRestriction(category.id, !category.restricted)}
        >
          {category.restricted ? 
            <Lock className="h-4 w-4 text-red-500" /> : 
            <Unlock className="h-4 w-4 text-green-500" />
          }
        </Button>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => onStartEditing(category)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => onDeleteCategory(category)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
