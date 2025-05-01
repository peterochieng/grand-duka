
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/types/userTypes";
import { 
  Shield, 
  ShoppingBag, 
  User, 
  Store, 
  UserCog, 
  Factory, 
  BarChart2, 
  ShoppingCart, 
  HeadsetIcon,
  Code
} from "lucide-react";

interface UserRoleBadgeProps {
  role: string;
}

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  // Admin roles
  if (role === "super-admin") {
    return (
      <Badge variant="default" className="bg-purple-600 flex items-center gap-1">
        <Shield className="h-3 w-3" />
        <span>Super Admin</span>
      </Badge>
    );
  }
  
  if (role === "support-admin") {
    return (
      <Badge variant="default" className="bg-blue-600 flex items-center gap-1">
        <HeadsetIcon className="h-3 w-3" />
        <span>Support Admin</span>
      </Badge>
    );
  }
  
  if (role === "developer") {
    return (
      <Badge variant="default" className="bg-green-600 flex items-center gap-1">
        <Code className="h-3 w-3" />
        <span>Developer</span>
      </Badge>
    );
  }
  
  if (role === "user-admin") {
    return (
      <Badge variant="default" className="bg-violet-500 flex items-center gap-1">
        <UserCog className="h-3 w-3" />
        <span>User Admin</span>
      </Badge>
    );
  }
  
  if (role === "seller-admin") {
    return (
      <Badge variant="default" className="bg-amber-600 flex items-center gap-1">
        <Store className="h-3 w-3" />
        <span>Seller Admin</span>
      </Badge>
    );
  }
  
  if (role === "shop-admin") {
    return (
      <Badge variant="default" className="bg-emerald-600 flex items-center gap-1">
        <Store className="h-3 w-3" />
        <span>Shop Admin</span>
      </Badge>
    );
  }
  
  // Retail roles
  if (role === "buyer") {
    return (
      <Badge variant="default" className="bg-green-500 flex items-center gap-1">
        <ShoppingCart className="h-3 w-3" />
        <span>Buyer</span>
      </Badge>
    );
  }
  
  if (role === "sole-proprietor") {
    return (
      <Badge variant="default" className="bg-amber-500 flex items-center gap-1">
        <User className="h-3 w-3" />
        <span>Sole Proprietor</span>
      </Badge>
    );
  }
  
  if (role === "shop-owner") {
    return (
      <Badge variant="default" className="bg-indigo-500 flex items-center gap-1">
        <Store className="h-3 w-3" />
        <span>Shop Owner</span>
      </Badge>
    );
  }
  
  if (role === "shop-employee") {
    return (
      <Badge variant="default" className="bg-teal-500 flex items-center gap-1">
        <UserCog className="h-3 w-3" />
        <span>Shop Employee</span>
      </Badge>
    );
  }
  
  // Bulk trading roles
  if (role === "trader") {
    return (
      <Badge variant="default" className="bg-orange-500 flex items-center gap-1">
        <BarChart2 className="h-3 w-3" />
        <span>Trader</span>
      </Badge>
    );
  }
  
  if (role === "broker") {
    return (
      <Badge variant="default" className="bg-pink-500 flex items-center gap-1">
        <ShoppingBag className="h-3 w-3" />
        <span>Broker</span>
      </Badge>
    );
  }
  
  if (role === "producer") {
    return (
      <Badge variant="default" className="bg-cyan-500 flex items-center gap-1">
        <Factory className="h-3 w-3" />
        <span>Producer</span>
      </Badge>
    );
  }
  
  // For any other role
  return <Badge variant="outline" className="capitalize">{role}</Badge>;
};
