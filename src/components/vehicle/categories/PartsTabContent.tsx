
import PartCard from './PartCard';
import { Gauge, CircuitBoard, LayoutGrid, Wrench, Radio, Cpu, Shield, Truck } from 'lucide-react';

const PartsTabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PartCard
        title="Engines & Components"
        icon={Gauge}
        description="Engines, parts and performance components"
        count={1234}
        path="/category/vehicle parts"
      />

      <PartCard
        title="Audio & Electronics"
        icon={Radio}
        description="Car audio, speakers, and electronics"
        count={567}
        path="/category/vehicle parts"
      />

      <PartCard
        title="Wheels & Tires"
        icon={LayoutGrid}
        description="Wheels, rims and performance tires"
        count={890}
        path="/category/vehicle parts"
      />

      <PartCard
        title="Performance Parts"
        icon={Cpu}
        description="Upgrades for better performance and handling"
        count={723}
        path="/category/vehicle parts"
      />
      
      <PartCard
        title="Exterior Accessories"
        icon={Shield}
        description="Body kits, lighting and exterior styling"
        count={542}
        path="/category/vehicle parts"
      />
      
      <PartCard
        title="Truck & Off-Road"
        icon={Truck}
        description="Specialized parts for trucks and off-road vehicles"
        count={398}
        path="/category/vehicle parts"
      />
      
      <PartCard
        title="All Parts & Accessories"
        icon={Wrench}
        description="View all parts and accessories categories"
        count={3212}
        path="/category/vehicle parts"
        isHighlighted={true}
      />
    </div>
  );
};

export default PartsTabContent;
