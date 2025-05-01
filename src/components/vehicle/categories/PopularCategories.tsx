
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface PopularCategory {
  name: string;
  icon: LucideIcon;
  path: string;
}

interface PopularCategoriesProps {
  categories: PopularCategory[];
}

const PopularCategories = ({ categories }: PopularCategoriesProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Popular in Vehicles</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category, index) => (
          <Button key={index} variant="outline" className="justify-start" asChild>
            <Link to={category.path}>
              <category.icon className="mr-2 h-4 w-4" /> {category.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
