
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SavedSearchesTabProps {
  savedSearches: any[];
  handleDeleteSavedSearch: (searchId: string) => void;
}

export const SavedSearchesTab = ({ 
  savedSearches, 
  handleDeleteSavedSearch 
}: SavedSearchesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Searches</CardTitle>
        <CardDescription>
          Get notified when new items match your saved searches
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedSearches.length === 0 ? (
          <div className="text-center p-8 border rounded-md">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">No saved searches</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Save your searches to get notified when new matching items become available.
            </p>
            <Button asChild>
              <Link to="/">Search Vehicles</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Toyota SUV</h4>
                  <p className="text-sm text-muted-foreground">Created Sep 10, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="notifications-s1" defaultChecked />
                  <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Toyota</Badge>
                <Badge variant="outline">SUV</Badge>
                <Badge variant="outline">2018+</Badge>
                <Badge variant="outline">Under $35,000</Badge>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Button variant="link" className="h-8 p-0 text-sm">
                  Edit search
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/vehicle-category?q=Toyota%20SUV">
                    View results
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Honda Sedan</h4>
                  <p className="text-sm text-muted-foreground">Created Aug 25, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="notifications-s2" defaultChecked />
                  <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Honda</Badge>
                <Badge variant="outline">Sedan</Badge>
                <Badge variant="outline">2017+</Badge>
                <Badge variant="outline">Under $25,000</Badge>
              </div>
              <div className="flex justify-between items-center mt-3">
                <Button variant="link" className="h-8 p-0 text-sm">
                  Edit search
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/vehicle-category?q=Honda%20Sedan">
                    View results
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
