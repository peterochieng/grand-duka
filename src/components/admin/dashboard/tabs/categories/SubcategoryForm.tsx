
import { useState, useEffect } from "react";
import { SubcategoryRow } from "@/lib/types/supabaseTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface SubcategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (subcategory: Omit<SubcategoryRow, "id" | "created_at" | "updated_at">) => Promise<SubcategoryRow | null>;
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
  isEdit
}) => {
  const [formData, setFormData] = useState<Partial<SubcategoryRow>>({
    name: '',
    category_id: categoryId,
    is_published: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (subcategory) {
      setFormData({
        name: subcategory.name || '',
        category_id: subcategory.category_id || categoryId,
        is_published: subcategory.is_published !== false
      });
    } else {
      setFormData({
        name: '',
        category_id: categoryId,
        is_published: true
      });
    }
  }, [subcategory, categoryId, open]);

  const handleChange = (field: keyof SubcategoryRow, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name?.trim()) return;
    
    setIsSubmitting(true);
    try {
      const subcategoryData = {
        name: formData.name,
        category_id: formData.category_id || categoryId,
        is_published: formData.is_published
      } as Omit<SubcategoryRow, "id" | "created_at" | "updated_at">;
      
      const result = await onSubmit(subcategoryData);
      if (result) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error submitting subcategory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Subcategory' : 'Create New Subcategory'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the subcategory details below.' : 'Enter the details for your new subcategory.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Subcategory Name *</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Premium Electronics, New Arrivals"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="is_published"
              checked={formData.is_published !== false}
              onCheckedChange={(checked) => handleChange('is_published', checked)}
            />
            <Label htmlFor="is_published">Publish subcategory immediately</Label>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !formData.name?.trim()}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Subcategory'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
