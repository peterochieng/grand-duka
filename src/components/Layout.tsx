
import React from 'react';
import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <SiteHeader />
      <main className="flex-1 w-full max-w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
