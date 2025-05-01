
import { Check, X, Sparkles, ShieldCheck, Gauge } from 'lucide-react';

interface FeaturesProps {
  interiorFeatures: Record<string, boolean | string>;
  safetyFeatures: Record<string, boolean | string[] | any>;
  entertainmentFeatures: Record<string, boolean>;
}

export const Features = ({ 
  interiorFeatures, 
  safetyFeatures, 
  entertainmentFeatures 
}: FeaturesProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-base font-medium mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" /> Interior Features
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(interiorFeatures).map(([key, value]) => (
            <div key={key} className="flex items-center">
              {typeof value === "boolean" ? (
                <>
                  {value ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-300 mr-2" />}
                  <span className={value ? "" : "text-gray-400"}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </>
              ) : (
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Air Conditioning: {value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-base font-medium mb-3 flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2" /> Safety & Security
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(safetyFeatures).map(([key, value]) => (
            <div key={key} className="flex items-center">
              {Array.isArray(value) ? (
                <>
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Airbags: {value.join(', ')}</span>
                </>
              ) : (
                <>
                  {value ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-300 mr-2" />}
                  <span className={value ? "" : "text-gray-400"}>
                    {key === 'abs' ? 'ABS' : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-base font-medium mb-3 flex items-center">
          <Gauge className="w-4 h-4 mr-2" /> Entertainment & Connectivity
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(entertainmentFeatures).map(([key, value]) => (
            <div key={key} className="flex items-center">
              {value ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-300 mr-2" />}
              <span className={value ? "" : "text-gray-400"}>
                {key === 'cdPlayer' ? 'CD Player' : 
                 key === 'usbPorts' ? 'USB/AUX Ports' :
                 key === 'carPlay' ? 'Apple CarPlay/Android Auto' :
                 key === 'premiumSound' ? 'Premium Sound System' :
                 key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
