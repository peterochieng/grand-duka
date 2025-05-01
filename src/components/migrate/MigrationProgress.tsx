
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface MigrationProgressProps {
  progress: number;
}

const MigrationProgress: React.FC<MigrationProgressProps> = ({ progress }) => {
  if (progress === 0) return null;
  
  return (
    <div className="my-6">
      <p className="text-sm font-medium mb-2">Migration Progress</p>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
    </div>
  );
};

export default MigrationProgress;
