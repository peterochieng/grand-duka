import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SubcategoryForm from "./SubcategoryForm";
import { useSubcategories } from "@/hooks/useSubcategories";
import { Switch } from "@/components/ui/switch";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSubcategoryManagerProps {
  categoryId: string;
}

export const AdminSubcategoryManager: React.FC<AdminSubcategoryManagerProps> = ({ categoryId }) => {
  const {
    subcategories,
    loading,
    error,
    addSubcategory,
    updateSubcategory, // Newly added update function in the hook
    toggleSubcategoryVisibility,
    toggleSubcategoryRestriction,
  } = useSubcategories(categoryId);

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);

  // Handler distinguishes between add and update based on the presence of id
  const handleAddOrUpdate = async (data: {
    id?: string;
    name: string;
    is_published: boolean;
    restricted: boolean;
  }) => {
    try {
      if (data.id) {
        // If updating, call updateSubcategory
        await updateSubcategory({ ...data, category_id: categoryId });
      } else {
        // If adding, include the category_id and call addSubcategory
        await addSubcategory({ ...data, category_id: categoryId });
      }
      setSelectedSubcategory(null);
      setFormOpen(false);
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  };

  const handleToggleVisibility = async (id: string, currentState: boolean) => {
    try {
      await toggleSubcategoryVisibility(id, !currentState);
    } catch (error) {
      console.error("Error toggling subcategory visibility:", error);
    }
  };

  const handleToggleRestriction = async (id: string, currentState: boolean) => {
    try {
      await toggleSubcategoryRestriction(id, !currentState);
    } catch (error) {
      console.error("Error toggling subcategory restriction:", error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Subcategories</h3>
            <button
              onClick={() => setFormOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Subcategory
            </button>
          </div>
          {loading ? (
            <p>Loading subcategories...</p>
          ) : error ? (
            <p>Error loading subcategories</p>
          ) : subcategories.length === 0 ? (
            <p>No subcategories available.</p>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-center">Published</th>
                  <th className="border p-2 text-center">Restricted</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.map((subcat) => (
                  <tr key={subcat.id}>
                    <td className="border p-2">{subcat.name}</td>
                    <td className="border p-2 text-center">
                      <Switch
                        checked={subcat.is_published}
                        onCheckedChange={() =>
                          handleToggleVisibility(
                            subcat.id,
                            subcat.is_published
                          )
                        }
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <Button
                        onClick={() =>
                          handleToggleRestriction(subcat.id, subcat.restricted)
                        }
                        variant="ghost"
                        size="sm"
                      >
                        {subcat.restricted ? (
                          <Lock size={16} />
                        ) : (
                          <Unlock size={16} />
                        )}
                      </Button>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => {
                          setSelectedSubcategory(subcat);
                          setFormOpen(true);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded mr-2 text-sm"
                      >
                        Edit
                      </button>
                      {/* Additional actions if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <SubcategoryForm
            onSubmit={handleAddOrUpdate}
            initialData={selectedSubcategory}
            onClose={() => {
              setFormOpen(false);
              setSelectedSubcategory(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubcategoryManager;