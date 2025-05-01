
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Store, Package, Building, ShoppingBag, ShoppingCart, Boxes, Ship, Factory } from 'lucide-react';

const SiteNavigation = () => {
  const location = useLocation();
  const isWholesale = location.pathname.startsWith('/wholesale');
  const isRetail = location.pathname.startsWith('/retail') || location.pathname.startsWith('/category') || location.pathname.startsWith('/product');
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Retail Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              isRetail ? "bg-accent/50" : ""
            )}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Retail Marketplace
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/retail"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Retail Marketplace
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Browse and buy products from individual sellers for personal use
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/category/vehicles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Categories</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Browse products by category
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/shops" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Shops</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Discover verified seller shops
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/retail" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Deals</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Special offers and discounts
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Wholesale Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              isWholesale ? "bg-accent/50" : ""
            )}
          >
            <Boxes className="mr-2 h-4 w-4" />
            Bulk Trading
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/wholesale"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Ship className="h-6 w-6 mb-2" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Bulk Trading Platform
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Trade commodities in bulk with professional traders and brokers
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/wholesale/commodities" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Commodities</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Browse available bulk commodities
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/wholesale/traders" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Traders & Brokers</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Connect with verified commodity traders
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/wholesale" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Become a Trader</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Apply to sell commodities in bulk
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Open Shop */}
        <NavigationMenuItem>
          <Link to="/open-shop">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Store className="mr-2 h-4 w-4" />
              Open Shop
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SiteNavigation;
