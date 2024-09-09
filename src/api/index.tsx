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

  // user
  export const user = async () => {
    const token = await AsyncStorage.getItem('userToken');

    const response = await api.get('/user', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response; 
  };


  // update user

  export const updateUser = async (userData) => {
    const token = await AsyncStorage.getItem('userToken');

    const response = await api.put('/user', userData ,{
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response; 
  };

// search with companyName
export const searchJobs = async (searchQuery: string) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('Token bulunamadı');
    
    const response = await axios.get('/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        'search[field]': 'companyName',  
        'search[query]': searchQuery,    
      },
    });

    return response.data;
  } catch (error) {
    console.error('Search jobs error:', error);
    throw error;
  }
};
