import React, { useState, useEffect } from "react";
import { SubcategoryRow } from "@/lib/types/supabaseTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SubcategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    subcategory: Omit<SubcategoryRow, "id" | "created_at" | "updated_at">
  ) => Promise<SubcategoryRow | null>;
  subcategory: SubcategoryRow | null;
  categoryId: string;
  isEdit: boolean;
}

export const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  subcategory,
  categoryId,
  isEdit,
}) => {
  const [formData, setFormData] = useState<Partial<SubcategoryRow>>({
    name: "",
    category_id: categoryId,
    is_published: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (subcategory && isEdit) {
      setFormData({
        name: subcategory.name || "",
        category_id: subcategory.category_id || categoryId,
        is_published: subcategory.is_published !== false,
      });
    } else {
      setFormData({
        name: "",
        category_id: categoryId,
        is_published: true,
      });
    }
  }, [subcategory, categoryId, open, isEdit]);

  const handleChange = (
    field: keyof SubcategoryRow,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate that name is provided
    if (!formData.name?.trim()) {
      toast.error("Subcategory name is required");
      return;
    }
    setIsSubmitting(true);
    try {
      const subcategoryData: Omit<
        SubcategoryRow,
        "id" | "created_at" | "updated_at"
      > = {
        name: formData.name || "",
        category_id: formData.category_id || categoryId,
        is_published: formData.is_published !== false,
      };
      const result = await onSubmit(subcategoryData);
      if (result) {
        toast.success(
          isEdit
            ? "Subcategory updated successfully"
            : "Subcategory created successfully"
        );
        onOpenChange(false);
      } else {
        toast.error(
          isEdit
            ? "Failed to update subcategory"
            : "Failed to create subcategory"
        );
      }
    } catch (error) {
      console.error("Error submitting subcategory:", error);
      toast.error("Error submitting subcategory");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Subcategory" : "Add New Subcategory"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of your subcategory."
              : "Enter the details for your new subcategory."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="subcategory-name">Subcategory Name *</Label>
            <Input
              id="subcategory-name"
              value={formData.name || ""}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter subcategory name"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="is-published">Published</Label>
            <Switch
              id="is-published"
              checked={formData.is_published === true}
              onCheckedChange={(checked) =>
                handleChange("is_published", checked)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isEdit ? "Update Subcategory" : "Create Subcategory"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubcategoryForm;