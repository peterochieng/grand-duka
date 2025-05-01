
import { StatCard } from "./StatCard";
import { Package, Users, Store, AlertCircle } from "lucide-react";

interface DefaultStatsProps {
  totalProducts: number;
  totalUsers: number;
  totalShops: number;
  pendingVerifications: number;
  productGrowth: number;
  userGrowth: number;
  shopGrowth: number;
  verificationGrowth: number;
}

export const DefaultStats = ({
  totalProducts,
  totalUsers,
  totalShops,
  pendingVerifications,
  productGrowth,
  userGrowth,
  shopGrowth,
  verificationGrowth
}: DefaultStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Total Products"
        value={totalProducts}
        icon={Package}
        change={productGrowth}
        changeLabel={productGrowth > 0 ? "increase" : "decrease"}
        iconColor="text-blue-500"
        borderColor="border-l-blue-500"
      />
      
      <StatCard
        title="Registered Users"
        value={totalUsers}
        icon={Users}
        change={userGrowth}
        changeLabel={userGrowth > 0 ? "increase" : "decrease"}
        iconColor="text-purple-500"
        borderColor="border-l-purple-500"
      />
      
      <StatCard
        title="Total Shops"
        value={totalShops}
        icon={Store}
        change={shopGrowth}
        changeLabel={shopGrowth > 0 ? "increase" : "decrease"}
        iconColor="text-green-500"
        borderColor="border-l-green-500"
      />
      
      <StatCard
        title="Pending Verifications"
        value={pendingVerifications}
        icon={AlertCircle}
        change={verificationGrowth}
        changeLabel={verificationGrowth > 0 ? "increase" : "decrease"}
        iconColor="text-amber-500"
        borderColor="border-l-amber-500"
      />
    </div>
  );
};
