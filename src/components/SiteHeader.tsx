
import React from 'react';
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeaderSection } from './siteheader/HeaderSection';
import { UserActionsSection } from './siteheader/UserActionsSection';
import { MobileNavigation } from './siteheader/MobileNavigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const SiteHeader = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user, loading } = useCurrentUser();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6 lg:px-8">
        <HeaderSection />

        <div className="flex items-center gap-2">
          <UserActionsSection isLoggedIn={!!user} userId={user?.id || ""} />
          <MobileNavigation isLoggedIn={!!user} isMobile={isMobile} />
        </div>
      </div>
    </header>
  );
};
