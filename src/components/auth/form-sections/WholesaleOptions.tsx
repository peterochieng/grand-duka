
import React from 'react';
import { Boxes } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface WholesaleOptionsProps {
  isTraderTeam: boolean;
  setIsTraderTeam: (value: boolean) => void;
  traderId: string;
  setTraderId: (id: string) => void;
}

export const WholesaleOptions = ({
  isTraderTeam,
  setIsTraderTeam,
  traderId,
  setTraderId
}: WholesaleOptionsProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="trader-team" 
          checked={isTraderTeam}
          onCheckedChange={(checked) => {
            setIsTraderTeam(checked as boolean);
            if (!checked) setTraderId('');
          }}
        />
        <Label htmlFor="trader-team" className="cursor-pointer">
          I'm part of a trading team
        </Label>
      </div>
      
      {isTraderTeam && (
        <div className="space-y-2">
          <Label htmlFor="trader-id">
            <Boxes className="h-4 w-4 inline mr-1" />
            Trader ID
          </Label>
          <Input
            id="trader-id"
            placeholder="Enter the trader ID provided by your employer"
            value={traderId}
            onChange={(e) => setTraderId(e.target.value)}
          />
        </div>
      )}
    </>
  );
};
