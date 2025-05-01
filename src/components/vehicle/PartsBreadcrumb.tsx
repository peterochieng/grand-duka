
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const PartsBreadcrumb = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Link to="/">
        <Car className="h-6 w-6" />
      </Link>
      <Link to="/" className="font-bold text-xl">
        <span className="text-[#9b87f5] font-black">G</span>
        <span className="text-[#0EA5E9] font-black">r</span>
        <span className="text-[#F97316] font-black">a</span>
        <span className="text-[#EAB308] font-black">n</span>
        <span className="text-[#9b87f5] font-black">d</span>
        <span className="text-[#3cb371] font-black">u</span>
        <span className="text-[#ea384c] font-black">k</span>
        <span className="text-black font-black">a</span>
      </Link>
      <span className="text-muted-foreground">|</span>
      <Link to="/category/vehicles" className="text-muted-foreground hover:text-foreground">Vehicles</Link>
      <span className="text-muted-foreground">|</span>
      <span>Parts & Accessories</span>
    </div>
  );
};

export default PartsBreadcrumb;
