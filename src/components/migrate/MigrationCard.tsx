
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MigrationCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isLoading: boolean;
  onMigrate: () => void;
}

const MigrationCard: React.FC<MigrationCardProps> = ({
  title,
  description,
  children,
  isLoading,
  onMigrate
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>{children}</CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Home
        </Button>
        <Button 
          onClick={onMigrate} 
          disabled={isLoading}
        >
          {isLoading ? 'Migrating...' : 'Start Migration'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MigrationCard;
