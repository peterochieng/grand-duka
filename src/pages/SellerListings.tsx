import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from '@/lib/types';
import { products } from '@/lib/products';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SellerListings = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    // Simulate fetching listings from an API or database
    const sellerProducts = products.filter(product => product.seller.id === 'seller1'); // Replace 'seller1' with actual seller ID
    setListings(sellerProducts);
  }, []);

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === '' || listing.category === categoryFilter)
  );

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === 'priceAsc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleDeleteListing = (id: string) => {
    // Simulate deleting a listing
    setListings(listings.filter(listing => listing.id !== id));
    toast({
      title: "Listing deleted",
      description: "Your listing has been successfully deleted.",
    })
  };

  const handleEditListing = (id: string) => {
    // Implement edit functionality here
    console.log(`Editing listing with ID: ${id}`);
  };

  const formatTimeLeft = (timeLeftString: string): string => {
    if (!timeLeftString) return 'Ended';
    
    const parts = timeLeftString.split(' ');
    if (parts.length < 2) return timeLeftString;
    
    const days = parseInt(parts[0]);
    const hours = parseInt(parts[2]);
    
    if (days === 0) {
      return `${hours}h left`;
    } else if (days === 1) {
      return `1d ${hours}h left`;
    } else {
      return `${days}d left`;
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Listings</CardTitle>
          <CardDescription>Manage your product listings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="col-span-1">
              <Label htmlFor="search">Search Listings</Label>
              <Input
                type="text"
                id="search"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Filter by Category</Label>
              <Select onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {[...new Set(listings.map(listing => listing.category))].map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select onValueChange={setSortOrder}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Time Left</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedListings.map(listing => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.title}</TableCell>
                    <TableCell>{listing.category}</TableCell>
                    <TableCell>{listing.currency} {listing.price}</TableCell>
                    <TableCell>{listing.condition}</TableCell>
                    <TableCell>{listing.listingTypes.auction?.enabled && listing.listingTypes.auction.timeLeft ? formatTimeLeft(listing.listingTypes.auction.timeLeft) : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditListing(listing.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteListing(listing.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedListings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No listings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerListings;
