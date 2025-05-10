import { useState, useEffect } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoryRow } from "@/lib/types/supabaseTypes";
import { useSubcategories } from "@/hooks/useSubcategories";
import { CategoryTableHeader } from "./table/CategoryTableHeader";
import { CategoryLoadingState } from "./table/CategoryLoadingState";
import { CategoryEmptyState } from "./table/CategoryEmptyState";
import { CategoryTableRow } from "./table/CategoryTableRow";
import { getSubcategoriesCount } from "@/services/category";

interface CategoryTableProps {
  categories: CategoryRow[];
  loading: boolean;
  searchTerm: string;
  editingId: string | null;
  editedCategory: CategoryRow | null;
  selectedCategoryId?: string;
  onAddCategory: () => void;
  onSelectCategory: (category: CategoryRow) => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onToggleRestriction: (id: string, currentState: boolean) => void;
  onStartEditing: (category: CategoryRow) => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onDeleteCategory: (category: CategoryRow) => void;
  onEditCategoryChange: (updatedCategory: CategoryRow) => void;
  onEditCategory?: (category: CategoryRow) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  loading,
  searchTerm,
  editingId,
  editedCategory,
  selectedCategoryId,
  onAddCategory,
  onSelectCategory,
  onToggleVisibility,
  onToggleRestriction,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onDeleteCategory,
  onEditCategoryChange,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(false);

  // Filter categories based on search term
  const filteredCategories = categories?.filter(category => 
    category?.name.toLowerCase().includes(localSearchTerm.toLowerCase())
  );

  // Get subcategory counts for each category
  useEffect(() => {
    const fetchAllSubcategoryCounts = async () => {
      if (categories.length === 0) return;
      
      setLoadingCounts(true);
      const counts: Record<string, number> = {};
      
      try {
        for (const category of categories) {
          // Using direct count query instead of fetching all subcategories
          const count = await getSubcategoriesCount(category.id);
          counts[category.id] = count;
        }
        
        console.log('Subcategory counts:', counts);
        setSubcategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching subcategory counts:', error);
      } finally {
        setLoadingCounts(false);
      }
    };
    
    fetchAllSubcategoryCounts();
  }, [categories]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  console.log(filteredCategories, 'Filtered Categories');

  return (
    <div className="space-y-4">
      <CategoryTableHeader 
        searchTerm={localSearchTerm} 
        onSearchChange={handleSearchChange} 
        onAddCategory={onAddCategory}
        isLoading={loading}
      />
      
      {loading ? (
        <CategoryLoadingState />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Trading Type</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Restricted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <CategoryEmptyState searchTerm={localSearchTerm} onAddCategory={onAddCategory} />
            ) : (
              filteredCategories?.map((category) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  editingId={editingId}
                  editedCategory={editedCategory}
                  subcategoryCount={subcategoryCounts[category.id] || 0}
                  selectedCategoryId={selectedCategoryId}
                  onSelectCategory={onSelectCategory}
                  onToggleVisibility={onToggleVisibility}
                  onToggleRestriction={onToggleRestriction}
                  onStartEditing={onStartEditing}
                  onCancelEditing={onCancelEditing}
                  onSaveEditing={onSaveEditing}
                  onDeleteCategory={onDeleteCategory}
                  onEditCategoryChange={onEditCategoryChange}
                />
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
