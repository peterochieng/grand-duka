
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

export const MessagingCenter = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] border rounded-md grid grid-cols-3">
          <div className="border-r">
            <div className="p-4 border-b">
              <Input placeholder="Search conversations..." />
            </div>
            <div className="overflow-auto h-[calc(600px-65px)]">
              <div className="p-4 border-b hover:bg-slate-50 cursor-pointer bg-slate-50">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">John Doe</h4>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Hello, I'm interested in your product...
                </p>
              </div>
              <div className="p-4 border-b hover:bg-slate-50 cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">Jane Smith</h4>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Thank you for your response...
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">Online • Last active: 10 min ago</p>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                <div>
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <p className="text-sm">Hello, I'm interested in your product. Is it still available?</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 max-w-[80%] ml-auto">
                <div>
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <p className="text-sm">Hi John! Yes, it's still available. Would you like more information?</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">45 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
