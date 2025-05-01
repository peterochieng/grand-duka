
import { CarDetails } from './types';

export const getCarDetailsData = (): CarDetails => {
  return {
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
};
