import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const SellerCategoryRequestForm = () => {
  const { user } = useCurrentUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notifySellers, setNotifySellers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error('User not found. Please sign in properly.');
      return;
    }
    if (!name.trim()) {
      toast.error('Category name is required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('category_requests')
        .insert([
          {
            seller_id: user.id,
            name: name,
            description: description,
            notify_sellers: notifySellers,
          },
        ]);
      if (error) {
        console.error('Error submitting category request:', error);
        toast.error('Failed to submit request.');
      } else {
        toast.success('Category request submitted successfully!');
        setSubmitted(true);
        // Optionally clear form fields:
        setName('');
        setDescription('');
        setNotifySellers(false);
      }
    } catch (err) {
      console.error('Exception submitting category request:', err);
      toast.error('Failed to submit request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Request Submitted</CardTitle>
          <CardDescription>Your category request is pending review.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Request a New Category</CardTitle>
        <CardDescription>
          If you don't see a category that fits, request one below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="category-name" className="block text-sm font-medium">
              Category Name
            </label>
            <Input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter desired category name"
              required
            />
          </div>
          <div>
            <label htmlFor="category-description" className="block text-sm font-medium">
              Description (Optional)
            </label>
            <Textarea
              id="category-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe why this category is needed"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="notify-sellers"
              checked={notifySellers}
              onCheckedChange={setNotifySellers}
            />
            <label htmlFor="notify-sellers" className="text-sm">
              Notify all sellers about this request
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};