
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitItem {
  text: string;
  isIncluded: boolean;
}

interface ShopBenefitsProps {
  title: string;
  benefits: BenefitItem[];
}

const ShopBenefits = ({ title, benefits }: ShopBenefitsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              {benefit.isIncluded ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
              )}
              <span>{benefit.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ShopBenefits;
