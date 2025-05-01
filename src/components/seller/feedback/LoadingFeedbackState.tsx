
import React from 'react';

export const LoadingFeedbackState = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      ))}
    </div>
  );
};
