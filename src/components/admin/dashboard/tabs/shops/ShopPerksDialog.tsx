
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useShopPerks } from "@/hooks/useShopPerks";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ShieldCheck, Star, Zap, Clock, BadgeDollarSign } from "lucide-react";
import { useState } from "react";

interface ShopPerksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shopId: string;
  shopName: string;
}

export const ShopPerksDialog = ({
  isOpen,
  onClose,
  shopId,
  shopName
}: ShopPerksDialogProps) => {
  const { perks, assignedPerks, loading, assignPerk, removePerk } = useShopPerks(shopId);
  const [selectedExpiry, setSelectedExpiry] = useState<Date>();
  
  const getPerkIcon = (type: string) => {
    switch (type) {
      case 'fee_discount':
        return <BadgeDollarSign className="w-4 h-4" />;
      case 'visibility_boost':
        return <Star className="w-4 h-4" />;
      case 'featured_listing':
        return <Zap className="w-4 h-4" />;
      case 'priority_support':
        return <ShieldCheck className="w-4 h-4" />;
      case 'extended_listing_duration':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const isPerkAssigned = (perkId: string) => {
    return assignedPerks.some(ap => ap.perk_id === perkId && ap.is_active);
  };

  const getAssignmentId = (perkId: string) => {
    const assignment = assignedPerks.find(ap => ap.perk_id === perkId && ap.is_active);
    return assignment?.id;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Perks for {shopName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-4">Loading perks...</div>
          ) : (
            perks.map(perk => (
              <div key={perk.id} 
                   className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getPerkIcon(perk.perk_type)}
                    <h4 className="font-semibold">{perk.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {perk.description}
                  </p>
                  {isPerkAssigned(perk.id) && (
                    <Badge variant="secondary" className="mt-2">
                      Active
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {!isPerkAssigned(perk.id) ? (
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px]">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedExpiry ? format(selectedExpiry, "PPP") : "Set expiry date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedExpiry}
                            onSelect={setSelectedExpiry}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Button 
                        onClick={() => assignPerk(perk.id, selectedExpiry?.toISOString())}
                      >
                        Assign
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        const assignmentId = getAssignmentId(perk.id);
                        if (assignmentId) removePerk(assignmentId);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
