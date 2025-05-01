
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
import { Trophy, PaintBucket, Award, Brush, SquareAsterisk } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

const CollectiblesFields = () => {
  const form = useFormContext();
  
  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center">
        <Trophy className="mr-2 h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Collectibles & Art Details</h3>
      </div>
      
      <Separator />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.itemType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Item Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="print">Print</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="homeDecoration">Home Decoration</SelectItem>
                <SelectItem value="fiberware">Fiberware</SelectItem>
                <SelectItem value="antique">Antique</SelectItem>
                <SelectItem value="wallDecor">Wall Decor</SelectItem>
                <SelectItem value="limitedEdition">Limited Edition</SelectItem>
                <SelectItem value="memorabilia">Memorabilia</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.artist"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Artist/Creator</FormLabel>
            <FormControl>
              <Input placeholder="Enter artist or creator name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Created</FormLabel>
            <FormControl>
              <Input placeholder="Enter year created" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.material"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Materials</FormLabel>
            <FormControl>
              <Input placeholder="Enter materials used" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.dimensions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dimensions</FormLabel>
            <FormControl>
              <Input placeholder="E.g. 24 x 36 inches" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.isLimitedEdition"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Limited Edition</FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.editionNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Edition Number (if applicable)</FormLabel>
            <FormControl>
              <Input placeholder="E.g. 5/100" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="collectiblesDetails.authenticityCertificate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Includes Certificate of Authenticity</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CollectiblesFields;
