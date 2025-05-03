import React, { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { deleteListing, getSellerListings, /* other functions */ } from '@/services/productApprovalService';
import { togglePublishStatus } from '@/services/productApprovalService';
import { Link } from 'react-router-dom';

const SellerInventory: React.FC = () => {
  const { user } = useCurrentUser();
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (user?.id) {
        setLoading(true);
        const data = await getSellerListings(user.id);
        setListings(data);
        setLoading(false);
      }
    };
    fetchListings();
  }, [user]);

  const handlePublishToggle = async (product: Product) => {
    // Determine the desired state: if currently published, then unpublish; otherwise publish.
    const isCurrentlyPublished = product.approval_status === 'published';
    const desiredState = !isCurrentlyPublished;
    
    const success = await togglePublishStatus(product.id, desiredState);
    if (success) {
      toast.success(`Listing ${desiredState ? 'published' : 'unpublished'} successfully!`);
      // Update local state to reflect the change
      setListings((prevListings) =>
        prevListings.map((l) =>
          l.id === product.id ? { ...l, approval_status: desiredState ? 'published' : 'pending' } : l
        )
      );
    } else {
      toast.error(`Failed to update listing status.`);
    }
  };

  const handleDeleteListing = async (productId: string) => {
    const success = await deleteListing(productId);
    if (success) {
      toast.success('Listing deleted successfully!');
      // Remove the deleted listing from the local state
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== productId));
    } else {
      toast.error('Failed to delete listing.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Listings Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading your listings...</p>
        ) : listings.length === 0 ? (
          <p>You have no listings.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.approval_status}</TableCell>
                  <TableCell>
                    {listing.currency} {listing.price}
                  </TableCell>
                  <TableCell>
  <Button
    size="sm"
    variant="outline"
    onClick={() => handlePublishToggle(listing)}
    className="mr-2"
  >
    {listing.approval_status === 'published' ? 'Unpublish' : 'Publish'}
  </Button>
  <Link to={`/retail/seller-dashboard/listings/edit/${listing.id}`}>
  <Button size="sm" variant="ghost">Edit</Button>
</Link>
<Button
    size="sm"
    variant="destructive"
    onClick={() => handleDeleteListing(listing.id)}
  >
    Delete
  </Button>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerInventory;