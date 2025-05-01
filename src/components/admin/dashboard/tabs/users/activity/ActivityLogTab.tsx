
import React, { useState, useEffect } from 'react';
import { getUserActivities } from '@/services/userActivityService';
import { UserActivity, ActivityType } from '@/lib/types/userActivityTypes';
import { UserActivityTimeline } from './UserActivityTimeline';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Loader2, RefreshCw, Users, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

export const ActivityLogTab: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Fetch activities
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await getUserActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch on initial load
  useEffect(() => {
    fetchActivities();
  }, []);
  
  // Apply filters
  const filteredActivities = activities.filter(activity => {
    // Filter by activity type
    if (activityFilter !== 'all' && activity.activityType !== activityFilter) {
      return false;
    }
    
    // Filter by user role
    if (activeTab !== 'all') {
      if (activeTab === 'admin' && !activity.userRole?.includes('admin')) {
        return false;
      } else if (activeTab === 'retail' && !(
        activity.userRole === 'buyer' ||
        activity.userRole === 'sole-proprietor' ||
        activity.userRole === 'shop-owner' ||
        activity.userRole === 'shop-employee'
      )) {
        return false;
      } else if (activeTab === 'bulk' && !(
        activity.userRole === 'trader' ||
        activity.userRole === 'broker' ||
        activity.userRole === 'producer'
      )) {
        return false;
      }
    }
    
    // Filter by date range
    if (dateRange?.from && new Date(activity.timestamp) < dateRange.from) {
      return false;
    }
    if (dateRange?.to) {
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999);
      if (new Date(activity.timestamp) > endDate) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <CardTitle>User Activity Log</CardTitle>
            <CardDescription>
              Track user logins, profile changes, and system actions
            </CardDescription>
          </div>
          <Button onClick={fetchActivities} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="all">
                  <Users className="mr-2 h-4 w-4" />
                  All Users
                </TabsTrigger>
                <TabsTrigger value="retail">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Retail
                </TabsTrigger>
                <TabsTrigger value="bulk">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Bulk
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select 
                value={activityFilter} 
                onValueChange={setActivityFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="profile_update">Profile Update</SelectItem>
                  <SelectItem value="password_change">Password Change</SelectItem>
                  <SelectItem value="failed_login">Failed Login</SelectItem>
                  <SelectItem value="role_change">Role Change</SelectItem>
                  <SelectItem value="kyc_submitted">KYC Submitted</SelectItem>
                  <SelectItem value="kyc_approved">KYC Approved</SelectItem>
                  <SelectItem value="kyc_rejected">KYC Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                align="end"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
          
          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="bg-background border rounded-md">
              <UserActivityTimeline 
                activities={filteredActivities} 
                maxHeight="600px"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
