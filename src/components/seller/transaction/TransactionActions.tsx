
import { Button } from "@/components/ui/button";
import { Check, X, Truck, FileText } from "lucide-react";

interface TransactionActionsProps {
  onComplete: () => Promise<void>;
  onCancel: () => Promise<void>;
  onAddTracking: () => void;
  isProcessing: boolean;
}

export const TransactionActions = ({
  onComplete,
  onCancel,
  onAddTracking,
  isProcessing
}: TransactionActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={onAddTracking} 
          variant="outline"
          disabled={isProcessing}
          className="flex items-center justify-center"
        >
          <Truck className="mr-2 h-4 w-4" />
          Add Tracking Number
        </Button>
        
        <div className="flex justify-between space-x-2">
          <Button 
            onClick={onComplete} 
            className="flex-1 bg-green-500 hover:bg-green-600"
            disabled={isProcessing}
          >
            <Check className="mr-2 h-4 w-4" />
            Complete
          </Button>
          <Button 
            onClick={onCancel}
            variant="destructive"
            className="flex-1"
            disabled={isProcessing}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel & Refund
          </Button>
        </div>
        
        <Button 
          variant="secondary"
          disabled={isProcessing}
          className="flex items-center justify-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          View Receipt
        </Button>
      </div>
    </div>
  );
};
