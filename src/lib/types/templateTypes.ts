
export type Template = {
  id: string;
  name: string;
  category: string;
  type: 'standard' | 'custom' | 'local';
  createdBy?: string; // User ID
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  fields: TemplateField[];
  createdAt: string;
  updatedAt?: string;
};

export type TemplateField = {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'image';
  required: boolean;
  options?: string[]; // For select type
  defaultValue?: string | number | boolean;
};
