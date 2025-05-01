import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { InspectionSection, InspectionStatus, InspectionItem } from './types';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { useToast } from "@/hooks/use-toast";

interface InspectionContextType {
  inspectionData: InspectionSection[];
  setInspectionData: React.Dispatch<React.SetStateAction<InspectionSection[]>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  handleStatusChange: (sectionName: string, itemName: string, newStatus: InspectionStatus) => void;
  handleNotesChange: (sectionName: string, itemName: string, notes: string) => void;
  calculateOverallScore: () => number;
  isUpdating: boolean;
  lastUpdatedBy: string | null;
  lastUpdateTime: Date | null;
}

interface InspectionUpdate {
  sectionName: string;
  itemName: string;
  status?: InspectionStatus;
  notes?: string;
  timestamp: string;
  userId: string;
  userName: string;
  version: number;
}

type InspectionState = {
  data: InspectionSection[];
  version: number;
  lastUpdateTime: Date | null;
  lastUpdatedBy: string | null;
  pendingUpdates: Map<string, InspectionUpdate>;
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export const useInspection = () => {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
};

interface InspectionProviderProps {
  children: ReactNode;
  inspectionId?: string;
}

export const InspectionProvider = ({ children, inspectionId = 'demo-inspection' }: InspectionProviderProps) => {
  const { toast } = useToast();
  const [state, setState] = useState<InspectionState>({
    data: [
    {
      name: 'Vehicle Identification',
      items: [
        { name: 'VIN Verification', status: 'GOOD' },
        { name: 'Title Status', status: 'GOOD' },
        { name: 'Odometer Reading', status: 'GOOD' },
      ],
    },
    {
      name: 'Overview',
      items: [
        { name: 'General Condition', status: 'GOOD' },
        { name: 'Previous Damage', status: 'FAIR', notes: 'Minor dent on rear bumper' },
        { name: 'Maintenance History', status: 'GOOD' },
      ],
      overallScore: 85,
    },
    {
      name: 'Interior',
      items: [
        { name: 'Seats & Upholstery', status: 'GOOD' },
        { name: 'Dashboard & Controls', status: 'GOOD' },
        { name: 'Carpet & Floor Mats', status: 'FAIR', notes: 'Some staining on driver side' },
        { name: 'Headliner', status: 'GOOD' },
        { name: 'Door Panels', status: 'GOOD' },
      ],
      overallScore: 90,
    },
    {
      name: 'Exterior',
      items: [
        { name: 'Paint Condition', status: 'FAIR', notes: 'Some scratches on front fender' },
        { name: 'Body Panels', status: 'GOOD' },
        { name: 'Glass & Mirrors', status: 'GOOD' },
        { name: 'Lights & Lenses', status: 'GOOD' },
        { name: 'Trim & Moldings', status: 'GOOD' },
      ],
      overallScore: 85,
    },
    {
      name: 'Tires',
      items: [
        { name: 'Tread Depth', status: 'FAIR', notes: 'Front tires at 5/32"' },
        { name: 'Tire Condition', status: 'GOOD' },
        { name: 'Wheel Condition', status: 'GOOD' },
      ],
      overallScore: 80,
    },
    {
      name: 'Underbody',
      items: [
        { name: 'Frame Condition', status: 'GOOD' },
        { name: 'Suspension Components', status: 'GOOD' },
        { name: 'Exhaust System', status: 'GOOD' },
        { name: 'Fluid Leaks', status: 'FAIR', notes: 'Minor oil seepage at oil pan gasket' },
      ],
      overallScore: 85,
    },
    {
      name: 'Underhood',
      items: [
        { name: 'Engine Condition', status: 'GOOD' },
        { name: 'Fluid Levels', status: 'GOOD' },
        { name: 'Belts & Hoses', status: 'GOOD' },
        { name: 'Battery', status: 'GOOD' },
        { name: 'Electrical System', status: 'GOOD' },
      ],
      overallScore: 95,
    },
    {
      name: 'Road Test',
      items: [
        { name: 'Engine Performance', status: 'GOOD' },
        { name: 'Transmission Operation', status: 'GOOD' },
        { name: 'Brake Performance', status: 'GOOD' },
        { name: 'Steering & Handling', status: 'GOOD' },
        { name: 'Noise & Vibration', status: 'FAIR', notes: 'Slight vibration at highway speeds' },
      ],
      overallScore: 90,
    },
    {
      name: 'Additional Notes',
      items: [
        { 
          name: 'General Comments', 
          notes: 'Overall in excellent condition for age and mileage. Regular maintenance has been performed.' 
        },
      ],
    },
    {
      name: 'Pictures',
      items: [],
    },
  ],
    version: 1,
    lastUpdateTime: null,
    lastUpdatedBy: null,
    pendingUpdates: new Map()
  });
  
  const [activeSection, setActiveSection] = useState<string>('Overview');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Use our real-time updates hook to receive updates from other users
  const { isConnected } = useRealTimeUpdates<InspectionUpdate>({
    resourceId: inspectionId,
    resourceType: 'inspection',
    onUpdate: useCallback((update: InspectionUpdate) => {
      // When we receive an update from another user, apply it to our local state
      handleRemoteUpdate(update);
    }, []),
    onError: useCallback((error: Error) => {
      console.error('Real-time update error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to receive real-time updates. Some changes may not be visible.",
        variant: "destructive",
      });
    }, [toast])
  });

  // Apply updates from other users
  const handleRemoteUpdate = useCallback((update: InspectionUpdate) => {
    setState(currentState => {
      // Check if this update is newer than our current version
      if (update.version <= currentState.version) {
        console.log(`Ignoring outdated update (v${update.version}, current: v${currentState.version})`);
        return currentState;
      }
      
      // Create a key to check if this specific item is being edited locally
      const updateKey = `${update.sectionName}:${update.itemName}`;
      
      // Check if we have a pending local update for this same item
      if (currentState.pendingUpdates.has(updateKey)) {
        // We have a conflict - show a notification
        toast({
          title: "Update Conflict",
          description: `${update.userName} has also updated "${update.itemName}". Their changes have been applied.`,
          variant: "default",
        });
      }
      
      // Apply the remote update to our data
      const updatedData = currentState.data.map(section => {
        if (section.name === update.sectionName) {
          const updatedItems = section.items.map(item => 
            item.name === update.itemName 
              ? { 
                  ...item, 
                  ...(update.status && { status: update.status }),
                  ...(update.notes !== undefined && { notes: update.notes })
                } 
              : item
          );
          
          // Recalculate section score if needed
          const updatedSection = { ...section, items: updatedItems };
          if (typeof section.overallScore === 'number' && update.status) {
            updatedSection.overallScore = calculateSectionScore(updatedItems);
          }
          
          return updatedSection;
        }
        return section;
      });
      
      // Show a toast notification about the update
      toast({
        title: "Inspection Updated",
        description: `${update.userName} updated "${update.itemName}"`,
        variant: "default",
      });
      
      // Return the updated state
      return {
        ...currentState,
        data: updatedData,
        version: update.version,
        lastUpdateTime: new Date(update.timestamp),
        lastUpdatedBy: update.userName,
        // Remove this update from pending if it was there
        pendingUpdates: new Map([...currentState.pendingUpdates].filter(([key]) => key !== updateKey))
      };
    });
  }, [toast]);

  // Calculate a section score based on the status values of its items
  const calculateSectionScore = (items: InspectionItem[]): number => {
    const statusValues = {
      'GOOD': 100,
      'FAIR': 75,
      'POOR': 50,
      'FAILED': 25
    };
    
    const itemsWithStatus = items.filter(item => item.status);
    if (itemsWithStatus.length === 0) return 0;
    
    const totalPossible = itemsWithStatus.length * 100;
    const actualScore = itemsWithStatus.reduce((sum, item) => 
      sum + (item.status ? statusValues[item.status] : 0), 0);
    
    return Math.round((actualScore / totalPossible) * 100);
  };

  // Handle local status changes with optimistic updates
  const handleStatusChange = useCallback((sectionName: string, itemName: string, newStatus: InspectionStatus) => {
    setIsUpdating(true);
    
    // Optimistically update the UI
    setState(currentState => {
      const updatedData = currentState.data.map(section => {
        if (section.name === sectionName) {
          const updatedItems = section.items.map(item => 
            item.name === itemName ? { ...item, status: newStatus } : item
          );
          
          const updatedSection = { ...section, items: updatedItems };
          if (typeof section.overallScore === 'number') {
            updatedSection.overallScore = calculateSectionScore(updatedItems);
          }
          
          return updatedSection;
        }
        return section;
      });

      // Create an update object to track this pending change
      const updateKey = `${sectionName}:${itemName}`;
      const updateObject: InspectionUpdate = {
        sectionName,
        itemName,
        status: newStatus,
        timestamp: new Date().toISOString(),
        userId: 'current-user-id', // In a real app, get this from auth
        userName: 'You', // In a real app, get this from auth
        version: currentState.version + 1
      };
      
      // Add this to pending updates
      const updatedPending = new Map(currentState.pendingUpdates);
      updatedPending.set(updateKey, updateObject);
      
      return {
        ...currentState,
        data: updatedData,
        pendingUpdates: updatedPending,
        lastUpdateTime: new Date(),
        lastUpdatedBy: 'You'
      };
    });
    
    // Simulate sending the update to the server
    setTimeout(() => {
      // In a real app, make an API call here and only update the version on success
      setState(currentState => {
        // In a real implementation, the server would return the new version
        const newVersion = currentState.version + 1;
        
        return {
          ...currentState,
          version: newVersion,
          // We keep the pendingUpdates because in a real app, we'd remove them 
          // when we get confirmation from the server
        };
      });
      
      setIsUpdating(false);
      
      // Show a confirmation toast
      toast({
        title: "Status Updated",
        description: `${itemName} status has been updated to ${newStatus}`,
        variant: "default",
      });
    }, 800);
  }, [toast]);

  // Handle local notes changes with optimistic updates
  const handleNotesChange = useCallback((sectionName: string, itemName: string, notes: string) => {
    setIsUpdating(true);
    
    // Optimistically update the UI
    setState(currentState => {
      const updatedData = currentState.data.map(section => {
        if (section.name === sectionName) {
          const updatedItems = section.items.map(item => 
            item.name === itemName ? { ...item, notes } : item
          );
          return { ...section, items: updatedItems };
        }
        return section;
      });

      // Create an update object to track this pending change
      const updateKey = `${sectionName}:${itemName}`;
      const updateObject: InspectionUpdate = {
        sectionName,
        itemName,
        notes,
        timestamp: new Date().toISOString(),
        userId: 'current-user-id', // In a real app, get this from auth
        userName: 'You', // In a real app, get this from auth
        version: currentState.version + 1
      };
      
      // Add this to pending updates
      const updatedPending = new Map(currentState.pendingUpdates);
      updatedPending.set(updateKey, updateObject);
      
      return {
        ...currentState,
        data: updatedData,
        pendingUpdates: updatedPending,
        lastUpdateTime: new Date(),
        lastUpdatedBy: 'You'
      };
    });
    
    // Simulate sending the update to the server
    setTimeout(() => {
      // In a real app, make an API call here and only update the version on success
      setState(currentState => {
        // In a real implementation, the server would return the new version
        const newVersion = currentState.version + 1;
        
        return {
          ...currentState,
          version: newVersion,
          // We keep the pendingUpdates because in a real app, we'd remove them 
          // when we get confirmation from the server
        };
      });
      
      setIsUpdating(false);
      
      // Show a confirmation toast
      toast({
        title: "Notes Updated",
        description: `Notes for ${itemName} have been saved`,
        variant: "default",
      });
    }, 800);
  }, [toast]);

  const calculateOverallScore = useCallback(() => {
    const scoredSections = state.data.filter(section => typeof section.overallScore === 'number');
    if (scoredSections.length === 0) return 0;
    
    const totalScore = scoredSections.reduce((sum, section) => sum + (section.overallScore || 0), 0);
    return Math.round(totalScore / scoredSections.length);
  }, [state.data]);

  // Show a notification when the WebSocket connects
  useEffect(() => {
    if (isConnected) {
      toast({
        title: "Connected",
        description: "You're receiving real-time inspection updates",
        variant: "default",
      });
    }
  }, [isConnected, toast]);

  const value = {
    inspectionData: state.data,
    setInspectionData: (data) => setState(prev => ({ ...prev, data: typeof data === 'function' ? data(prev.data) : data })),
    activeSection,
    setActiveSection,
    handleStatusChange,
    handleNotesChange,
    calculateOverallScore,
    isUpdating,
    lastUpdatedBy: state.lastUpdatedBy,
    lastUpdateTime: state.lastUpdateTime
  };

  return (
    <InspectionContext.Provider value={value}>
      {children}
    </InspectionContext.Provider>
  );
};
