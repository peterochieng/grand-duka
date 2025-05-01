
import { Button } from "@/components/ui/button";
import { PlusIcon, Upload } from 'lucide-react';

interface InventoryActionsProps {
  onAddNew: () => void;
  onUpload: () => void;
}

const InventoryActions = ({ onAddNew, onUpload }: InventoryActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={onUpload}>
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
      <Button onClick={onAddNew}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
};

export default InventoryActions;
