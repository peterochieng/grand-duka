import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import CreateListing from '@/components/seller/listing/CreateListing';
import { toast } from 'sonner';

const EditListing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed to load the listing');
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
    };
    fetchListing();
  }, [id]);

  if (loading) return <p>Loading listing...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return <CreateListing existingProduct={listing} isRelisting={false} />;
};

export default EditListing;