
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CategoryEmptyStateProps {
  searchTerm: string;
  onAddCategory?: () => void;
}

export const CategoryEmptyState = ({ searchTerm, onAddCategory }: CategoryEmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="h-64 text-center py-8">
        {searchTerm ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">No categories match your search term: <span className="font-medium">"{searchTerm}"</span></p>
            <p className="text-sm text-muted-foreground">Try a different search term or clear the search</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">No categories found.</p>
            <p className="text-sm text-muted-foreground">Add your first category to get started.</p>
            {onAddCategory && (
              <Button onClick={onAddCategory} size="sm" className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            )}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
