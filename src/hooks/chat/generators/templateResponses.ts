
import { ChatContext } from '@/lib/types';

/**
 * Generate template-related responses
 */
export const generateTemplateResponse = (query: string): string | null => {
  const lcQuery = query.toLowerCase();
  
  // Standard template info
  if (lcQuery.includes('standard template') || lcQuery.includes('what is a template')) {
    return "Standard templates are predefined forms for common products with specific fields to ensure consistency. They simplify the listing process and help ensure all important product details are included. Standard templates are created by the platform and available to all sellers.";
  }
  
  // Custom template info
  if (lcQuery.includes('custom template') || lcQuery.includes('create template') || lcQuery.includes('submit template')) {
    return "Custom templates can be created by sellers if none exist for their product category. These templates are submitted for platform approval, and once approved, become available to all sellers, ensuring uniformity across similar product listings. The approval process typically takes 1-2 business days.";
  }
  
  // Local template info
  if (lcQuery.includes('local template')) {
    return "Local templates are private templates that only you can use without platform approval. However, these may not be supported during version updates and might have limited functionality compared to standard or approved custom templates.";
  }
  
  // Template approval process
  if (lcQuery.includes('template approval') || lcQuery.includes('how long approval')) {
    return "The template approval process typically takes 1-2 business days. Templates are reviewed to ensure they provide a comprehensive set of fields for the product category, maintain consistent naming conventions, and follow platform standards. You'll receive a notification once your template is approved or if any changes are needed.";
  }
  
  // Template fields
  if (lcQuery.includes('template field') || lcQuery.includes('add field') || lcQuery.includes('required field')) {
    return "Templates can include various field types such as text, number, boolean (yes/no), select (dropdown), date, and image fields. You can mark fields as required or optional. For dropdown fields, you can specify the available options. When creating a template, include all relevant information buyers would want to know about that product category.";
  }
  
  return null;
};
