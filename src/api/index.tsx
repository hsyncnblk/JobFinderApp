import axios from 'axios';


  const api = axios.create({
    baseURL: 'https://novel-project-ntj8t.ampt.app/api',
    headers: {
      'Content-Type': 'application/json',
    },
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