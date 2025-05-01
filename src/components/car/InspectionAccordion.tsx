
import { FileCheck, Car } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VehicleInspection } from '@/components/inspection/VehicleInspection';
import { GeneralInformation } from './GeneralInformation';
import { CarSpecifications } from './CarSpecifications';
import { ConditionInspection } from './ConditionInspection';
import { Features } from './Features';
import { AdditionalServices } from './AdditionalServices';
import { SellerInformation } from './SellerInformation';
import { CarDetails } from './types';
import { motion } from 'framer-motion';

interface InspectionAccordionProps {
  carDetails: CarDetails;
}

export const InspectionAccordion = ({ carDetails }: InspectionAccordionProps) => {
  return (
    <motion.div 
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-medium mb-6 flex items-center">
        <Car className="mr-2 h-5 w-5" />
        Vehicle Specifications & Inspection Report
      </h2>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="general">
        <AccordionItem value="general">
          <AccordionTrigger className="text-lg font-medium">
            General Information
          </AccordionTrigger>
          <AccordionContent>
            <GeneralInformation generalInfo={carDetails.generalInfo} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specifications">
          <AccordionTrigger className="text-lg font-medium">
            Car Specifications
          </AccordionTrigger>
          <AccordionContent>
            <CarSpecifications specifications={carDetails.specifications} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="condition">
          <AccordionTrigger className="text-lg font-medium">
            Condition & Inspection
          </AccordionTrigger>
          <AccordionContent>
            <ConditionInspection condition={carDetails.condition} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="inspection">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5" />
              Inspection Report
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <VehicleInspection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="features">
          <AccordionTrigger className="text-lg font-medium">
            Features & Options
          </AccordionTrigger>
          <AccordionContent>
            <Features 
              interiorFeatures={carDetails.interiorFeatures}
              safetyFeatures={carDetails.safetyFeatures}
              entertainmentFeatures={carDetails.entertainmentFeatures}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="services">
          <AccordionTrigger className="text-lg font-medium">
            Additional Services
          </AccordionTrigger>
          <AccordionContent>
            <AdditionalServices additionalServices={carDetails.additionalServices} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="seller">
          <AccordionTrigger className="text-lg font-medium">
            Seller Information
          </AccordionTrigger>
          <AccordionContent>
            <SellerInformation sellerInfo={carDetails.sellerInfo} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};
