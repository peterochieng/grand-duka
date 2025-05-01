
import React from 'react';

interface WarningSectionProps {
  products: number;
  sellers: number;
  shops: number;
  categories: number;
}

const WarningSection: React.FC<WarningSectionProps> = ({ products, sellers, shops, categories }) => {
  return (
    <>
      <div className="mb-6">
        <p className="text-orange-500 font-medium mb-2">⚠️ Warning</p>
        <p className="text-muted-foreground text-sm">
          This will attempt to add all mock data to your Supabase tables. If you've already populated your database,
          this may cause duplicate entries. This tool is intended for initial setup only.
        </p>
      </div>
      
      <div className="mb-6">
        <p className="font-medium mb-2">This will migrate:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>{products} products</li>
          <li>{sellers} sellers</li>
          <li>{shops} shops</li>
          <li>{categories} categories (and their subcategories)</li>
          <li>Sample feedback entries</li>
        </ul>
      </div>
    </>
  );
};

export default WarningSection;
