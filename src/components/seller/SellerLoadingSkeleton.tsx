
import React from 'react';

const SellerLoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-800 h-16 w-16"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default SellerLoadingSkeleton;
