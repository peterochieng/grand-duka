
import React from 'react';
import { Button } from '@/components/ui/button';

interface FeedbackFilterProps {
  feedbackCount: number;
  currentFilter: 'all' | 'positive' | 'negative';
  onFilterChange: (filter: 'all' | 'positive' | 'negative') => void;
}

export const FeedbackFilter = ({ 
  feedbackCount, 
  currentFilter, 
  onFilterChange 
}: FeedbackFilterProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">Customer Feedback</h3>
        <p className="text-sm text-muted-foreground">
          {feedbackCount} {feedbackCount === 1 ? 'review' : 'reviews'} for this seller
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant={currentFilter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          All
        </Button>
        <Button 
          variant={currentFilter === 'positive' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onFilterChange('positive')}
        >
          Positive
        </Button>
        <Button 
          variant={currentFilter === 'negative' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onFilterChange('negative')}
        >
          Negative
        </Button>
      </div>
    </div>
  );
};
