import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';
import { getSellerListingsInventory } from '@/services/productApprovalService';
import { toast } from 'sonner';
import { Product } from '@/lib/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { supabase } from '@/integrations/supabase/client';
import { Footer } from '../Footer';
import { SiteHeader } from '../SiteHeader';

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
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading your listings...</p>
        ) : listings.length === 0 ? (
          <p>You have no listings.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Condition</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Template</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map((listing) => {
                // Lookup the category name using the category id.
                const categoryName =
                  categories?.find((cat) => cat.id === listing.category)?.name || listing.category || "Uncategorized";
                return (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.title || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{categoryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.condition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {listing.currency} {Number(listing.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {listing?.template?.name ?? "None used"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/retail/seller-dashboard/listings/edit/${listing.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-center">
        <Link to="/retail/seller-dashboard" className="inline-block">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
            Back to Dashboard
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default SellerInventory;