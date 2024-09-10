import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
});

export const refreshToken = async () => {

  console.log("tr", await AsyncStorage.getItem('refreshToken')
  )
  try {
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    if (!storedRefreshToken) throw new Error('Refresh token bulunamadı');
    
    const response = await api.post('/refresh', {
      refreshToken: storedRefreshToken, 
    });
    
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    
    await AsyncStorage.setItem('userToken', newAccessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
    
    return newAccessToken;  
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,  
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newAccessToken = await refreshToken();  
        
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; 
        return api(originalRequest); 
      } catch (refreshError) {
        console.error('Token yenileme sırasında hata:', refreshError);
        return Promise.reject(refreshError);  
      }
    }
    
    return Promise.reject(error); 
  }
);

// Login 
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', {
    email,
    password,
  });

  const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  await AsyncStorage.setItem('userToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
  
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
  return response.data;
};

// Jobs
export const jobs = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await api.get('/jobs', {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};

// User bilgilerini al
export const user = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await api.get('/user', {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};

// Kullanıcı bilgilerini güncelle
export const updateUser = async (userData) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await api.put('/user', userData, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};

// Şirket ismi ile iş arama
export const searchJobs = async (searchQuery: string) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('Token bulunamadı');
    
    const response = await api.get('/jobs', {
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



export const applyJob = async (id) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await api.post(`/jobs/${id}/apply`, null, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};

export const withdrawJob = async (id) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await api.post(`/jobs/${id}/withdraw`, null, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
};
