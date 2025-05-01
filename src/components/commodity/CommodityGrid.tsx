
import React from 'react';
import { Button } from '@/components/ui/button';
import CommodityCard from '@/components/CommodityCard';
import { Commodity } from '@/lib/types';

interface CommodityGridProps {
  commodities: Commodity[];
  onClearFilters: () => void;
}

const CommodityGrid = ({ commodities, onClearFilters }: CommodityGridProps) => {
  if (commodities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No commodities found matching your criteria.</p>
        <Button onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {commodities.map(commodity => (
        <CommodityCard key={commodity.id} commodity={commodity} />
      ))}
    </div>
  );
};

export default CommodityGrid;
