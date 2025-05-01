
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
  className?: string;
}

export const NavButton = ({ 
  icon, 
  label, 
  active, 
  onClick, 
  collapsed, 
  className 
}: NavButtonProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={cn(
        "justify-start h-10",
        collapsed ? "w-10 p-0 justify-center" : "w-full",
        active && "bg-primary text-primary-foreground",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {!collapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
};
