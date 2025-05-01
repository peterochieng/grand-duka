
export interface CarDetails {
  generalInfo: {
    make: string;
    model: string;
    trim: string;
    year: number;
    mileage: number;
    location: string;
    specs: string;
    firstOwner: boolean;
    serviceHistory: string;
    warranty: boolean;
    warrantyDuration: string;
    warrantyMileage: string;
  };
  specifications: {
    bodyType: string;
    doors: number;
    seats: number;
    keys: number;
    steeringSide: string;
    transmission: string;
    fuelType: string;
    engineCapacity: number;
    horsepower: number;
    cylinders: number;
    drivetrain: string;
    exteriorColor: string;
    interiorColor: string;
    targetMarket: string;
    vinNumber: string;
  };
  condition: {
    accidentHistory: boolean;
    inspectionReport: boolean;
    engineScore: number;
    roadTestScore: number;
    electronicsScore: number;
    tiresAndBrakesScore: number;
    bodyConditionScore: number;
  };
  interiorFeatures: {
    electricWindows: boolean;
    electricMirrors: boolean;
    digitalDisplay: boolean;
    reversingCamera: boolean;
    navigation: boolean;
    cruiseControl: boolean;
    steeringControls: boolean;
    airConditioning: string;
  };
  safetyFeatures: {
    airbags: string[];
    childLocks: boolean;
    tractionControl: boolean;
    laneAssist: boolean;
    parkingSensors: boolean;
    abs: boolean;
    blindSpotMonitoring: boolean;
  };
  entertainmentFeatures: {
    bluetooth: boolean;
    cdPlayer: boolean;
    usbPorts: boolean;
    carPlay: boolean;
    wirelessCharging: boolean;
    premiumSound: boolean;
  };
  additionalServices: {
    serviceContract: boolean;
    serviceContractPrice: string;
    insuranceOffers: string;
    financingOptions: boolean;
    tradeIn: boolean;
  };
  sellerInfo: {
    type: string;
    responseTime: string;
    preferredContact: string[];
  };
}
