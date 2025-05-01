
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { InitializeDbButton } from "./InitializeDbButton";

interface EmptyCategoriesStateProps {
  onAddCategory: () => void;
}

export const EmptyCategoriesState: React.FC<EmptyCategoriesStateProps> = ({ onAddCategory }) => {
  return (
    <div className="text-center py-6">
      <h3 className="text-lg font-medium mb-2">No categories found</h3>
      <p className="text-muted-foreground mb-4">
        Initialize the database with default categories or create new ones.
      </p>
      <div className="flex justify-center gap-4">
        <InitializeDbButton />
        <Button onClick={onAddCategory}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>
    </div>
  );
};
