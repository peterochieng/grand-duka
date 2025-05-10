// Updated CategoryTableRow.tsx
// filepath: c:\Learning\bazarify-marketplace\src\components\admin\dashboard\tabs\categories\table\CategoryTableRow.tsx
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CategoryRow } from "@/lib/types/supabaseTypes";
import { CategoryViewMode } from "./CategoryViewMode";
import { CategoryEditMode } from "./CategoryEditMode";

interface CategoryTableRowProps {
  category: CategoryRow;
  editingId: string | null;
  editedCategory: CategoryRow | null;
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

export const CategoryTableRow: React.FC<CategoryTableRowProps> = ({
  category,
  editingId,
  editedCategory,
  selectedCategoryId,
  onSelectCategory,
  onToggleVisibility,
  onToggleRestriction,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onDeleteCategory,
  onEditCategoryChange,
}) => {
  const isEditing = editingId === category.id;
  console.log(editingId);

  console.log(category);
  
  // Use the embedded subcategories array from the category
  const subcategoryCount = category?.subcategories ? category.subcategories.length : 0;

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

export default CategoryTableRow;