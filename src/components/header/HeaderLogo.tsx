
import { Link } from 'react-router-dom';

export const HeaderLogo = () => {
  return (
    <Link 
      to="/" 
      className="text-2xl font-bold transition-all duration-300 hover:opacity-80"
    >
      <span className="text-[#9b87f5] font-black">G</span>
      <span className="text-[#0EA5E9] font-black">r</span>
      <span className="text-[#F97316] font-black">a</span>
      <span className="text-[#EAB308] font-black">n</span>
      <span className="text-[#9b87f5] font-black">d</span>
      <span className="text-[#3cb371] font-black">u</span>
      <span className="text-[#ea384c] font-black">k</span>
      <span className="text-black font-black">a</span>
    </Link>
  );
};
