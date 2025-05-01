
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SellerNotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The seller you're looking for doesn't exist or has been removed.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default SellerNotFound;
