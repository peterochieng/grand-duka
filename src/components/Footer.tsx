
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  MapPin
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-12 w-full">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">
              <span className="text-[#9b87f5] font-black">G</span>
              <span className="text-[#0EA5E9] font-black">r</span>
              <span className="text-[#F97316] font-black">a</span>
              <span className="text-[#EAB308] font-black">n</span>
              <span className="text-[#9b87f5] font-black">d</span>
              <span className="text-[#3cb371] font-black">u</span>
              <span className="text-[#ea384c] font-black">k</span>
              <span className="text-black font-black">a</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The premier marketplace for buying and selling in the UAE.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Buy</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/registration" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link to="/buyer-protection" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Buyer Protection
                </Link>
              </li>
              <li>
                <Link to="/bidding" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Bidding & Buying
                </Link>
              </li>
              <li>
                <Link to="/search-tips" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Search Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Sell</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/start-selling" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link to="/learn-to-sell" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Learn to Sell
                </Link>
              </li>
              <li>
                <Link to="/seller-tools" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Seller Tools
                </Link>
              </li>
              <li>
                <Link to="/store-management" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Store Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">About</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  About Granduka
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Burj Khalifa, Downtown Dubai, UAE
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Granduka. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
              <Link to="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
