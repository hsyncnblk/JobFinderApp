import React, { createContext, useContext, useState } from 'react';
import { profile } from '../api';
import { useQuery } from 'react-query';

interface ProfileContextType {
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  error: any;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<any>(null);

  const fetchProfile = async () => {
    const response = await profile();
    return response;
  };

  const { data, isLoading, error } = useQuery('profile', fetchProfile, {
    onSuccess: (data) => {
      setProfileData(data);
    },
  });

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
