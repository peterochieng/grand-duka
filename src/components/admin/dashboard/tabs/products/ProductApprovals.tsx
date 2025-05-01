
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowUpDown, Loader2 } from "lucide-react";
import { ProductWithApproval, getProductsForApproval, approveProduct, rejectProduct } from '@/services/productApprovalService';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const ProductApprovals = () => {
  const [products, setProducts] = useState<ProductWithApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'oldest' | 'newest'>('newest');
  const [processingProducts, setProcessingProducts] = useState<Set<string>>(new Set());
  const { user } = useCurrentUser();

  // Fetch products awaiting approval
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const pendingProducts = await getProductsForApproval();
        
        // Sort products by creation date
        const sortedProducts = [...pendingProducts].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products for approval:', error);
        toast.error('Failed to load products awaiting approval');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]);

  const handleApprove = async (productId: string) => {
    if (!user?.id) {
      toast.error('User information not available');
      return;
    }
    
    setProcessingProducts(prev => new Set(prev).add(productId));
    
    try {
      const success = await approveProduct(productId, user.id);
      
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        toast.success('Product approved successfully');
      } else {
        toast.error('Failed to approve product');
      }
    } catch (error) {
      console.error('Error approving product:', error);
      toast.error('An error occurred while approving the product');
    } finally {
      setProcessingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleReject = async (productId: string) => {
    if (!user?.id) {
      toast.error('User information not available');
      return;
    }
    
    setProcessingProducts(prev => new Set(prev).add(productId));
    
    try {
      const success = await rejectProduct(productId, user.id);
      
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        toast.success('Product rejected successfully');
      } else {
        toast.error('Failed to reject product');
      }
    } catch (error) {
      console.error('Error rejecting product:', error);
      toast.error('An error occurred while rejecting the product');
    } finally {
      setProcessingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const toggleSort = () => {
    setSortBy(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Product Approvals</CardTitle>
        <CardDescription>
          Review and approve product listings submitted by sellers
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No products awaiting approval</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={toggleSort}>
                <ArrowUpDown className="h-4 w-4 mr-1" />
                {sortBy === 'newest' ? 'Newest First' : 'Oldest First'}
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {product.currency} {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {product.seller.name}
                      {product.seller.verified && (
                        <Badge variant="secondary" className="ml-1">Verified</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-green-500 hover:bg-green-500 hover:text-white"
                          onClick={() => handleApprove(product.id)}
                          disabled={processingProducts.has(product.id)}
                        >
                          {processingProducts.has(product.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => handleReject(product.id)}
                          disabled={processingProducts.has(product.id)}
                        >
                          {processingProducts.has(product.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
};
