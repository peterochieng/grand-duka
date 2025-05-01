
import React from 'react';
import { AccountSummary } from './AccountSummary';
import { PersonalInformation } from './PersonalInformation';
import { VerificationStatus } from './VerificationStatus';
import { RecentActivity } from './RecentActivity';
import { EditProfileForm } from './EditProfileForm';

interface ProfileOverviewProps {
  isEditingProfile: boolean;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveProfile: (e: React.FormEvent) => void;
}

export const ProfileOverview = ({
  isEditingProfile,
  setIsEditingProfile,
  handleSaveProfile
}: ProfileOverviewProps) => {
  if (isEditingProfile) {
    return (
      <EditProfileForm 
        setIsEditingProfile={setIsEditingProfile} 
        handleSaveProfile={handleSaveProfile}
      />
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AccountSummary />
      <PersonalInformation />
      <VerificationStatus />
      <RecentActivity />
    </div>
  );
};
