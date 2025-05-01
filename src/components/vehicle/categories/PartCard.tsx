
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface PartCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  count: number;
  path: string;
  isHighlighted?: boolean;
}

const PartCard = ({ title, icon: Icon, description, count, path, isHighlighted = false }: PartCardProps) => {
  return (
    <Card className={`overflow-hidden border-gray-200 hover:border-primary transition-colors ${
      isHighlighted ? 'bg-blue-50 dark:bg-blue-950/20' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${
            isHighlighted ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-50'
          }`}>
            <Icon className={`h-6 w-6 ${
              isHighlighted ? 'text-blue-700 dark:text-blue-300' : 'text-blue-500'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{title}</h3>
              <span className="text-sm text-muted-foreground">{count} items</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {description}
            </div>
            <Button asChild className={`w-full ${!isHighlighted ? 'variant="outline"' : ''}`}>
              <Link to={path}>Browse {title}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;
