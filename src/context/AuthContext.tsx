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

  const login = async (token: string , refresh:string) => {
    console.log("tyoken",token)

    console.log("Login accessToken:", token);
    console.log("Login refreshToken:", refresh);

    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken',refresh)
      console.log("getItem",await AsyncStorage.getItem('userToken') )
      setIsLoggedIn(true);
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
