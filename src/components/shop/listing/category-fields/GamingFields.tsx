
import React from 'react';
import { 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Gamepad2, Headphones, Mic, Monitor } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const GamingFields = () => {
  const form = useFormContext();
  
  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center">
        <Gamepad2 className="mr-2 h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Gaming Details</h3>
      </div>
      
      <Separator />
      
      <FormField
        control={form.control}
        name="gamingDetails.productType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="console">Console</SelectItem>
                <SelectItem value="game">Video Game</SelectItem>
                <SelectItem value="controller">Controller</SelectItem>
                <SelectItem value="headset">Headset</SelectItem>
                <SelectItem value="microphone">Microphone</SelectItem>
                <SelectItem value="monitor">Gaming Monitor</SelectItem>
                <SelectItem value="charging_dock">Charging Dock</SelectItem>
                <SelectItem value="vr_headset">VR Headset</SelectItem>
                <SelectItem value="accessories">Other Accessories</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="gamingDetails.platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="multi">Multi-platform</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="gamingDetails.connectivity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Connectivity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select connectivity type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="wired">Wired</SelectItem>
                <SelectItem value="wireless">Wireless</SelectItem>
                <SelectItem value="bluetooth">Bluetooth</SelectItem>
                <SelectItem value="both">Both Wired & Wireless</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="gamingDetails.model"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter model number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default GamingFields;
