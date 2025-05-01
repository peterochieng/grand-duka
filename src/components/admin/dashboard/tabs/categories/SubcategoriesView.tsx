
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CategoryRow, SubcategoryRow } from "@/lib/types/supabaseTypes";
import { SubcategoryTable } from "./SubcategoryTable";
import { SubcategoryForm } from "./SubcategoryForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ErrorState } from "./ErrorState";

interface SubcategoriesViewProps {
  selectedCategory: CategoryRow | null;
  subcategories: SubcategoryRow[];
  loading: boolean;
  error: Error | null;
  selectedSubcategory: SubcategoryRow | null;
  isSubcatEditMode: boolean;
  subcategoryFormOpen: boolean;
  confirmSubcatDeleteOpen: boolean;
  onAddSubcategory: () => void;
  onEditSubcategory: (subcategory: SubcategoryRow) => void;
  onDeleteSubcategory: (subcategory: SubcategoryRow) => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onEditSubcategoryChange: (subcategory: SubcategoryRow) => void;
  onSubcategoryFormOpenChange: (open: boolean) => void;
  onConfirmDeleteOpenChange: (open: boolean) => void;
  onConfirmDelete: () => Promise<void>;
  onSubcategorySubmit: (subcategoryData: Omit<SubcategoryRow, "id" | "created_at" | "updated_at">) => Promise<SubcategoryRow | null>;
  onChangeTab: (tab: string) => void;
  onRetry: () => void;
}

export const SubcategoriesView: React.FC<SubcategoriesViewProps> = ({
  selectedCategory,
  subcategories,
  loading,
  error,
  selectedSubcategory,
  isSubcatEditMode,
  subcategoryFormOpen,
  confirmSubcatDeleteOpen,
  onAddSubcategory,
  onEditSubcategory,
  onDeleteSubcategory,
  onCancelEditing,
  onSaveEditing,
  onToggleVisibility,
  onEditSubcategoryChange,
  onSubcategoryFormOpenChange,
  onConfirmDeleteOpenChange,
  onConfirmDelete,
  onSubcategorySubmit,
  onChangeTab,
  onRetry
}) => {
  if (error) {
    return (
      <ErrorState 
        title="Error Loading Subcategories" 
        message={error.message}
        onRetry={onRetry}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <Button 
          onClick={onAddSubcategory} 
          disabled={!selectedCategory}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Subcategory
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle>
            Subcategories for {selectedCategory?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <SubcategoryTable 
            selectedCategory={selectedCategory}
            subcategories={subcategories}
            loading={loading}
            editingSubcategoryId={isSubcatEditMode ? selectedSubcategory?.id || null : null}
            editedSubcategory={selectedSubcategory}
            onAddSubcategory={onAddSubcategory}
            onStartEditing={onEditSubcategory}
            onCancelEditing={onCancelEditing}
            onSaveEditing={onSaveEditing}
            onDeleteSubcategory={onDeleteSubcategory}
            onToggleVisibility={onToggleVisibility}
            onEditSubcategoryChange={onEditSubcategoryChange}
            onChangeTab={onChangeTab}
          />
        </CardContent>
      </Card>
      
      {/* Subcategory Form Dialog */}
      {selectedCategory && (
        <SubcategoryForm 
          open={subcategoryFormOpen} 
          onOpenChange={onSubcategoryFormOpenChange}
          onSubmit={onSubcategorySubmit}
          subcategory={selectedSubcategory}
          categoryId={selectedCategory.id}
          isEdit={isSubcatEditMode}
        />
      )}
      
      {/* Subcategory Delete Confirmation */}
      <Dialog open={confirmSubcatDeleteOpen} onOpenChange={onConfirmDeleteOpenChange}>
        <DialogContent>
          <ConfirmationDialog 
            title="Delete Subcategory"
            description={`Are you sure you want to delete the subcategory "${selectedSubcategory?.name}"?`}
            onConfirm={onConfirmDelete}
            onCancel={() => onConfirmDeleteOpenChange(false)}
            confirmLabel="Delete"
            confirmVariant="destructive"
            open={confirmSubcatDeleteOpen}
            onOpenChange={onConfirmDeleteOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
