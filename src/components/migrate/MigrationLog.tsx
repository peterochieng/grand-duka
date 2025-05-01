
import React from 'react';

interface MigrationLogProps {
  log: string[];
}

const MigrationLog: React.FC<MigrationLogProps> = ({ log }) => {
  if (log.length === 0) return null;
  
  return (
    <div className="mt-6">
      <p className="text-sm font-medium mb-2">Migration Log</p>
      <div className="bg-muted rounded-md p-3 max-h-60 overflow-y-auto">
        {log.map((entry, index) => (
          <p key={index} className="text-xs font-mono mb-1">
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MigrationLog;
