
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategoryManager } from "@/hooks/useCategoryManager";
import { EmptyCategoriesState } from "./categories/EmptyCategoriesState";
import { CategoriesView } from "./categories/CategoriesView";
import { SubcategoriesView } from "./categories/SubcategoriesView";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const CategoriesTab = () => {
  console.log("Rendering CategoriesTab component");

  const {
    // Category state
    categories,
    loadingCategories,
    categoryError,
    selectedCategory,
    categoryFormOpen,
    confirmDeleteOpen,
    isEditMode,
    activeTab,
    searchTerm,
    
    // Subcategory state
    subcategories,
    loadingSubcategories,
    subcategoryError,
    selectedSubcategory,
    subcategoryFormOpen,
    confirmSubcatDeleteOpen,
    isSubcatEditMode,
    
    // Category actions
    setCategoryFormOpen,
    setConfirmDeleteOpen,
    setSearchTerm,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
    handleCategorySubmit,
    setSelectedCategory,
    toggleVisibility,
    toggleRestriction,
    setIsEditMode,
    
    // Subcategory actions
    setSubcategoryFormOpen,
    setConfirmSubcatDeleteOpen,
    handleAddSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleConfirmDeleteSubcategory,
    handleSubcategorySubmit,
    toggleSubcatVisibility,
    setIsSubcatEditMode,
    setSelectedSubcategory,
    
    // Other actions
    handleChangeTab,
    fetchCategories,
    fetchSubcategories,
    addPredefinedSubcategories
  } = useCategoryManager();

  const handleAddPredefinedSubcategories = async () => {
    try {
      await addPredefinedSubcategories();
      toast.success("Predefined subcategories added successfully");
    } catch (error) {
      console.error("Error adding predefined subcategories:", error);
      toast.error("Failed to add predefined subcategories");
    }
  };

  // Error handling for categories
  if (categoryError) {
    return (
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-semibold mb-2">Category Management</h3>
        <p className="text-muted-foreground mb-4">An error occurred while loading categories.</p>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h4 className="text-red-800 font-medium">Error</h4>
          <p className="text-red-600">{categoryError.message}</p>
          <button 
            onClick={fetchCategories}
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Category Management</h3>
      <p className="text-muted-foreground mb-4">Manage product categories and subcategories.</p>
      
      {loadingCategories ? (
        <div className="text-center py-6">Loading categories...</div>
      ) : categories.length === 0 ? (
        <EmptyCategoriesState onAddCategory={handleAddCategory} />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddPredefinedSubcategories}
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              Add Predefined Subcategories
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleChangeTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="subcategories" disabled={!selectedCategory}>
                  Subcategories
                  {selectedCategory && ` (${selectedCategory.name})`}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="categories">
              <CategoriesView 
                categories={categories}
                loading={loadingCategories}
                selectedCategory={selectedCategory}
                isEditMode={isEditMode}
                categoryFormOpen={categoryFormOpen}
                confirmDeleteOpen={confirmDeleteOpen}
                searchTerm={searchTerm}
                onAddCategory={handleAddCategory}
                onEditCategory={handleEditCategory}
                onDeleteCategory={handleDeleteCategory}
                onSelectCategory={setSelectedCategory}
                onToggleVisibility={toggleVisibility}
                onToggleRestriction={toggleRestriction}
                onCancelEditing={() => {
                  setIsEditMode(false);
                  setCategoryFormOpen(false);
                }}
                onSaveEditing={() => {}}
                onEditCategoryChange={(category) => setSelectedCategory(category)}
                onCategoryFormOpenChange={setCategoryFormOpen}
                onConfirmDeleteOpenChange={setConfirmDeleteOpen}
                onConfirmDelete={handleConfirmDeleteCategory}
                onCategorySubmit={handleCategorySubmit}
              />
            </TabsContent>
            
            <TabsContent value="subcategories">
              <SubcategoriesView 
                selectedCategory={selectedCategory}
                subcategories={subcategories}
                loading={loadingSubcategories}
                error={subcategoryError}
                selectedSubcategory={selectedSubcategory}
                isSubcatEditMode={isSubcatEditMode}
                subcategoryFormOpen={subcategoryFormOpen}
                confirmSubcatDeleteOpen={confirmSubcatDeleteOpen}
                onAddSubcategory={handleAddSubcategory}
                onEditSubcategory={handleEditSubcategory}
                onDeleteSubcategory={handleDeleteSubcategory}
                onCancelEditing={() => {
                  setIsSubcatEditMode(false);
                  setSubcategoryFormOpen(false);
                }}
                onSaveEditing={() => {}}
                onToggleVisibility={toggleSubcatVisibility}
                onEditSubcategoryChange={(subcategory) => setSelectedSubcategory(subcategory)}
                onSubcategoryFormOpenChange={setSubcategoryFormOpen}
                onConfirmDeleteOpenChange={setConfirmSubcatDeleteOpen}
                onConfirmDelete={handleConfirmDeleteSubcategory}
                onSubcategorySubmit={handleSubcategorySubmit}
                onChangeTab={handleChangeTab}
                onRetry={() => selectedCategory && fetchSubcategories(selectedCategory.id)}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};
