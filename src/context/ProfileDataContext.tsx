import React, { createContext, useContext, useState } from 'react';
import { profile } from '../api';
import { useQuery } from 'react-query';

interface ProfileContextType {
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<any>(null);

  const fetchProfile = async () => {
    const response = await profile();
    return response.data;
  };

  const { data, isLoading, error , refetch } = useQuery('profile', fetchProfile, {
    onSuccess: (data) => {
      setProfileData(data);
      console.log("sad",data)
    },
  });

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, isLoading, error , refetch }}>
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
