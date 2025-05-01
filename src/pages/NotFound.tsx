
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-[#9b87f5] font-black">G</span>
          <span className="text-[#0EA5E9] font-black">r</span>
          <span className="text-[#F97316] font-black">a</span>
          <span className="text-[#EAB308] font-black">n</span>
          <span className="text-[#9b87f5] font-black">d</span>
          <span className="text-[#3cb371] font-black">u</span>
          <span className="text-[#ea384c] font-black">k</span>
          <span className="text-black font-black">a</span>
        </h2>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
