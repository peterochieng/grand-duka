
import { InspectionData, UserPreferences } from './types';

// Mock inspection data - can be expanded for different item types
export const inspectionData: InspectionData = {
  vehicle: {
    accidentHistory: {
      hasAccidents: false,
      details: "No reported accidents or structural damage. Vehicle has clean history report."
    },
    serviceRecords: {
      lastService: "3 months ago",
      regularMaintenance: true,
      details: "All manufacturer recommended services performed at authorized dealerships."
    },
    estimatedCosts: {
      annualMaintenance: "$1,200 - $1,500",
      upcomingServices: "Brake fluid change recommended in next 2,000 miles: $150-200"
    },
    inspectionNotes: {
      engine: "Excellent condition, no leaks, smooth operation",
      transmission: "Shifts smoothly, no issues detected",
      electronics: "All systems functioning properly",
      bodyWork: "No signs of previous repairs or paint work",
      undercarriage: "Clean, no rust or damage visible"
    }
  },
  product: {
    condition: {
      overall: "Excellent",
      details: "Item appears new with no visible defects or signs of use."
    },
    authenticity: {
      verified: true,
      details: "All authentication markers present and verified as genuine."
    },
    estimatedValue: {
      currentMarket: "$1,200 - $1,500",
      retailPrice: "$1,800"
    },
    inspectionNotes: {
      exterior: "No scratches, dents, or discoloration",
      functionality: "All features work as expected",
      packaging: "Original packaging in excellent condition",
      accessories: "All original accessories included and functional"
    }
  },
  commodity: {
    quality: {
      grade: "Premium",
      details: "Meets or exceeds all industry standards for this grade."
    },
    quantity: {
      verified: true,
      details: "Weight/volume matches seller specifications."
    },
    inspectionNotes: {
      purity: "99.7% pure with minimal impurities",
      storage: "Properly stored in appropriate conditions",
      handling: "Properly handled during transportation",
      documentation: "All certificates and documentation verified"
    }
  }
};

// Mock user preferences for personalized recommendations
export const userPreferences: UserPreferences = {
  interests: ["luxury", "electronics", "outdoor gear"],
  priceRange: {
    min: 500,
    max: 5000
  },
  recentSearches: ["smartphone", "laptop", "camera"],
  purchaseHistory: ["electronics", "accessories"]
};
