
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="bg-muted rounded-lg p-8 text-center space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold">Ready to start trading?</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Join our platform to connect with verified traders and brokers from around the world.
      </p>
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button size="lg" asChild>
          <Link to="/signup">Create Account</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/wholesale/become-trader">Become a Trader</Link>
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
