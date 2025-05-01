
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { StarRating } from '@/components/seller/StarRating';
import { addFeedback } from '@/lib/feedback';

interface AddFeedbackDialogProps {
  sellerId: string;
  sellerName: string;
  productId?: string;
  productName?: string;
}

export const AddFeedbackDialog = ({ 
  sellerId, 
  sellerName, 
  productId, 
  productName 
}: AddFeedbackDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please add a comment with your feedback",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      await addFeedback({
        sellerId,
        rating,
        comment,
        productId,
        productName,
      });
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      
      setOpen(false);
      setComment('');
      setRating(5);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Leave Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Feedback for {sellerName}</DialogTitle>
          <DialogDescription>
            Share your experience with this seller. Your feedback helps other buyers make informed decisions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center space-y-2">
            <Label htmlFor="rating" className="text-center mb-1">Your Rating</Label>
            <StarRating 
              rating={rating} 
              onChange={setRating} 
              size={8}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this seller..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={5}
            />
          </div>
          
          {productId && (
            <div className="border rounded-md p-3 bg-muted/50">
              <p className="text-sm font-medium">Product: {productName}</p>
              <p className="text-xs text-muted-foreground">Your feedback will reference this product</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
