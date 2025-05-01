
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Save, X, AlertCircle, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryRow, SubcategoryRow } from "@/lib/types/supabaseTypes";

interface SubcategoryTableProps {
  selectedCategory: CategoryRow | null;
  subcategories: SubcategoryRow[];
  loading: boolean;
  editingSubcategoryId: string | null;
  editedSubcategory: SubcategoryRow | null;
  onAddSubcategory: () => void;
  onStartEditing: (subcategory: SubcategoryRow) => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onDeleteSubcategory: (subcategory: SubcategoryRow) => void;
  onToggleVisibility: (id: string, currentState: boolean) => void;
  onEditSubcategoryChange: (updatedSubcategory: SubcategoryRow) => void;
  onChangeTab: (tab: string) => void;
}

export const SubcategoryTable: React.FC<SubcategoryTableProps> = ({
  selectedCategory,
  subcategories,
  loading,
  editingSubcategoryId,
  editedSubcategory,
  onAddSubcategory,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onDeleteSubcategory,
  onToggleVisibility,
  onEditSubcategoryChange,
  onChangeTab,
}) => {
  if (!selectedCategory) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-medium">No Category Selected</h3>
        <p className="text-muted-foreground mt-2">
          Please select a category from the Categories tab to manage its subcategories.
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => onChangeTab("categories")}
        >
          Go to Categories
        </Button>
      </div>
    );
  }

  if (!selectedCategory.is_published) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Subcategories of: {selectedCategory.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCategory.description || 'No description available'}
            </p>
            <Badge variant={selectedCategory.is_published ? "outline" : "destructive"} className="mt-2">
              {selectedCategory.is_published ? "Published" : "Hidden"}
            </Badge>
          </div>
          
          <Button onClick={onAddSubcategory}>
            Add Subcategory
          </Button>
        </div>
        
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Category is Hidden</AlertTitle>
          <AlertDescription>
            This category is currently hidden from users. Subcategories will remain hidden until the parent category is published.
          </AlertDescription>
        </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  No subcategories found for this category. Add your first subcategory to get started.
                </TableCell>
              </TableRow>
            ) : (
              subcategories.map((subcategory) => (
                <TableRow key={subcategory.id} className="opacity-60">
                  <TableCell className="font-medium">{subcategory.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={false}
                        disabled={true}
                        aria-label="Toggle visibility"
                      />
                      <Lock size={14} className="text-gray-400" />
                      <span className="text-xs text-muted-foreground">Parent category is hidden</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onStartEditing(subcategory)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => onDeleteSubcategory(subcategory)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Subcategories of: {selectedCategory.name}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedCategory.description || 'No description available'}
          </p>
          <Badge variant={selectedCategory.is_published ? "outline" : "destructive"} className="mt-2">
            {selectedCategory.is_published ? "Published" : "Hidden"}
          </Badge>
        </div>
        
        <Button onClick={onAddSubcategory}>
          Add Subcategory
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-2">
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  No subcategories found for this category. Add your first subcategory to get started.
                </TableCell>
              </TableRow>
            ) : (
              subcategories.map((subcategory) => (
                <TableRow key={subcategory.id} className={!subcategory.is_published ? "opacity-60" : ""}>
                  {editingSubcategoryId === subcategory.id ? (
                    // Editing Mode
                    <>
                      <TableCell>
                        <Input 
                          value={editedSubcategory?.name || ""} 
                          onChange={(e) => onEditSubcategoryChange({...editedSubcategory!, name: e.target.value})}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={editedSubcategory?.is_published !== false}
                          onCheckedChange={(checked) => onEditSubcategoryChange({...editedSubcategory!, is_published: checked})}
                          disabled={!selectedCategory.is_published}
                          aria-label="Toggle published state"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={onSaveEditing}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={onCancelEditing}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <TableCell className="font-medium">{subcategory.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={subcategory.is_published}
                            onCheckedChange={() => onToggleVisibility(subcategory.id, !subcategory.is_published)}
                            disabled={!selectedCategory.is_published}
                            aria-label="Toggle published state"
                          />
                          {!selectedCategory.is_published && (
                            <>
                              <Lock size={14} className="text-gray-400" />
                              <span className="text-xs text-muted-foreground">Parent category is hidden</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => onStartEditing(subcategory)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => onDeleteSubcategory(subcategory)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
