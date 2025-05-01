
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

interface TicketEscalationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEscalate: (priority: string, notes: string) => Promise<void>;
  isSubmitting: boolean;
}

export const TicketEscalationDialog = ({
  isOpen,
  onClose,
  onEscalate,
  isSubmitting
}: TicketEscalationDialogProps) => {
  const [priority, setPriority] = useState<string>('medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!notes.trim()) return;
    await onEscalate(priority, notes);
    setNotes('');
    setPriority('medium');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Escalate to Development Team
          </DialogTitle>
          <DialogDescription>
            Provide details about the issue that requires developer attention
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="critical">Critical Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Developer Notes</Label>
            <Textarea
              id="notes"
              placeholder="Describe the technical issue and any relevant details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!notes.trim() || isSubmitting}
          >
            {isSubmitting ? 'Escalating...' : 'Escalate Issue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
