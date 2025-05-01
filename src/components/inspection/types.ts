
export type InspectionStatus = 'GOOD' | 'FAIR' | 'POOR' | 'FAILED';

export interface InspectionItem {
  name: string;
  status?: InspectionStatus;
  notes?: string;
}

export interface InspectionSection {
  name: string;
  items: InspectionItem[];
  overallScore?: number;
}
