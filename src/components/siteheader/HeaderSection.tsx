
import React from 'react';
import { Link } from 'react-router-dom';
import SiteNavigation from '../SiteNavigation';

export const HeaderSection = () => {
  return (
    <div className="flex items-center gap-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-bold text-xl">
          <span className="text-[#9b87f5] font-black">G</span>
          <span className="text-[#0EA5E9] font-black">r</span>
          <span className="text-[#F97316] font-black">a</span>
          <span className="text-[#EAB308] font-black">n</span>
          <span className="text-[#9b87f5] font-black">d</span>
          <span className="text-[#3cb371] font-black">u</span>
          <span className="text-[#ea384c] font-black">k</span>
          <span className="text-black font-black">a</span>
        </span>
      </Link>

      {/* Site Navigation for desktop */}
      <SiteNavigation />
    </div>
  );
};
