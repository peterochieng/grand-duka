import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCategoryManager } from "@/hooks/useCategoryManager";
import { CategoriesView } from "./CategoriesView";
import { CategoryForm } from "./CategoryForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
// Import the existing subcategories management component
import { AdminSubcategoryManager } from "./AdminSubcategoryManager";

interface AdminCategoryManagerProps {
  selectedCategory: any;
  setSelectedCategory: (cat: any) => void;
}

export const AdminCategoryManager: React.FC<AdminCategoryManagerProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  // Use your hook which provides create, update, delete, toggle and form state handlers
  const {
    categories,
    loadingCategories,
    categoryError,
    isEditMode,
    categoryFormOpen,
    confirmDeleteOpen,
    searchTerm,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
    handleCategorySubmit,
    toggleVisibility,
    toggleRestriction,
    setCategoryFormOpen,
    setConfirmDeleteOpen,
  } = useCategoryManager();

  // Render error state if error occurs
  if (categoryError) {
    return (
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-semibold mb-2">Category Management</h3>
        <p className="text-muted-foreground mb-4">An error occurred while loading categories.</p>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h4 className="text-red-800 font-medium">Error</h4>
          <p className="text-red-600">{categoryError.message}</p>
          <Button onClick={() => { /* call your fetchCategories if available */ }}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Category Management</h3>
      {/* Render the CategoriesView and pass onSelectCategory */}
      <CategoriesView 
        categories={categories}
        loading={loadingCategories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        onSelectCategory={setSelectedCategory}  // <-- When a row is clicked, this sets the selected category.
        onToggleVisibility={toggleVisibility}
        onToggleRestriction={toggleRestriction}
        onCancelEditing={() => setCategoryFormOpen(false)}
        onSaveEditing={handleCategorySubmit}
        onEditCategoryChange={(updatedCategory) => setSelectedCategory(updatedCategory)}
        onCategoryFormOpenChange={setCategoryFormOpen}
        onConfirmDeleteOpenChange={setConfirmDeleteOpen}
        onConfirmDelete={handleConfirmDeleteCategory}
      />

      {/* Category Form Dialog */}
      <Dialog open={categoryFormOpen} onOpenChange={setCategoryFormOpen}>
        <DialogContent>
          <CategoryForm 
            open={categoryFormOpen}
            onOpenChange={setCategoryFormOpen}
            onSubmit={handleCategorySubmit}
            category={selectedCategory}
            isEdit={isEditMode}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <ConfirmationDialog 
            title="Delete Category"
            description={`Are you sure you want to delete the category "${selectedCategory?.name}"? This will also delete all related subcategories.`}
            onConfirm={handleConfirmDeleteCategory}
            onCancel={() => setConfirmDeleteOpen(false)}
            confirmLabel="Delete"
            confirmVariant="destructive"
            open={confirmDeleteOpen}
            onOpenChange={setConfirmDeleteOpen}
          />
        </DialogContent>
      </Dialog>

      {/* NEW: Subcategories Section – only rendered if a category is selected */}
      {selectedCategory && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-lg font-semibold mb-2">
            Manage Subcategories for &quot;{selectedCategory.name}&quot;
          </h4>
          {/* Render the subcategory management component; it will use the selected category’s id */}
          <AdminSubcategoryManager 
              categoryId={selectedCategory.id} 
              selectedCategory={selectedCategory}
            />
        </div>
      )}
    </div>
  );
};

export default AdminCategoryManager;