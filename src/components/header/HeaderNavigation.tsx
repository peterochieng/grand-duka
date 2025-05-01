
import { Link } from 'react-router-dom';

export const HeaderNavigation = () => {
  return (
    <nav className="flex items-center space-x-6">
      <Link 
        to="/categories" 
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        Categories
      </Link>
      <Link 
        to="/deals" 
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        Deals
      </Link>
      <Link 
        to="/sell" 
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        Sell
      </Link>
    </nav>
  );
};
