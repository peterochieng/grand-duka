import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RetailShopDashboard = () => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        navigate("/login");
        return;
      }

      // fetch the real role from your RPC
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "get_latest_user_role",
        { p_user: sessionData.session.user.id }
      );

      if (rpcError) {
        console.error("RPC error fetching role:", rpcError);
        navigate("/login");
        return;
      }

      // Use RPC role if available, otherwise fallback to user_metadata.user_type
      const roleFromRPC =
        Array.isArray(rpcData) && rpcData.length > 0 ? rpcData[0].role : null;

      const userRole =
        roleFromRPC ||
        sessionData.session.user.user_metadata?.user_type ||
        "buyer";

      if (userRole !== "shop-owner" && userRole !== "shop-employee") {
        navigate("/retail");
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-4">Loading shop dashboard...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Shop Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your retail shop and team
            </p>
          </div>
          <Button onClick={() => navigate("/retail")}>
            Back to Marketplace
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Shop inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">0 active listings</p>
                  <Button className="w-full">Add New Product</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Customer purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">0 pending orders</p>
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <CardDescription>Staff members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">1 team member</p>
                  <Button variant="outline" className="w-full">
                    Manage Team
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Shop Performance</CardTitle>
                <CardDescription>Overview of your shop metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  No performance data available yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Product Listings</CardTitle>
                  <Button>Add Product</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  No products listed yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Customer Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  No orders received yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Members</CardTitle>
                  <Button>Add Employee</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Only shop owner is registered
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Shop Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Shop settings coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RetailShopDashboard;
