
import { Product } from '@/lib/data';
import { InspectionAccordion } from '@/components/car/InspectionAccordion';
import { getCarDetailsData } from '@/components/car/CarDetailsData';

interface CarProductDetailsProps {
  product: Product;
}

export const CarProductDetails = ({ product }: CarProductDetailsProps) => {
  const carDetails = getCarDetailsData();
  return <InspectionAccordion carDetails={carDetails} />;
};
