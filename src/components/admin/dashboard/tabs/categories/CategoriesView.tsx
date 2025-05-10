
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CategoryRow } from "@/lib/types/supabaseTypes";
import { CategoryTable } from "./CategoryTable";
import { CategoryForm } from "./CategoryForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CategoriesViewProps {
  categories: CategoryRow[];
  loading: boolean;
  selectedCategory: CategoryRow | null;
  isEditMode: boolean;
  categoryFormOpen: boolean;
  confirmDeleteOpen: boolean;
  searchTerm: string;
  onAddCategory: () => void;
  onEditCategory: (category: CategoryRow) => void;
  onDeleteCategory: (category: CategoryRow) => void;
  onSelectCategory: (category: CategoryRow) => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onToggleRestriction: (id: string, currentState: boolean) => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onEditCategoryChange: (category: CategoryRow) => void;
  onCategoryFormOpenChange: (open: boolean) => void;
  onConfirmDeleteOpenChange: (open: boolean) => void;
  onConfirmDelete: () => Promise<void>;
  onCategorySubmit: (categoryData: Omit<CategoryRow, "id">) => Promise<CategoryRow | null>;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  loading,
  selectedCategory,
  isEditMode,
  categoryFormOpen,
  confirmDeleteOpen,
  searchTerm,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onSelectCategory,
  onToggleVisibility,
  onToggleRestriction,
  onCancelEditing,
  onSaveEditing,
  onEditCategoryChange,
  onCategoryFormOpenChange,
  onConfirmDeleteOpenChange,
  onConfirmDelete,
  onCategorySubmit
}) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Button onClick={onAddCategory}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <CategoryTable 
            categories={categories}
            loading={loading}
            searchTerm={searchTerm}
            editingId={isEditMode ? selectedCategory?.id || null : null}
            editedCategory={selectedCategory}
            onAddCategory={onAddCategory}
            onSelectCategory={onSelectCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            onToggleVisibility={onToggleVisibility}
            onToggleRestriction={onToggleRestriction}
            onStartEditing={onEditCategory}
            onCancelEditing={onCancelEditing}
            onSaveEditing={onSaveEditing}
            onEditCategoryChange={onEditCategoryChange}
            selectedCategoryId={selectedCategory?.id}
          />
        </CardContent>
      </Card>
      
      {/* Category Form Dialog */}
      <CategoryForm 
  open={categoryFormOpen} 
  onOpenChange={onCategoryFormOpenChange}
  onSubmit={onCategorySubmit} 
  category={selectedCategory}
  isEdit={isEditMode}
/>
      
      {/* Category Delete Confirmation */}
      <Dialog open={confirmDeleteOpen} onOpenChange={onConfirmDeleteOpenChange}>
        <DialogContent>
          <ConfirmationDialog 
            title="Delete Category"
            description={`Are you sure you want to delete the category "${selectedCategory?.name}"? This will also delete all subcategories.`}
            onConfirm={onConfirmDelete}
            onCancel={() => onConfirmDeleteOpenChange(false)}
            confirmLabel="Delete"
            confirmVariant="destructive"
            open={confirmDeleteOpen}
            onOpenChange={onConfirmDeleteOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
