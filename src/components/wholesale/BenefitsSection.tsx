
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Briefcase, Clock } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Why Trade on GrandDuka</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="p-4">
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Verified Traders</CardTitle>
            <CardDescription>All traders and brokers on our platform are verified through a rigorous KYC process.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <Briefcase className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Secure Transactions</CardTitle>
            <CardDescription>Protected payment systems and contract enforcement to ensure security for all parties.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Future Contracts</CardTitle>
            <CardDescription>Secure commodities for future delivery with confidence through our platform.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default BenefitsSection;
