
import React from 'react';
import { Star } from 'lucide-react';

export const EmptyFeedbackState = () => {
  return (
    <div className="text-center py-12 border rounded-md">
      <Star className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
      <h3 className="text-lg font-medium">No feedback yet</h3>
      <p className="text-muted-foreground">This seller hasn't received any feedback yet.</p>
    </div>
  );
};
