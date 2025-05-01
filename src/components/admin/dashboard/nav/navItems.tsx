
import {
  LayoutDashboard,
  Users,
  Tag,
  Store,
  ShoppingBag,
  Store as BuildingStore,
  LayoutGrid,
  Settings,
  BarChart3,
  HelpCircle,
  Car,
  BookOpen,
  Lock,
  MessagesSquare,
  File,
  Code2
} from "lucide-react";
import { AdminRole } from "@/lib/types/userTypes";

export interface NavItem {
  icon: React.ComponentType;
  label: string;
  value: string;
  allowedRoles: AdminRole[];
  className?: string;
}

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard", allowedRoles: ["super-admin", "user-admin", "seller-admin", "shop-admin", "support-admin", "developer"] },
  { icon: Users, label: "Users", value: "users", allowedRoles: ["super-admin", "user-admin"] },
  { icon: Tag, label: "Products", value: "products", allowedRoles: ["super-admin", "seller-admin", "shop-admin"] },
  { icon: Store, label: "Sellers", value: "sellers", allowedRoles: ["super-admin", "seller-admin"] },
  { icon: ShoppingBag, label: "Buyers", value: "buyers", allowedRoles: ["super-admin", "user-admin"] },
  { icon: BuildingStore, label: "Shops", value: "shops", allowedRoles: ["super-admin", "shop-admin"] },
  { icon: LayoutGrid, label: "Categories", value: "categories", allowedRoles: ["super-admin", "seller-admin", "shop-admin"] },
  { icon: File, label: "Templates", value: "templates", allowedRoles: ["super-admin"] },
  { icon: Settings, label: "Settings", value: "settings", allowedRoles: ["super-admin", "developer"] },
  { icon: BarChart3, label: "Analytics", value: "data-analytics", allowedRoles: ["super-admin", "support-admin"] },
  { icon: HelpCircle, label: "Support", value: "support-center", allowedRoles: ["super-admin", "support-admin"] },
  { icon: Car, label: "Inspections", value: "inspections", allowedRoles: ["super-admin"] },
  { icon: BookOpen, label: "User Guides", value: "user-guides", allowedRoles: ["super-admin", "support-admin"] },
  { icon: Lock, label: "Permissions", value: "permissions", allowedRoles: ["super-admin"] },
  { icon: MessagesSquare, label: "FAQ", value: "faq", allowedRoles: ["super-admin", "support-admin"] },
  { icon: Code2, label: "Dev Tasks", value: "dev-tasks", allowedRoles: ["super-admin", "developer"] }
];
