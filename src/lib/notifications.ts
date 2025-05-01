import { Notification, UserSubscription } from './types';

// Sample data for user notifications including new types
export const userNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'user1',
    type: 'trader_update',
    title: 'New Commodity Listed',
    message: 'Global Commodities Ltd has listed a new wheat shipment.',
    read: false,
    createdAt: '2023-09-20T14:30:00Z',
    entityId: 't1',
    entityType: 'trader',
  },
  {
    id: 'n2',
    userId: 'user1',
    type: 'price_change',
    title: 'Price Change Alert',
    message: 'The price of Brent Crude Oil has decreased by 2%.',
    read: true,
    createdAt: '2023-09-19T10:15:00Z',
    entityId: 'c2',
    entityType: 'commodity',
  },
  {
    id: 'n3',
    userId: 'user1',
    type: 'nomination',
    title: 'Seller Nomination',
    message: 'Premium Auto Gallery has nominated you to receive updates.',
    read: false,
    createdAt: '2023-09-18T16:45:00Z',
    entityId: 'seller5',
    entityType: 'seller',
  },
  {
    id: 'n4',
    userId: 'user1',
    type: 'inspection_update',
    title: 'Inspection Completed',
    message: 'The inspection for your requested vehicle has been completed.',
    read: false,
    createdAt: '2023-09-17T11:22:00Z',
    entityId: 'insp1',
    entityType: 'inspection',
  },
  {
    id: 'n5',
    userId: 'user1',
    type: 'saved_search',
    title: 'New Match Found',
    message: 'We found 3 new vehicles matching your saved search "Toyota SUV".',
    read: false,
    createdAt: '2023-09-16T09:10:00Z',
    entityId: 'search1',
    entityType: 'search',
  },
  {
    id: 'n6',
    userId: 'user1',
    type: 'price_change',
    title: 'Price Drop Alert',
    message: 'A vehicle in your watchlist has decreased in price by $1,200.',
    read: false,
    createdAt: '2023-09-15T14:05:00Z',
    entityId: 'vehicle3',
    entityType: 'vehicle',
  },
];

export const userSubscriptions: UserSubscription[] = [
  {
    id: 's1',
    userId: 'user1',
    entityId: 't1',
    entityType: 'trader',
    createdAt: '2023-09-01T09:30:00Z',
  },
  {
    id: 's2',
    userId: 'user1',
    entityId: 'c2',
    entityType: 'commodity',
    createdAt: '2023-09-05T14:15:00Z',
  },
  {
    id: 's3',
    userId: 'user1',
    entityId: 'search1',
    entityType: 'search',
    createdAt: '2023-09-10T16:20:00Z',
    metadata: {
      searchQuery: 'Toyota SUV',
      filters: {
        minYear: 2018,
        maxPrice: 35000,
        category: 'SUV'
      }
    }
  },
];

// Notification utility functions
export const getUserNotifications = (userId: string, read?: boolean): Notification[] => {
  let notifications = userNotifications.filter(notification => notification.userId === userId);
  if (read !== undefined) {
    notifications = notifications.filter(notification => notification.read === read);
  }
  return notifications.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getUserSubscriptions = (userId: string, entityType?: string): UserSubscription[] => {
  let subscriptions = userSubscriptions.filter(subscription => subscription.userId === userId);
  if (entityType) {
    subscriptions = subscriptions.filter(subscription => subscription.entityType === entityType);
  }
  return subscriptions;
};

// Saved searches functions
export const getUserSavedSearches = (userId: string) => {
  return userSubscriptions.filter(sub => 
    sub.userId === userId && sub.entityType === 'search'
  );
};

// Watchlist functions
export const getUserWatchlist = (userId: string) => {
  return userSubscriptions.filter(sub => 
    sub.userId === userId && sub.entityType === 'vehicle'
  );
};
