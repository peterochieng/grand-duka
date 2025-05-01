
import React from 'react';
import { BuyingOptionsManager } from './settings/BuyingOptionsManager';
import { PendingKycList } from './users/kyc/PendingKycList';

export const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Platform Settings</h2>
        <BuyingOptionsManager />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">KYC Management</h2>
        <PendingKycList />
      </div>
    </div>
  );
};
