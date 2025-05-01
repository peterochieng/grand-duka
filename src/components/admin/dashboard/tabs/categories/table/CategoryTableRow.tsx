
import { TableRow } from "@/components/ui/table";
import { CategoryRow } from "@/lib/types/supabaseTypes";
import { CategoryViewMode } from "./CategoryViewMode";
import { CategoryEditMode } from "./CategoryEditMode";

interface CategoryTableRowProps {
  category: CategoryRow;
  editingId: string | null;
  editedCategory: CategoryRow | null;
  subcategoryCount: number;
  selectedCategoryId?: string;
  onSelectCategory: (category: CategoryRow) => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onToggleRestriction: (id: string, currentState: boolean) => void;
  onStartEditing: (category: CategoryRow) => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onDeleteCategory: (category: CategoryRow) => void;
  onEditCategoryChange: (updatedCategory: CategoryRow) => void;
}

export const CategoryTableRow = ({
  category,
  editingId,
  editedCategory,
  subcategoryCount,
  selectedCategoryId,
  onSelectCategory,
  onToggleVisibility,
  onToggleRestriction,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onDeleteCategory,
  onEditCategoryChange,
}: CategoryTableRowProps) => {
  const isEditing = editingId === category.id;

  return (
    <TableRow key={category.id} className={!category.is_published ? "opacity-60" : ""}>
      {isEditing ? (
        <CategoryEditMode
          editedCategory={editedCategory}
          subcategoryCount={subcategoryCount}
          onEditCategoryChange={onEditCategoryChange}
          onSaveEditing={onSaveEditing}
          onCancelEditing={onCancelEditing}
        />
      ) : (
        <CategoryViewMode
          category={category}
          subcategoryCount={subcategoryCount}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          onToggleVisibility={onToggleVisibility}
          onToggleRestriction={onToggleRestriction}
          onStartEditing={onStartEditing}
          onDeleteCategory={onDeleteCategory}
        />
      )}
    </TableRow>
  );
};
