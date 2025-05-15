import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSellerListings, getSellerListingsInventory } from '@/services/productApprovalService';
import { toast } from 'sonner';
import { Product } from '@/lib/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { Footer } from '../Footer';
import { SiteHeader } from '../SiteHeader';
import { useCategories } from '@/hooks/useCategories';

const SellerInventory: React.FC = () => {
  const { user } = useCurrentUser();
  const { categories, loading: catLoading } = useCategories();
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchListings = async () => {
    if (user?.id) {
      setLoading(true);
      const data = await getSellerListingsInventory(user.id);
      console.log(data);
      setListings(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user]);

  const handleDeleteListing = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        toast.error("Failed to delete listing");
      } else {
        toast.success("Listing deleted successfully");
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <SiteHeader />
      <Card className="border-none rounded-lg p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Your Listings Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading your listings...</p>
          ) : listings.length === 0 ? (
            <p>You have no listings.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings?.map((listing) => {
                console.log("Listing:", listing);
                // Lookup the category name using the category id
                const categoryName = categories?.find(cat => cat.id === listing.category)?.name || listing.category;
                return (
                  <Card key={listing.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-2xl transition-shadow">
                    <div className="flex flex-col space-y-3">
                      <h3 className="text-xl font-bold">{listing.title || "-"}</h3>
                      <p className="text-gray-600">
                        <strong>Category: </strong>{categoryName}
                      </p>
                      <p className="text-gray-600">
                        <strong>Condition: </strong>{listing.condition}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {listing.currency} {Number(listing.price).toLocaleString()}
                      </p>
                      <div>
  <strong>Template:</strong>{" "}
  {listing?.template?.name ?? "None used"}
</div>
                      {listing.template_fields && (
                        <div className="space-y-1 text-sm text-gray-500">
                          {Object.entries(listing.template_fields).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-semibold">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Link to={`/retail/seller-dashboard/listings/edit/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Link to="/retail/seller-dashboard">
          <Button variant="outline" size="sm">
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default SellerInventory;