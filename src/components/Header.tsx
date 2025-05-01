
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { HeaderLogo } from './header/HeaderLogo';
import { HeaderNavigation } from './header/HeaderNavigation';
import { UserActions } from './header/UserActions';
import { MobileMenu } from './header/MobileMenu';
import { MobileMenuButton } from './header/MobileMenuButton';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useCurrentUser();

  // Check if page is scrolled for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white dark:bg-gray-900 py-4'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <HeaderLogo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <SearchBar />
          <HeaderNavigation />
          <UserActions user={user} loading={loading} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            toggleMenu={toggleMobileMenu} 
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        user={user} 
        loading={loading} 
      />
    </header>
  );
};
