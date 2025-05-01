
import React from 'react';
import { Store, TrendingUp, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ShopStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card>
        <CardHeader className="text-center">
          <Store className="h-8 w-8 mx-auto mb-2 text-primary" />
          <CardTitle>10,000+</CardTitle>
          <CardDescription>Active Sellers</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
          <CardTitle>$250M+</CardTitle>
          <CardDescription>Monthly Trading Volume</CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
          <CardTitle>5M+</CardTitle>
          <CardDescription>Registered Users</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ShopStats;
