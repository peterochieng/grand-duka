
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';

interface PlaceBidDialogProps {
  product: Product;
  onPlaceBid: (amount: number) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceBidDialog = ({
  product,
  onPlaceBid,
  isOpen,
  onClose
}: PlaceBidDialogProps) => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onPlaceBid(Number(amount));
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentBid = product.listingTypes?.auction?.currentBid || 0;
  const minBid = currentBid + (currentBid * 0.05); // 5% higher than current bid

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Place your bid for {product.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Bid Amount ({product.currency})
            </label>
            <Input
              id="amount"
              type="number"
              required
              min={minBid}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Minimum bid: ${product.currency} ${minBid}`}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !amount || Number(amount) < minBid}
            >
              Place Bid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
