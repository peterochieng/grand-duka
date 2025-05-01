
export type Notification = {
  id: string;
  userId: string;
  type: 'trader_update' | 'commodity_update' | 'price_alert' | 'nomination' | 
        'price_change' | 'inspection_update' | 'saved_search';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  entityId?: string; // ID of related trader, commodity, etc.
  entityType?: 'trader' | 'commodity' | 'seller' | 'inspection' | 'search' | 'vehicle';
};

export type UserSubscription = {
  id: string;
  userId: string;
  entityId: string;
  entityType: 'trader' | 'commodity' | 'seller' | 'search' | 'vehicle';
  createdAt: string;
  metadata?: Record<string, any>;
};
