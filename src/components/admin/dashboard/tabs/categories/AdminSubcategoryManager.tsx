import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SubcategoriesView } from './SubcategoriesView';
import { SubcategoryForm } from './SubcategoryForm';
import { ConfirmationDialog } from './ConfirmationDialog';
import { useSubcategories } from '@/hooks/useSubcategories';

interface AdminSubcategoryManagerProps {
    categoryId: string; // the selected category's ID
    selectedCategory: CategoryRow | null; // the full selected category
  }

  export const AdminSubcategoryManager: React.FC<AdminSubcategoryManagerProps> = ({ categoryId, selectedCategory }) => {
    const {
      subcategories,
      loading,
      error,
      fetchSubcategories,
      addSubcategory,
      updateSubcategory,
      deleteSubcategory,
    } = useSubcategories(categoryId);
  
    const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  
    console.log(categoryId, 'categoryId in AdminSubcategoryManager');
  
    // Re-fetch subcategories when the categoryId changes
    useEffect(() => {
      if (categoryId) {
        fetchSubcategories(categoryId);
      }
    }, [categoryId, fetchSubcategories]);
  
    const handleAddOrUpdate = async (subcategoryData: any): Promise<any> => {
      let result: any;
      if (isEditMode && selectedSubcategory) {
        result = await updateSubcategory(selectedSubcategory.id, subcategoryData);
        toast.success('Subcategory updated successfully');
      } else {
        result = await addSubcategory({ ...subcategoryData, category_id: categoryId });
        toast.success('Subcategory added successfully');
      }
      setFormOpen(false);
      return result;
    };
  
    const handleDelete = async () => {
      if (selectedSubcategory) {
        await deleteSubcategory(selectedSubcategory.id);
        toast.success('Subcategory deleted successfully');
        setConfirmDeleteOpen(false);
      }
    };
  
    console.log(subcategories, 'subcategories in SubcategoriesView');
  
    return (
      <div className="border rounded-md p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Manage Subcategories</h3>
        
        {error && <p className="text-red-600">Error loading subcategories</p>}
  
        <SubcategoriesView 
          selectedCategory={selectedCategory}  // pass the full category object here
          subcategories={subcategories}
          loading={loading}
          onEdit={(subcat: any) => {
            setSelectedSubcategory(subcat);
            setIsEditMode(true);
            setFormOpen(true);
          }}
          onDelete={(subcat: any) => {
            setSelectedSubcategory(subcat);
            setConfirmDeleteOpen(true);
          }}
          // Pass along any other required callbacks as already set up
          onAddSubcategory={() => {
            setIsEditMode(false);
            setSelectedSubcategory(null);
            setFormOpen(true);
          }}
          onCancelEditing={() => { }}
          onSaveEditing={() => { }}
          onToggleVisibility={() => { }}
          onEditSubcategoryChange={() => { }}
          onSubcategoryFormOpenChange={setFormOpen}
          onConfirmDeleteOpenChange={setConfirmDeleteOpen}
          onConfirmDelete={handleDelete}
          onSubcategorySubmit={handleAddOrUpdate}
          onChangeTab={() => { }}
          onRetry={() => { }}
        />
  
        {/* Subcategory Form Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
  <DialogContent>
    <SubcategoryForm
      open={formOpen}
      onSubmit={handleAddOrUpdate}
      subcategory={selectedSubcategory}
      categoryId={categoryId}
      isEdit={isEditMode}
      onOpenChange={setFormOpen}
    />
  </DialogContent>
</Dialog>
  
        {/* Delete Confirmation Dialog */}
        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <DialogContent>
            <ConfirmationDialog 
              open={confirmDeleteOpen}
              onOpenChange={setConfirmDeleteOpen}
              title="Delete Subcategory"
              description={`Are you sure you want to delete subcategory "${selectedSubcategory?.name}"?`}
              onConfirm={handleDelete}
              onCancel={() => setConfirmDeleteOpen(false)}
              confirmLabel="Delete"
              confirmVariant="destructive"
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default AdminSubcategoryManager;