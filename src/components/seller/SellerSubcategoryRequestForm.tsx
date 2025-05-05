import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SellerSubcategoryRequestFormProps {
  categoryId: string;
  categoryName: string;
  onClose: () => void;
}

const SellerSubcategoryRequestForm: React.FC<SellerSubcategoryRequestFormProps> = ({ categoryId, categoryName, onClose }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subcategoryName.trim()) {
      toast.error("Please enter a subcategory name.");
      return;
    }
    setLoading(true);
    try {
      // Retrieve the current session to get the requested_by value.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("User not signed in.");
        return;
      }
      // Insert the new subcategory request into the database.
      const { error } = await supabase
        .from('subcategory_requests')
        .insert([
          {
            subcategory_name: subcategoryName,
            category_name: categoryName,
            requested_by: session.user.id,
            // status will use the default value ('pending')
          },
        ]);
      if (error) throw error;
      toast.success("Subcategory request submitted successfully.");
      setSubcategoryName('');
      onClose();
    } catch (error) {
      console.error("Error submitting subcategory request:", error);
      toast.error("Failed to submit subcategory request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded p-4">
      <h3 className="text-lg font-bold">Request a New Subcategory</h3>
      <Input
        type="text"
        placeholder="Subcategory Name"
        value={subcategoryName}
        onChange={(e) => setSubcategoryName(e.target.value)}
        className="w-full"
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SellerSubcategoryRequestForm;