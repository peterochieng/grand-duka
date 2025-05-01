
import VehicleTypeCard from './VehicleTypeCard';
import { LucideIcon } from 'lucide-react';

interface VehicleType {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  subcategories: string[];
}

interface VehicleTabContentProps {
  vehicleTypes: VehicleType[];
}

const VehicleTabContent = ({ vehicleTypes }: VehicleTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicleTypes.map(type => (
        <VehicleTypeCard key={type.id} type={type} />
      ))}
    </div>
  );
};

export default VehicleTabContent;
