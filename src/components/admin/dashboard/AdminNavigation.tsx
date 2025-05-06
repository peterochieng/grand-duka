import { cn } from "@/lib/utils";
import { AdminRole } from "@/lib/types/userTypes";
import { NavButton } from "./nav/NavButton";
import { navItems } from "./nav/navItems";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  currentRole: AdminRole | string | null;
  className?: string;
}

export const AdminNavigation = ({ 
  activeTab, 
  onTabChange, 
  collapsed, 
  currentRole, 
  className 
}: NavigationProps) => {
  const filteredItems = navItems.filter(item => 
    currentRole && item.allowedRoles.includes(currentRole as AdminRole)
  );

  // Update the container to use a horizontal layout.
  const containerClassName = cn("w-full", className || "");
  const itemsContainerClassName = cn(
    "flex items-center gap-4 p-2 overflow-x-auto", // changed from flex-col to flex-row with horizontal scrolling if needed
  );

  return (
    <div className={containerClassName}>
      <div className={itemsContainerClassName}>
        {filteredItems.map((item) => {
          const IconComponent = item.icon as React.ComponentType<{ className: string }>;
          
          return (
            <NavButton
              key={item.value}
              icon={<IconComponent className="h-5 w-5" />}
              label={item.label}
              active={activeTab === item.value}
              onClick={() => onTabChange(item.value)}
              collapsed={collapsed}
              className={typeof item.className === 'string' ? item.className : ""}
            />
          );
        })}
      </div>
    </div>
  );
};