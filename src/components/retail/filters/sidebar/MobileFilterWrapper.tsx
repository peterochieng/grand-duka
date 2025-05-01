
import React, { ReactNode } from 'react';
import MobileFilterDrawer from '../MobileFilterDrawer';

interface MobileFilterWrapperProps {
  onClearAll: () => void;
  children: ReactNode;
}

const MobileFilterWrapper = ({ 
  onClearAll,
  children
}: MobileFilterWrapperProps) => {
  return (
    <MobileFilterDrawer onClearAll={onClearAll}>
      {children}
    </MobileFilterDrawer>
  );
};

export default MobileFilterWrapper;
