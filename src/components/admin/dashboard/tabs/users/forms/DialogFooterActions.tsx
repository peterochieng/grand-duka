
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogFooterActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}

export const DialogFooterActions: React.FC<DialogFooterActionsProps> = ({ 
  onClose, 
  isSubmitting 
}) => {
  return (
    <DialogFooter className="pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create User"}
      </Button>
    </DialogFooter>
  );
};
