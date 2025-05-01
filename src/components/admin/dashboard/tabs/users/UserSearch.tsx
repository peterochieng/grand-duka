
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSearchValues, userSearchSchema } from "./forms/userFormSchema";
import { Badge } from "@/components/ui/badge";

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdvancedSearch: (filters: UserSearchValues) => void;
  activeFilters?: UserSearchValues;
}

export const UserSearch: React.FC<UserSearchProps> = ({ 
  searchQuery, 
  onSearchChange,
  onAdvancedSearch,
  activeFilters
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const form = useForm<UserSearchValues>({
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      query: searchQuery || "",
      role: activeFilters?.role || undefined,
      dateRange: activeFilters?.dateRange || undefined,
      isOnline: activeFilters?.isOnline || false
    }
  });

  const handleClearSearch = () => {
    onSearchChange("");
    form.reset({
      query: "",
      role: undefined,
      dateRange: undefined,
      isOnline: false
    });
    onAdvancedSearch({});
  };

  const handleBasicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    form.setValue("query", value);
  };

  const onSubmit = (data: UserSearchValues) => {
    onAdvancedSearch(data);
    setIsAdvancedOpen(false);
  };

  const hasActiveFilters = activeFilters && (
    activeFilters.role || 
    activeFilters.dateRange?.from || 
    activeFilters.dateRange?.to ||
    activeFilters.isOnline
  );

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..." 
          className="pl-8 pr-8"
          value={searchQuery}
          onChange={handleBasicSearch}
        />
        {searchQuery && (
          <button 
            className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className={hasActiveFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <h3 className="text-sm font-medium mb-3">Advanced Search</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Any role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Any role</SelectItem>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                        <SelectItem value="shop-owner">Shop Owner</SelectItem>
                        <SelectItem value="shop-employee">Shop Employee</SelectItem>
                        <SelectItem value="trader">Trader</SelectItem>
                        <SelectItem value="broker">Broker</SelectItem>
                        <SelectItem value="producer">Producer</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="user-admin">User Admin</SelectItem>
                        <SelectItem value="seller-admin">Seller Admin</SelectItem>
                        <SelectItem value="shop-admin">Shop Admin</SelectItem>
                        <SelectItem value="support-admin">Support Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange.from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Last Active From</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date > new Date() || 
                        (form.getValues("dateRange.to") ? date > form.getValues("dateRange.to")! : false)
                      }
                      initialFocus
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange.to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Last Active To</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date > new Date() || 
                        (form.getValues("dateRange.from") ? date < form.getValues("dateRange.from")! : false)
                      }
                      initialFocus
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOnline"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <FormLabel>Currently Online Only</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClearSearch}
                >
                  Clear All
                </Button>
                <Button type="submit">Apply Filters</Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>

      {/* Display active filters */}
      {hasActiveFilters && (
        <div className="flex gap-2 flex-wrap">
          {activeFilters.role && (
            <Badge variant="outline" className="bg-primary/10 gap-1">
              Role: {activeFilters.role}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...activeFilters, role: undefined};
                  onAdvancedSearch(newFilters);
                }}
              />
            </Badge>
          )}
          {activeFilters.dateRange?.from && (
            <Badge variant="outline" className="bg-primary/10 gap-1">
              From: {format(activeFilters.dateRange.from, "MMM d, yyyy")}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  const newFilters = {
                    ...activeFilters, 
                    dateRange: {
                      ...activeFilters.dateRange,
                      from: undefined
                    }
                  };
                  onAdvancedSearch(newFilters);
                }}
              />
            </Badge>
          )}
          {activeFilters.dateRange?.to && (
            <Badge variant="outline" className="bg-primary/10 gap-1">
              To: {format(activeFilters.dateRange.to, "MMM d, yyyy")}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  const newFilters = {
                    ...activeFilters, 
                    dateRange: {
                      ...activeFilters.dateRange,
                      to: undefined
                    }
                  };
                  onAdvancedSearch(newFilters);
                }}
              />
            </Badge>
          )}
          {activeFilters.isOnline && (
            <Badge variant="outline" className="bg-primary/10 gap-1">
              Online only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...activeFilters, isOnline: false};
                  onAdvancedSearch(newFilters);
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
