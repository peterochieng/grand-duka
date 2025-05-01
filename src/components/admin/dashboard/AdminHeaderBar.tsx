
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminRole } from '@/lib/types/userTypes';
import { Menu, Package } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderBarProps {
  currentRole: AdminRole | null;
  getRoleIcon: () => LucideIcon;
  getRoleTitle: () => string;
  onLogout: () => void;
}

export const AdminHeaderBar = ({ 
  currentRole, 
  getRoleIcon: getRoleIconFn, 
  getRoleTitle,
  onLogout
}: AdminHeaderBarProps) => {
  const RoleIcon = getRoleIconFn();
  
  return (
    <header className="bg-white dark:bg-gray-950 border-b">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="font-bold">
              <span className="text-[#9b87f5] font-black">G</span>
              <span className="text-[#0EA5E9] font-black">r</span>
              <span className="text-[#F97316] font-black">a</span>
              <span className="text-[#EAB308] font-black">n</span>
              <span className="text-[#9b87f5] font-black">d</span>
              <span className="text-[#3cb371] font-black">u</span>
              <span className="text-[#ea384c] font-black">k</span>
              <span className="text-black font-black">a</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400 font-normal text-sm">Admin</span>
            </span>
          </Link>
          
          <div className="hidden md:block text-sm font-medium text-muted-foreground">
            {currentRole && (
              <div className="flex items-center gap-2">
                <RoleIcon className="h-4 w-4 text-primary" />
                <span>{getRoleTitle()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
          >
            Log Out
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4 flex flex-col gap-4">
                <Link to="/admin/dashboard" className="text-sm font-medium">Dashboard</Link>
                <Link to="/admin/products" className="text-sm font-medium">Products</Link>
                <Link to="/admin/users" className="text-sm font-medium">Users</Link>
                <Link to="/admin/settings" className="text-sm font-medium">Settings</Link>
                <div className="border-t pt-4 mt-4">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={onLogout}
                    className="w-full"
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
