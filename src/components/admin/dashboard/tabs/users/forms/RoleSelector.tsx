
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RoleSelector: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User Role</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
              <SelectItem value="shop-owner">Shop Owner</SelectItem>
              <SelectItem value="shop-employee">Shop Employee</SelectItem>
              <SelectItem value="trader">Trader</SelectItem>
              <SelectItem value="broker">Broker</SelectItem>
              <SelectItem value="producer">Producer</SelectItem>
              <SelectItem value="user-admin">User Admin</SelectItem>
              <SelectItem value="seller-admin">Seller Admin</SelectItem>
              <SelectItem value="shop-admin">Shop Admin</SelectItem>
              <SelectItem value="support-admin">Support Admin</SelectItem>
              <SelectItem value="super-admin">Super Admin</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
