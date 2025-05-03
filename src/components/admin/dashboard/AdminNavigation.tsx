
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

  // Safe className handling with explicit type assertions
  const containerClassName = cn("h-full", className || "");
  const itemsContainerClassName = cn(
    "flex flex-col gap-2 p-2",
    collapsed ? "items-center" : ""
  );

  return (
    <div className={containerClassName}>
      <div className="h-full overflow-auto">
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
    </div>
  );
};
