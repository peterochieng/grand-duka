import { supabase } from "@/integrations/supabase/client";
import { SupportTicket } from "./types";

export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
  try {
    const { data, error } = await supabase
      .from('support_tickets' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data as any) || [];
  } catch (err) {
    console.error('Error fetching support tickets:', err);
    throw err;
  }
};