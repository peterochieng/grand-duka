
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InspectionPointsSummary } from './InspectionPointsSummary';
import { InspectionDisclaimer } from './InspectionDisclaimer';
import { InspectionActions } from './InspectionActions';
import { useInspection } from './InspectionContext';
import { getStatusBadge } from './inspectionUtils';
import { Loader2 } from 'lucide-react';

export const InspectionContent = ({ userRole = 'guest' }: { userRole?: 'seller' | 'admin' | 'buyer' | 'guest' }) => {
  const { 
    inspectionData,
    activeSection,
    setActiveSection,
    isUpdating,
    lastUpdatedBy,
    lastUpdateTime
  } = useInspection();

  // Filter out the "Vehicle Identification" section
  const filteredInspectionData = inspectionData.filter(
    section => section.name !== 'Vehicle Identification'
  );

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Real-time update indicator */}
      {lastUpdateTime && (
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
          <div>
            Last updated by {lastUpdatedBy} {lastUpdateTime ? new Date(lastUpdateTime).toLocaleTimeString() : ''}
          </div>
          {isUpdating && (
            <div className="flex items-center space-x-2 text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving changes...</span>
            </div>
          )}
        </div>
      )}
      
      {/* Navigation tabs for all sections */}
      <Tabs 
        value={activeSection} 
        onValueChange={setActiveSection}
        className="w-full flex flex-col"
      >
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-6">
          <TabsList className="grid grid-cols-4 w-full p-2">
            {filteredInspectionData.map((section) => (
              <TabsTrigger 
                key={section.name} 
                value={section.name}
                className="text-base font-medium data-[state=active]:font-bold py-3"
              >
                {section.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* Content for each tab */}
        <div className="mt-4 relative">
          {filteredInspectionData.map((section) => (
            <TabsContent 
              key={section.name} 
              value={section.name}
              className="border-2 rounded-lg p-4 shadow-sm"
            >
              {/* For Overview section, show the InspectionPointsSummary */}
              {section.name === "Overview" ? (
                <div className="space-y-2">
                  <InspectionPointsSummary inspectionData={filteredInspectionData} />
                </div>
              ) : section.name === "Additional Notes" ? (
                /* For Additional Notes, only show the notes without status */
                <div className="space-y-4">
                  {section.items.map((item, idx) => (
                    <div 
                      key={item.name}
                      className={`p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 ${
                        idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                      }`}
                    >
                      <div className="font-medium mb-2">{item.name}</div>
                      <div className="text-sm text-muted-foreground mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                        {item.notes || "No comments provided."}
                      </div>
                    </div>
                  ))}
                </div>
              ) : section.name === "Pictures" ? (
                /* For Pictures section, show message if no pictures or display pictures */
                <div className="space-y-4">
                  {section.items.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground border-2 border-gray-200 dark:border-gray-700 rounded-md">
                      No inspection pictures have been uploaded.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item, idx) => (
                        <div 
                          key={idx}
                          className="rounded-md overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                        >
                          {/* Image would go here */}
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {item.name}
                          </div>
                          {item.notes && (
                            <div className="p-2 text-sm">{item.notes}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* For other sections, show their items with status badges */
                <div className="space-y-4">
                  {section.items.map((item, idx) => (
                    <div 
                      key={item.name}
                      className={`grid grid-cols-3 items-center p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 ${
                        idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                      }`}
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{item.name}</div>
                        {item.notes && (
                          <div className="text-sm text-muted-foreground mt-1">{item.notes}</div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      
      <InspectionDisclaimer />
      <InspectionActions userRole={userRole} />
    </div>
  );
};
