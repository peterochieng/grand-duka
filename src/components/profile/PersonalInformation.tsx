
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const PersonalInformation = () => {
  const { user, loading } = useCurrentUser();
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm animate-pulse">
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view your personal information.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4 text-sm">
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Full Name</dt>
            <dd className="font-medium">{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not provided'}</dd>
          </div>
          
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Email Address</dt>
            <dd className="font-medium">{user.email || 'Not provided'}</dd>
          </div>
          
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Phone Number</dt>
            <dd className="font-medium">{user.phone || 'Not provided'}</dd>
          </div>
          
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Location</dt>
            <dd className="font-medium">{user.location || 'Not provided'}</dd>
          </div>
          
          <div className="flex flex-col">
            <dt className="text-muted-foreground">About</dt>
            <dd>{user.about || 'No information provided.'}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};
