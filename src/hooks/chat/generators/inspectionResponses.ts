
import { ChatContext } from '@/lib/types';

export const generateInspectionResponse = (query: string, context: ChatContext): string | null => {
  if (!context.inspectionId && !context.vehicleId) return null;
  
  const lcQuery = query.toLowerCase();
  
  // Vehicle inspection general questions
  if (lcQuery.includes('what is inspected') || lcQuery.includes('inspection cover') || lcQuery.includes('inspection include')) {
    return "Our professional inspection covers 150+ points including exterior, interior, mechanical components, electronics, and a road test. Each section receives a condition rating and detailed notes from our certified inspectors.";
  }
  
  // Inspection report questions
  if (lcQuery.includes('inspection report') || lcQuery.includes('get report') || lcQuery.includes('full report')) {
    return "The full inspection report is available for download as a PDF. You can access it by clicking the 'Download Report' button at the top of this page. The report includes all inspection points, photos, and inspector notes.";
  }
  
  // Inspector credentials
  if (lcQuery.includes('who inspected') || lcQuery.includes('inspector credentials') || lcQuery.includes('inspector qualified')) {
    return "All inspections are performed by certified automotive inspectors with at least 5 years of experience. Our inspectors undergo rigorous training and certification processes to ensure consistent quality assessments.";
  }
  
  // Inspection validation or age
  if (lcQuery.includes('inspection valid') || lcQuery.includes('when inspected') || lcQuery.includes('inspection date') || lcQuery.includes('how old is inspection')) {
    return "This inspection was conducted within the last 30 days. Our inspections are considered valid for 60 days or 1,000 kilometers after the inspection date, whichever comes first.";
  }
  
  // Specific vehicle issues
  if (context.vehicleName && (lcQuery.includes('issue') || lcQuery.includes('problem') || lcQuery.includes('concern'))) {
    return `Based on the inspection, the main areas of concern for this ${context.vehicleName} are minor exterior scratches on the rear bumper and slightly worn brake pads that will need replacement in the next 5,000-8,000 kilometers. No major mechanical issues were identified.`;
  }
  
  // Value assessment
  if (lcQuery.includes('fair price') || lcQuery.includes('good price') || lcQuery.includes('worth the money') || lcQuery.includes('value assessment')) {
    return "Based on the inspection results, current market conditions, and the vehicle's condition, our value assessment indicates that the asking price is within the fair market range. The vehicle's condition aligns with what would be expected for its age and mileage.";
  }
  
  // Missing context
  if (!context.vehicleName) {
    return "I can provide specific information about the inspection if you tell me which vehicle you're interested in.";
  }
  
  return null;
};
