
import { Badge } from "@/components/ui/badge";

interface ShopStatusBadgeProps {
  status: string;
}

export const ShopStatusBadge = ({ status }: ShopStatusBadgeProps) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'suspended':
      return <Badge className="bg-red-500">Suspended</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
