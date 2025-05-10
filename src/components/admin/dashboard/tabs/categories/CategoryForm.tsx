import { useState, useEffect } from "react";
import { CategoryRow } from "@/lib/types/supabaseTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

// Available Lucide icon names that can be used for categories
const availableIcons = [
  "Package", "ShoppingBag", "Briefcase", "Car", "Shirt", "Building", 
  "DeviceDesktop", "Dumbbell", "Music", "Sofa", "Trophy", "Baby", 
  "Book", "Clock", "HeartPulse", "History", "Library", "Paw", "Star", 
  "GamepadIcon", "Toy"
];

const tradingTypes = [
  { value: "retail", label: "Retail Only" },
  { value: "wholesale", label: "Wholesale Only" },
  { value: "both", label: "Both Retail & Wholesale" }
];

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // For creating a new category, id is omitted.
  // When updating, the caller should merge the existing id.
  onSubmit: (category: Omit<CategoryRow, "created_at" | "updated_at">) => Promise<CategoryRow | null>;
  category: CategoryRow | null;
  isEdit: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  category,
  isEdit
}) => {
  const [formData, setFormData] = useState<Partial<CategoryRow>>({
    name: '',
    description: '',
    icon: 'Package',
    trading_type: 'both',
    is_published: true,
    restricted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        id: category?.id,
        name: category?.name || '',
        description: category?.description || '',
        icon: category?.icon || 'Package',
        trading_type: category?.trading_type || 'both',
        is_published: category?.is_published !== false,
        restricted: category?.restricted === true,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Package',
        trading_type: 'both',
        is_published: true,
        restricted: false,
      });
    }
  }, [category, open]);

  const handleChange = (field: keyof CategoryRow, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name?.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Build payload. When NOT editing, we exclude the id.
      if (isEdit) {
        // When editing, include the id in the payload.
        if (!formData.id) {
          toast.error('Missing category id for update');
          return;
        }
        const payload = {
          id: formData.id,
          name: formData.name,
          description: formData.description || '',
          icon: formData.icon || 'Package',
          trading_type: formData.trading_type || 'both',
          is_published: formData.is_published !== false,
          restricted: formData.restricted === true
        };
        console.log('Submitting (update) category form with data:', payload);
        const result = await onSubmit(payload);
        if (result) {
          toast.success('Category updated successfully');
          onOpenChange(false);
        } else {
          toast.error('Failed to update category');
        }
      } else {
        // When creating new, explicitly omit id from payload.
        const payload = {
          name: formData.name,
          description: formData.description || '',
          icon: formData.icon || 'Package',
          trading_type: formData.trading_type || 'both',
          is_published: formData.is_published !== false,
          restricted: formData.restricted === true
        };
        console.log('Submitting (create) category form with data:', payload);
        const result = await onSubmit(payload);
        if (result) {
          toast.success('Category created successfully');
          onOpenChange(false);
        } else {
          toast.error('Failed to create category');
        }
      }
    } catch (error) {
      console.error('Error submitting category:', error);
      toast.error(isEdit ? 'Failed to update category' : 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the category details below.' : 'Enter the details for your new category.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Electronics, Fashion"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the category"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select 
              value={formData.icon || "Package"} 
              onValueChange={(value) => handleChange('icon', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trading_type">Trading Type *</Label>
            <Select 
              value={formData.trading_type || "both"} 
              onValueChange={(value) => handleChange('trading_type', value as 'retail' | 'wholesale' | 'both')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trading type" />
              </SelectTrigger>
              <SelectContent>
                {tradingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="is_published"
              checked={formData.is_published !== false}
              onCheckedChange={(checked) => handleChange('is_published', checked)}
            />
            <Label htmlFor="is_published">Publish category immediately</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="restricted"
              checked={formData.restricted === true}
              onCheckedChange={(checked) => handleChange('restricted', checked)}
            />
            <Label htmlFor="restricted">Restrict category (admin approval required)</Label>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !formData.name?.trim()}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};