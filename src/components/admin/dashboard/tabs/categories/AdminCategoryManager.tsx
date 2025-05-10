import React from "react";
import { useCategoryManager } from "@/hooks/useCategoryManager";
import { CategoriesView } from "./CategoriesView";

interface AdminCategoryManagerProps {
  selectedCategory: any;
  setSelectedCategory: (category: any) => void;
}

export const AdminCategoryManager: React.FC<AdminCategoryManagerProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
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

  // When editing, set the selected category so that the form gets the data
  const onEditCategory = (category: any) => {
    console.log(category);
    setSelectedCategory(category);
    handleEditCategory(category);
  };

  return (
    <div>
      {categoryError ? (
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">Category Management</h3>
          <p className="text-muted-foreground mb-4">
            An error occurred while loading categories.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h4 className="text-red-800 font-medium">Error</h4>
            <p className="text-red-600">{categoryError.message}</p>
            <button onClick={() => setCategoryFormOpen(true)}>Retry</button>
          </div>
        </div>
      ) : (
        <CategoriesView
          categories={categories}
          loading={loadingCategories}
          selectedCategory={selectedCategory}
          isEditMode={isEditMode}
          categoryFormOpen={categoryFormOpen}
          confirmDeleteOpen={confirmDeleteOpen}
          searchTerm={searchTerm}
          onAddCategory={handleAddCategory}
          onEditCategory={onEditCategory}  // Updated handler
          onDeleteCategory={handleDeleteCategory}
          onSelectCategory={setSelectedCategory}
          onToggleVisibility={toggleVisibility}
          onToggleRestriction={toggleRestriction}
          onCancelEditing={() => setCategoryFormOpen(false)}
          onSaveEditing={() => handleCategorySubmit(selectedCategory)}
          onEditCategoryChange={(updatedCategory) => setSelectedCategory(updatedCategory)}
          onCategoryFormOpenChange={setCategoryFormOpen}
          onConfirmDeleteOpenChange={setConfirmDeleteOpen}
          onConfirmDelete={handleConfirmDeleteCategory}
          onCategorySubmit={handleCategorySubmit}
        />
      )}
    </div>
  );
};

export default AdminCategoryManager;