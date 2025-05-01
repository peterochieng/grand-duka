
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FavoritesTabProps {
  watchlist: any[];
  handleRemoveFromWatchlist: (itemId: string) => void;
}

export const FavoritesTab = ({ 
  watchlist, 
  handleRemoveFromWatchlist 
}: FavoritesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Watchlist</CardTitle>
        <CardDescription>
          Vehicles and items you're keeping an eye on
        </CardDescription>
      </CardHeader>
      <CardContent>
        {watchlist.length === 0 ? (
          <div className="text-center p-8 border rounded-md">
            <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">Your watchlist is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add items to your watchlist to keep track of them and be notified of changes.
            </p>
            <Button asChild>
              <Link to="/">Browse Vehicles</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
                <div>
                  <h4 className="font-medium">2021 BMW X5</h4>
                  <p className="text-sm text-muted-foreground">$65,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
                <div>
                  <h4 className="font-medium">2020 Mercedes-Benz GLE</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">$58,900</span>
                    <span className="line-through ml-2 text-muted-foreground">$60,000</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  Image
                </div>
                <div>
                  <h4 className="font-medium">2022 Audi Q7</h4>
                  <p className="text-sm text-muted-foreground">$72,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
