
import { Settings, ShieldCheck, Info, Car } from 'lucide-react';

interface AdditionalServicesProps {
  additionalServices: {
    serviceContract: boolean;
    serviceContractPrice: string;
    insuranceOffers: string;
    financingOptions: boolean;
    tradeIn: boolean;
  };
}

export const AdditionalServices = ({ additionalServices }: AdditionalServicesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="mt-1 mr-3 p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium">Service Contract</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {additionalServices.serviceContract ? 
                `Available for ${additionalServices.serviceContractPrice}` : 
                'Not available'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-3 p-1.5 bg-green-50 dark:bg-green-900/20 rounded-full">
            <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-medium">Insurance Offers</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {additionalServices.insuranceOffers}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="mt-1 mr-3 p-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-medium">Financing Options</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {additionalServices.financingOptions ? 
                'Available with monthly installment plans' : 
                'Not available'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-3 p-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-full">
            <Car className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-medium">Trade-in Option</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {additionalServices.tradeIn ? 
                'Available - contact seller for evaluation' : 
                'Not available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
