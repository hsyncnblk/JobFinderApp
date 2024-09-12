import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
  }

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const login = async (token: string , refresh:string) => {
    

    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken',refresh)
      const uToken = await AsyncStorage.getItem('userToken')
      console.log("getItem",await AsyncStorage.getItem('userToken') )
      setIsLoggedIn(true);
      if (uToken !== null) {
      setToken(uToken);  
    } else {
      setToken(''); 
    }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken')
      setIsLoggedIn(false); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
