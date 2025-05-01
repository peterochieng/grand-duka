
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

interface CategoryTableHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddCategory: () => void;
  isLoading?: boolean;
}

export const CategoryTableHeader = ({
  searchTerm,
  onSearchChange,
  onAddCategory,
  isLoading = false,
}: CategoryTableHeaderProps) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-8 max-w-sm"
          disabled={isLoading}
        />
      </div>
      <Button onClick={onAddCategory} disabled={isLoading}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
};
