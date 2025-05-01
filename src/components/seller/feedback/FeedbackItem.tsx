
import React from 'react';
import { ThumbsUp, Flag, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Feedback } from '@/lib/feedback';

interface FeedbackItemProps {
  feedback: Feedback;
}

export const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const { toast } = useToast();
  
  const handleFeedbackAction = (action: 'helpful' | 'report') => {
    if (action === 'helpful') {
      toast({
        title: "Feedback marked as helpful",
        description: "Thank you for your feedback",
      });
    } else {
      toast({
        title: "Feedback reported",
        description: "Our team will review this feedback",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card key={feedback.id} className="border">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{feedback.buyer.name.substring(0, 2)}</AvatarFallback>
              <AvatarImage src={feedback.buyer.image} />
            </Avatar>
            
            <div>
              <div className="font-medium">{feedback.buyer.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < feedback.rating 
                    ? 'text-amber-500 fill-amber-500' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            
            {feedback.verifiedPurchase && (
              <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200">
                Verified Purchase
              </Badge>
            )}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {feedback.productId && (
          <div className="mb-3 text-sm">
            <span className="text-muted-foreground">Product: </span>
            <a href={`/product/${feedback.productId}`} className="text-primary hover:underline">
              {feedback.productName}
            </a>
          </div>
        )}
        
        <p className="text-sm">{feedback.comment}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => handleFeedbackAction('helpful')}
            >
              <ThumbsUp className="h-3 w-3 mr-2" /> Helpful
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => handleFeedbackAction('report')}
            >
              <Flag className="h-3 w-3 mr-2" /> Report
            </Button>
          </div>
        </div>
        
        {feedback.sellerResponse && (
          <div className="bg-muted p-3 rounded-md text-sm mt-3 w-full">
            <p className="font-medium mb-1">Seller response:</p>
            <p>{feedback.sellerResponse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
