import React, { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getRejectedListings, resubmitListing, challengeListing } from '@/services/productApprovalService';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const SellerRejectedListings: React.FC = () => {
  const { user } = useCurrentUser();
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State for Challenge Modal
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [currentChallengeListing, setCurrentChallengeListing] = useState<Product | null>(null);
  const [challengeComment, setChallengeComment] = useState<string>('');

  useEffect(() => {
    const fetchListings = async () => {
      if (user?.id) {
        setLoading(true);
        const rejected = await getRejectedListings(user.id);
        setListings(rejected);
        setLoading(false);
      }
    };
    fetchListings();
  }, [user]);

  const handleResubmit = async (productId: string) => {
    const success = await resubmitListing(productId);
    if (success) {
      toast.success('Listing resubmitted successfully!');
      // Remove from local state upon success
      setListings((prev) => prev.filter((listing) => listing.id !== productId));
    } else {
      toast.error('Failed to resubmit listing.');
    }
  };

  // Modified handleChallenge: open the dialog and set the current listing
  const handleChallenge = (product: Product) => {
    setCurrentChallengeListing(product);
    setChallengeComment(''); // Reset challenge comment
    setShowChallengeDialog(true);
  };

  // When challenge is submitted, call challengeListing service
  const handleChallengeSubmit = async () => {
    if (!currentChallengeListing) return;
    const success = await challengeListing(currentChallengeListing.id, challengeComment);
    if (success) {
      toast.success('Listing challenged successfully!');
      // Remove listing from local state
      setListings((prev) => prev.filter((listing) => listing.id !== currentChallengeListing.id));
    } else {
      toast.error('Failed to challenge listing.');
    }
    setShowChallengeDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rejected Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading rejected listings...</p>
        ) : listings.length === 0 ? (
          <p>No rejected listings found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rejection Feedback</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>
                    {listing.currency} {listing.price}
                  </TableCell>
                  <TableCell>{listing.rejection_reason || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResubmit(listing.id)}
                      className="mr-2"
                    >
                      Resubmit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleChallenge(listing)}>
                      Challenge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Challenge Modal */}
      <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Challenge Rejection</DialogTitle>
            <DialogDescription>
              Please provide a comment explaining why you challenge the rejection.
            </DialogDescription>
          </DialogHeader>
          <textarea
            className="w-full border rounded p-2 mt-2"
            placeholder="Enter your challenge comment..."
            value={challengeComment}
            onChange={(e) => setChallengeComment(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChallengeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChallengeSubmit}>
              Submit Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SellerRejectedListings;