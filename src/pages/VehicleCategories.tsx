
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import VehicleTabContent from '@/components/vehicle/categories/VehicleTabContent';
import PartsTabContent from '@/components/vehicle/categories/PartsTabContent';
import PopularCategories from '@/components/vehicle/categories/PopularCategories';
import { vehicleTypes, popularCategories } from '@/components/vehicle/categories/VehicleCategoryData';

const VehicleCategories = () => {
  const [activeTab, setActiveTab] = useState('vehicles');

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Vehicle Categories</h1>
            <p className="text-muted-foreground">
              Browse our selection of vehicles and parts for sale
            </p>
          </div>

          <Tabs defaultValue="vehicles" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="parts">Parts & Accessories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicles" className="mt-6">
              <VehicleTabContent vehicleTypes={vehicleTypes} />
            </TabsContent>
            
            <TabsContent value="parts" className="mt-6">
              <PartsTabContent />
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <PopularCategories categories={popularCategories} />
        </div>
      </div>
    </Layout>
  );
};

export default VehicleCategories;
