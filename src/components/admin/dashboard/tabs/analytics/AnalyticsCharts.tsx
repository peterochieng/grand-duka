
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

// Analytics data types
interface PieChartData {
  name: string;
  value: number;
}

interface BarChartData {
  name: string;
  count: number;
}

export const ShopTypePieChart = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchShopTypes = async () => {
      setLoading(true);
      try {
        // Get shop types from database
        const { data: shops, error } = await supabase
          .from('shops')
          .select('type');
          
        if (error) {
          throw new Error(error.message);
        }
        
        if (!shops || shops.length === 0) {
          setData([]);
          return;
        }
        
        // Count occurrences of each shop type
        const typeCounts: Record<string, number> = {};
        
        shops.forEach(shop => {
          const type = shop.type || 'Unknown';
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        // Convert to chart data format
        const chartData = Object.entries(typeCounts).map(([name, value]) => ({
          name,
          value
        }));
        
        setData(chartData);
      } catch (err) {
        console.error('Error fetching shop types:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch shop types'));
        
        // Return empty array instead of mock data
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShopTypes();
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF'];
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Types</CardTitle>
          <CardDescription>Distribution of different shop types</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Types</CardTitle>
          <CardDescription>Distribution of different shop types</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center text-red-500">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p>Error loading data</p>
        </CardContent>
      </Card>
    );
  }
  
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Types</CardTitle>
          <CardDescription>Distribution of different shop types</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
          <p>No shop data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shop Types</CardTitle>
        <CardDescription>Distribution of different shop types</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} shops`, 'Count']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const StatusPieChart = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchShopStatuses = async () => {
      setLoading(true);
      try {
        // Get shop statuses from database
        const { data: shops, error } = await supabase
          .from('shops')
          .select('status');
          
        if (error) {
          throw new Error(error.message);
        }
        
        if (!shops || shops.length === 0) {
          setData([]);
          return;
        }
        
        // Count occurrences of each status
        const statusCounts: Record<string, number> = {};
        
        shops.forEach(shop => {
          const status = shop.status || 'Unknown';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        
        // Convert to chart data format
        const chartData = Object.entries(statusCounts).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
          value
        }));
        
        setData(chartData);
      } catch (err) {
        console.error('Error fetching shop statuses:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch shop statuses'));
        
        // Return empty array instead of mock data
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShopStatuses();
  }, []);
  
  const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E'];
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Statuses</CardTitle>
          <CardDescription>Active vs. pending shops</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Statuses</CardTitle>
          <CardDescription>Active vs. pending shops</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center text-red-500">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p>Error loading data</p>
        </CardContent>
      </Card>
    );
  }
  
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shop Statuses</CardTitle>
          <CardDescription>Active vs. pending shops</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
          <p>No shop data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shop Statuses</CardTitle>
        <CardDescription>Active vs. pending shops</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} shops`, 'Count']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const CategoryBarChart = () => {
  const [data, setData] = useState<BarChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // Get product categories from database
        const { data: products, error } = await supabase
          .from('products')
          .select('category');
          
        if (error) {
          throw new Error(error.message);
        }
        
        if (!products || products.length === 0) {
          setData([]);
          return;
        }
        
        // Count occurrences of each category
        const categoryCounts: Record<string, number> = {};
        
        products.forEach(product => {
          const category = product.category || 'Uncategorized';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        
        // Convert to chart data format and sort by count
        const chartData = Object.entries(categoryCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Get top 10 categories
        
        setData(chartData);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch category data'));
        
        // Return empty array instead of mock data
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, []);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Most popular product categories</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Most popular product categories</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col items-center justify-center text-red-500">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p>Error loading data</p>
        </CardContent>
      </Card>
    );
  }
  
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Most popular product categories</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <p>No product data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Categories</CardTitle>
        <CardDescription>Most popular product categories</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              width={70}
            />
            <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Products" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
