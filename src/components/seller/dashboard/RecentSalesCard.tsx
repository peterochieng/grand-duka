
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from 'lucide-react';
import { RecentSale } from '@/types/dashboardTypes';

interface RecentSalesCardProps {
  recentSales: RecentSale[];
  loading: boolean;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  onTabChange: (tab: string) => void;
}

export const RecentSalesCard: React.FC<RecentSalesCardProps> = ({
  recentSales,
  loading,
  formatDate,
  formatCurrency,
  onTabChange
}) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
          Recent Sales
        </CardTitle>
        <CardDescription>Your most recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading recent sales...</p>
          </div>
        ) : recentSales.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">#{sale.id.substring(0, 6)}</TableCell>
                  <TableCell>{formatDate(sale.created_at)}</TableCell>
                  <TableCell>{formatCurrency(sale.total_amount)}</TableCell>
                  <TableCell>
                    <Badge variant={sale.status === 'paid' ? 'outline' : 
                              sale.status === 'delivered' ? 'default' : 
                              sale.status === 'pending' ? 'secondary' : 'default'}>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent sales to display</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onTabChange('sales')}>
          View All Sales
        </Button>
      </CardFooter>
    </Card>
  );
};
