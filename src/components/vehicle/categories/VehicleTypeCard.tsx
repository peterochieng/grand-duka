
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface VehicleType {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  subcategories: string[];
}

interface VehicleTypeCardProps {
  type: VehicleType;
}

const VehicleTypeCard = ({ type }: VehicleTypeCardProps) => {
  return (
    <Card className="overflow-hidden border-gray-200 hover:border-primary transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <type.icon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{type.name}</h3>
              <span className="text-sm text-muted-foreground">{type.count} items</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {type.subcategories.slice(0, 4).map((subcat, index) => (
                <span key={index} className="inline-block">
                  {index > 0 && <span className="mx-1">{index === type.subcategories.length - 1 ? '' : ','}</span>}
                  {subcat}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to={`/category/vehicles/${type.id}`}>Browse {type.name}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeCard;
