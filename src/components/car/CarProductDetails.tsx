
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, FileCheck } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/data';
import { VehicleInspection } from '@/components/inspection/VehicleInspection';
import { GeneralInformation } from './GeneralInformation';
import { CarSpecifications } from './CarSpecifications';
import { ConditionInspection } from './ConditionInspection';
import { Features } from './Features';
import { AdditionalServices } from './AdditionalServices';
import { SellerInformation } from './SellerInformation';

interface CarProductDetailsProps {
  product: Product;
}

export const CarProductDetails = ({ product }: CarProductDetailsProps) => {
  const carDetails = {
    generalInfo: {
      make: "Range Rover",
      model: "Sport",
      trim: "Autobiography",
      year: 2022,
      mileage: 8000,
      location: "Dubai, Downtown",
      specs: "GCC",
      firstOwner: true,
      serviceHistory: "Verified",
      warranty: true,
      warrantyDuration: "36 months",
      warrantyMileage: "100,000 km"
    },
    specifications: {
      bodyType: "SUV",
      doors: 5,
      seats: 5,
      keys: 2,
      steeringSide: "Left Hand",
      transmission: "Automatic",
      fuelType: "Petrol",
      engineCapacity: 5000,
      horsepower: 550,
      cylinders: 8,
      drivetrain: "AWD",
      exteriorColor: "Santorini Black",
      interiorColor: "Ebony/Ivory",
      targetMarket: "UAE",
      vinNumber: "SALWZ2FE3MA######"
    },
    condition: {
      accidentHistory: false,
      inspectionReport: true,
      engineScore: 9.5,
      roadTestScore: 9.8,
      electronicsScore: 9.7,
      tiresAndBrakesScore: 9.3,
      bodyConditionScore: 9.6
    },
    interiorFeatures: {
      electricWindows: true,
      electricMirrors: true,
      digitalDisplay: true,
      reversingCamera: true,
      navigation: true,
      cruiseControl: true,
      steeringControls: true,
      airConditioning: "Automatic"
    },
    safetyFeatures: {
      airbags: ["Front", "Side", "Curtain"],
      childLocks: true,
      tractionControl: true,
      laneAssist: true,
      parkingSensors: true,
      abs: true,
      blindSpotMonitoring: true
    },
    entertainmentFeatures: {
      bluetooth: true,
      cdPlayer: false,
      usbPorts: true,
      carPlay: true,
      wirelessCharging: true,
      premiumSound: true
    },
    additionalServices: {
      serviceContract: true,
      serviceContractPrice: "12,000 AED",
      insuranceOffers: "Comprehensive insurance available",
      financingOptions: true,
      tradeIn: true
    },
    sellerInfo: {
      type: "Dealer",
      responseTime: "Usually responds within 2 hours",
      preferredContact: ["Call", "WhatsApp"]
    }
  };

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
