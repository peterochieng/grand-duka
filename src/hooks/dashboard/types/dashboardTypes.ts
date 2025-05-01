
// Dashboard data types
export interface OrderData {
  name: string;
  orders: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
}

export interface ActivityData {
  date: string;
  listings: number;
  shops: number;
  inspections: number;
}

export interface DashboardData {
  weeklyOrders: OrderData[];
  monthlyRevenue: RevenueData[];
  activityOverview: ActivityData[];
  loading: boolean;
  error: Error | null;
}
