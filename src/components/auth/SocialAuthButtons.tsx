
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Facebook, Github } from 'lucide-react';

export const SocialAuthButtons = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="outline" type="button">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" type="button">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" type="button">
          <Github className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
