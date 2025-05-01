
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

interface BuyingOption {
  id: string;
  option_type: 'bidding' | 'price_offer' | 'buy_now' | 'free';
  is_enabled: boolean;
  max_counteroffers: number;
}

export const BuyingOptionsManager = () => {
  const queryClient = useQueryClient();

  const { data: buyingOptions, isLoading } = useQuery({
    queryKey: ['buying-options'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('buying_options')
        .select('*')
        .order('option_type');
      
      if (error) throw error;
      return data as BuyingOption[];
    }
  });

  const updateOptionMutation = useMutation({
    mutationFn: async (option: Partial<BuyingOption> & { id: string }) => {
      const { error } = await supabase
        .from('buying_options')
        .update(option)
        .eq('id', option.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buying-options'] });
      toast.success('Buying option updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update buying option');
      console.error('Error updating buying option:', error);
    }
  });

  const handleToggleOption = (option: BuyingOption) => {
    updateOptionMutation.mutate({
      id: option.id,
      is_enabled: !option.is_enabled
    });
  };

  const handleCounteroffersChange = (option: BuyingOption, value: number) => {
    updateOptionMutation.mutate({
      id: option.id,
      max_counteroffers: value
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buying Options</CardTitle>
        <CardDescription>
          Enable or disable buying options and set counteroffer limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {buyingOptions?.map((option) => (
          <div key={option.id} className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <Label className="text-base capitalize">
                {option.option_type.replace('_', ' ')}
              </Label>
              {option.option_type === 'price_offer' && (
                <div className="mt-2">
                  <Label htmlFor={`counteroffers-${option.id}`} className="text-sm text-muted-foreground">
                    Maximum counteroffers
                  </Label>
                  <Input
                    id={`counteroffers-${option.id}`}
                    type="number"
                    min="0"
                    className="w-24 mt-1"
                    value={option.max_counteroffers}
                    onChange={(e) => handleCounteroffersChange(option, parseInt(e.target.value))}
                    disabled={!option.is_enabled}
                  />
                </div>
              )}
            </div>
            <Switch
              checked={option.is_enabled}
              onCheckedChange={() => handleToggleOption(option)}
              aria-label={`Toggle ${option.option_type}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
