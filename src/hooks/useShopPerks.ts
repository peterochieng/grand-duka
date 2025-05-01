import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ShopPerk, ShopPerkAssignment } from '@/lib/types/shopTypes';
import { toast } from 'sonner';

export const useShopPerks = (shopId?: string) => {
  const [perks, setPerks] = useState<ShopPerk[]>([]);
  const [assignedPerks, setAssignedPerks] = useState<ShopPerkAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPerks = async () => {
    try {
      setLoading(true);
      const { data: perksData, error: perksError } = await supabase
        .from('shop_perks')
        .select('*')
        .order('created_at', { ascending: false });

      if (perksError) throw perksError;

      const transformedPerks: ShopPerk[] = (perksData || []).map(perk => ({
        id: perk.id,
        name: perk.name,
        description: perk.description,
        perk_type: perk.perk_type,
        value: typeof perk.value === 'string' ? JSON.parse(perk.value) : perk.value,
        is_active: perk.is_active,
        created_at: perk.created_at,
        updated_at: perk.updated_at
      }));
      
      setPerks(transformedPerks);

      if (shopId) {
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('shop_perk_assignments')
          .select('*')
          .eq('shop_id', shopId)
          .eq('is_active', true);

        if (assignmentsError) throw assignmentsError;
        setAssignedPerks(assignmentsData || []);
      }
    } catch (err) {
      console.error('Error fetching perks:', err);
      setError(err instanceof Error ? err : new Error('Unknown error fetching perks'));
    } finally {
      setLoading(false);
    }
  };

  const assignPerk = async (perkId: string, expiresAt?: string) => {
    if (!shopId) return;
    try {
      const { error } = await supabase
        .from('shop_perk_assignments')
        .insert({
          shop_id: shopId,
          perk_id: perkId,
          expires_at: expiresAt,
          is_active: true
        });

      if (error) throw error;
      toast.success('Perk assigned successfully');
      fetchPerks();
    } catch (err) {
      console.error('Error assigning perk:', err);
      toast.error('Failed to assign perk');
    }
  };

  const removePerk = async (assignmentId: string) => {
    try {
      const { error } = await supabase
        .from('shop_perk_assignments')
        .update({ is_active: false })
        .eq('id', assignmentId);

      if (error) throw error;
      toast.success('Perk removed successfully');
      fetchPerks();
    } catch (err) {
      console.error('Error removing perk:', err);
      toast.error('Failed to remove perk');
    }
  };

  useEffect(() => {
    fetchPerks();
  }, [shopId]);

  return {
    perks,
    assignedPerks,
    loading,
    error,
    assignPerk,
    removePerk,
    refresh: fetchPerks
  };
};
