import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


  const api = axios.create({
    baseURL: 'https://novel-project-ntj8t.ampt.app/api',
    
  });


  
// Login 
export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', {
      email,
      password,
    });
    return response.data;  
  };

// Sign Up  
  export const registerUser = async (email: string, password: string) => {
    const response = await api.post('/register', {
      email,
      password,
    });
    return response.data; 
  };


  // Profile

  export const profile = async () => {
    const token = await AsyncStorage.getItem('userToken');

    const response = await api.get('/profile', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    console.log("profile 8",response.data)
    return response.data; 
  };

  // Jobs
  export const jobs =async () => {
    const token = await AsyncStorage.getItem('userToken');
    //console.log("object,",token)
    const response = await api.get('/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    console.log("gercek response data",response.data)
    return response.data; 
  };