
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface TrackingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trackingNumber: string) => Promise<void>;
  isProcessing: boolean;
}

export const TrackingDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isProcessing 
}: TrackingDialogProps) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = async () => {
    if (!trackingNumber.trim()) return;
    await onSubmit(trackingNumber);
    setTrackingNumber('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tracking Number</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing || !trackingNumber.trim()}
          >
            Save Tracking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
