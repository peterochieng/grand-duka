
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Store, User, AlertCircle } from "lucide-react";
import { useSellerManager } from "@/hooks/useSellerManager";

export const SellersTab = () => {
  const {
    sellers,
    loading,
    error,
    filter,
    setFilter,
    updateStatus,
    toggleVerification
  } = useSellerManager();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBusinessTypeBadge = (businessType: string) => {
    switch (businessType) {
      case 'sole-proprietor':
        return (
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-blue-500" />
            <span className="text-xs">Sole Proprietor</span>
          </div>
        );
      case 'shop':
        return (
          <div className="flex items-center gap-1">
            <Store className="h-4 w-4 text-purple-500" />
            <span className="text-xs">Shop Owner</span>
          </div>
        );
      default:
        return <span className="text-xs">{businessType}</span>;
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-2">Seller Management</h3>
      <p className="text-muted-foreground mb-4">Manage seller accounts, performance, and approvals.</p>
      
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Sellers
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'suspended' ? 'default' : 'outline'}
            onClick={() => setFilter('suspended')}
          >
            Suspended
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'sole-proprietor' ? 'default' : 'outline'}
            onClick={() => setFilter('sole-proprietor')}
          >
            Sole Proprietors
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'shop' ? 'default' : 'outline'}
            onClick={() => setFilter('shop')}
          >
            Shop Owners
          </Button>
        </div>
        <Button size="sm">Add New Seller</Button>
      </div>
      
      {error && (
        <div className="text-center py-4 text-red-500">
          <p>Error: {error.message}</p>
          <Button onClick={() => setFilter(filter)} className="mt-2">Retry</Button>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading sellers...</div>
      ) : sellers.length === 0 ? (
        <div className="text-center py-4">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-2" />
            <p>No sellers found matching the selected filter.</p>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller ID</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell className="font-mono text-xs">{seller.id.substring(0, 8)}...</TableCell>
                <TableCell className="font-medium">{seller.business_name}</TableCell>
                <TableCell>{seller.owner_name}</TableCell>
                <TableCell>{getBusinessTypeBadge(seller.business_type)}</TableCell>
                <TableCell>{seller.products_count}</TableCell>
                <TableCell>{seller.rating}/5</TableCell>
                <TableCell>
                  {seller.verified ? 
                    <Check className="h-5 w-5 text-green-500" /> : 
                    <X className="h-5 w-5 text-red-500" />
                  }
                </TableCell>
                <TableCell>{getStatusBadge(seller.status)}</TableCell>
                <TableCell>{formatDate(seller.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    {seller.business_type === 'sole-proprietor' && (
                      <Button size="sm" variant="outline">Link to Shop</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
