
import { CategoryDetails } from '../types';

export const businessCategories: Record<string, CategoryDetails> = {
  'Business & Industrial': {
    titles: [
      'Successful Restaurant for Sale',
      'Laundromat Business Opportunity',
      'Established E-commerce Store',
      'Profitable Auto Repair Shop',
      'Convenience Store with Real Estate',
      'Well-established Hair Salon',
      'Commercial Cleaning Business'
    ],
    descriptions: [
      'Turnkey business opportunity with established clientele and excellent location.',
      'Profitable business with strong financials and growth potential.',
      'Established business with proven track record and loyal customer base.',
      'Successful business with trained staff and premium equipment included.',
      'High-traffic location with stable income and opportunity for expansion.',
      'Established business with excellent reputation and loyal customers.',
      'Successful operation with long-term contracts and trained staff.'
    ],
    priceRange: [50000, 2000000],
    conditions: ['Operational', 'Recently Renovated', 'Established', 'Turnkey'],
    tags: ['business', 'investment', 'opportunity', 'sale', 'commercial']
  },
  'Business Services': {
    titles: [
      'Distribution Center Management Services',
      'Facility Management Solutions',
      'Corporate Event Planning Service',
      'Professional Call Center Services',
      'Executive Limousine Transportation',
      'Warehouse Management Solutions',
      'Commercial Cleaning Services'
    ],
    descriptions: [
      'Complete distribution center management with inventory tracking and logistics support.',
      'Comprehensive facility management services for commercial properties.',
      'Professional event planning services for corporate events and conferences.',
      'Outsourced call center solutions with trained multilingual staff.',
      'Premium limousine services for corporate clients and events.',
      'End-to-end warehouse management with advanced inventory control systems.',
      'Professional cleaning services for commercial and industrial facilities.'
    ],
    priceRange: [5000, 100000],
    conditions: ['Available', 'Custom Package'],
    tags: ['service', 'business', 'corporate', 'professional', 'outsourcing']
  },
  'Hardware Tools': {
    titles: [
      'Industrial Power Generator',
      'Professional Mechanic Tool Set',
      'Heavy-Duty Pipe Wrench Set',
      'Commercial Grade Air Compressor',
      'Industrial Tool Cabinet',
      'Professional Socket Wrench Set',
      'Commercial Electric Power Tools'
    ],
    descriptions: [
      'High-capacity power generator for commercial and industrial applications.',
      'Complete professional-grade mechanic tool set with lifetime warranty.',
      'Heavy-duty pipe wrench set for industrial plumbing applications.',
      'Commercial-grade air compressor with high capacity tank and accessories.',
      'Industrial-strength tool cabinet with multiple secure drawers.',
      'Comprehensive socket wrench set with various sizes and drive types.',
      'Professional-grade electric power tools for commercial applications.'
    ],
    priceRange: [500, 25000],
    conditions: ['New', 'Used', 'Refurbished', 'Open Box'],
    tags: ['tools', 'industrial', 'commercial', 'hardware', 'equipment']
  }
};
