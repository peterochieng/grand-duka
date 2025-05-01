
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ShopNotification {
  id: string;
  title: string;
  message: string;
  image_url?: string;
  created_at: string;
  published_at?: string;
  is_read: boolean;
}

export const useShopNotifications = () => {
  const [notifications, setNotifications] = useState<ShopNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userNotifications, error: notificationsError } = await supabase
        .from('user_notifications')
        .select(`
          id,
          is_read,
          notification:shop_notifications(
            id,
            title,
            message,
            image_url,
            created_at,
            published_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (notificationsError) throw notificationsError;

      const transformedNotifications = userNotifications
        .map(n => ({
          id: n.notification.id,
          title: n.notification.title,
          message: n.notification.message,
          image_url: n.notification.image_url,
          created_at: n.notification.created_at,
          published_at: n.notification.published_at,
          is_read: n.is_read
        }));

      setNotifications(transformedNotifications);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('notification_id', notificationId)
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, is_read: true } 
            : n
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return {
    notifications,
    loading,
    markAsRead,
    refresh: fetchNotifications
  };
};
