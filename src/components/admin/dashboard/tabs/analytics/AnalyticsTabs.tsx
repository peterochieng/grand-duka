
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { ShopTypePieChart, StatusPieChart, CategoryBarChart } from "./AnalyticsCharts";

export const AnalyticsTabs = () => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="categories">
          <PieChartIcon className="mr-2 h-4 w-4" />
          Categories
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShopTypePieChart />
          <StatusPieChart />
        </div>
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoryBarChart />
      </TabsContent>
    </Tabs>
  );
};
