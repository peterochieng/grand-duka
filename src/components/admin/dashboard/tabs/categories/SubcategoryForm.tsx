import React, { useState, useEffect } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SubcategoryFormProps {
  initialData?: {
    id?: string;
    name: string;
    is_published: boolean;
    restricted: boolean;
  } | null;
  onSubmit: (data: {
    id?: string;
    name: string;
    is_published: boolean;
    restricted: boolean;
  }) => Promise<any>;
  onClose: () => void;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  // Local state for form fields
  const [name, setName] = useState(initialData?.name || "");
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true);
  const [restricted, setRestricted] = useState(initialData?.restricted ?? false);
  // Local state for submission
  const [submitting, setSubmitting] = useState(false);

  // Update state when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIsPublished(initialData.is_published);
      setRestricted(initialData.restricted);
    } else {
      // Reset when no initialData is provided (for creating new)
      setName("");
      setIsPublished(true);
      setRestricted(false);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Build payload without id when adding new
      const payload: {
        id?: string;
        name: string;
        is_published: boolean;
        restricted: boolean;
      } = {
        name,
        is_published: isPublished,
        restricted,
      };
      if (initialData && initialData.id) {
        payload.id = initialData.id;
      }
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{initialData ? "Edit Subcategory" : "Add Subcategory"}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subcategory Name"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm">Published</label>
          <Switch
            checked={isPublished}
            onCheckedChange={(val) => setIsPublished(val)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm">Restricted</label>
          <Switch
            checked={restricted}
            onCheckedChange={(val) => setRestricted(val)}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (initialData ? "Updating..." : "Creating...") : (initialData ? "Update" : "Create")}
        </Button>
      </div>
    </form>
  );
};

export default SubcategoryForm;