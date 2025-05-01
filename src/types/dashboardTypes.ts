
export interface DashboardStats {
  productCount: number;
  activeProductCount: number;
  orderCount: number;
  pendingOrderCount: number;
  totalRevenue: number;
  averageRating: number;
  unreadMessages: number;
  viewCount?: number;
  conversionRate?: number;
  weeklyGrowth?: number;
}

export interface RecentSale {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  buyer?: {
    id: string;
    name: string;
  };
  product_id?: string;
  product_name?: string;
}

export interface ListingPerformance {
  id: string;
  title: string;
  views: number;
  clicks: number;
  conversionRate: number;
  revenue: number;
}
