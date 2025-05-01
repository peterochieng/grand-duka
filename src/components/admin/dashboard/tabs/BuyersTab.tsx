
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { getProfileName } from '@/hooks/admin/statsHelpers';

// Buyer type definition
interface Buyer {
  id: string;
  user_id: string;
  name: string;
  last_purchase: string | null;
  total_spent: number;
  status: string;
}

export const BuyersTab = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true);
        
        // Get all profiles as potential buyers
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('id', { ascending: false });
        
        if (profilesError) throw new Error(profilesError.message);
        
        // Get all orders to calculate purchases
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*');
        
        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        }
        
        if (!profiles || profiles.length === 0) {
          setBuyers([]);
          return;
        }
        
        // Transform profiles into buyers with purchase data
        const mappedBuyers: Buyer[] = profiles.map(profile => {
          // Filter orders for this user
          const userOrders = orders?.filter(order => order.buyer_id === profile.id) || [];
          
          // Calculate total spent
          const totalSpent = userOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
          
          // Find latest purchase date
          const lastPurchaseDate = userOrders.length > 0 
            ? userOrders.sort((a, b) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              )[0].created_at
            : null;
          
          return {
            id: `B-${profile.id?.substring(0, 4) || Math.random().toString(36).substring(2, 6)}`,
            user_id: profile.id || '',
            name: getProfileName(profile) || 'Unnamed User',
            last_purchase: lastPurchaseDate,
            total_spent: totalSpent,
            status: userOrders.length > 0 ? 'Active' : 'Inactive'
          };
        });
        
        setBuyers(mappedBuyers);
      } catch (err) {
        console.error('Error fetching buyers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch buyers'));
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Buyer Activities</h3>
      <p className="text-muted-foreground mb-4">Monitor buyer behavior, purchases, and engagement.</p>
      
      {error && (
        <div className="text-center py-4 text-red-500">
          <p>Error: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-2">Retry</Button>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading buyers...</div>
      ) : buyers.length === 0 ? (
        <div className="text-center py-4">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-2" />
            <p>No buyers found in the system.</p>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Buyer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last Purchase</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyers.map((buyer) => (
              <TableRow key={buyer.id}>
                <TableCell>{buyer.id}</TableCell>
                <TableCell>{buyer.name}</TableCell>
                <TableCell>{formatDate(buyer.last_purchase)}</TableCell>
                <TableCell>{formatCurrency(buyer.total_spent)}</TableCell>
                <TableCell>
                  <Badge className={buyer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                    {buyer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View History</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
