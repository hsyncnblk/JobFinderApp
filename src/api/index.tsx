import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const api = axios.create({
  baseURL: 'https://novel-project-ntj8t.ampt.app/api',
});

export const refreshToken = async () => {

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
   // console.error('Error refreshing token:', error);
   // Alert.alert('Oturum Yenileme Hatası', 'Token yenileme sırasında bir hata oluştu. Lütfen tekrar giriş yapın.');

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
        //Alert.alert('Giriş Hatası', 'Giriş yapmanız gerekiyor. Lütfen tekrar giriş yapın.');
        return Promise.reject(refreshError);  
      }
    }
    const errorMessage = error.response?.data?.message || 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
    Alert.alert('Hata', errorMessage);
    return Promise.reject(error); 
  }
);

// Login 
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  await AsyncStorage.setItem('userToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
  
  return response.data;
  } catch (error) {
    Alert.alert('Giriş Hatası', 'Kullanıcı adı veya şifre hatalı.');
    throw error;
  }
 

  
};

// Sign Up  
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/register', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    Alert.alert('Kayıt Hatası', 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    throw error;
  }
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
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await api.get('/user', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Search jobs error:', error);
    throw error;
  }
 
};

// Kullanıcı bilgilerini güncelle
export const updateUser = async (userData) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
  const response = await api.put('/user', userData, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
  });
  return response.data;
  
  } catch (error) {
    console.log("basarıszı güncelleme ", error) 
  }
  
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
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await api.post(`/jobs/${id}/apply`, null, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert('Başvuru Hatası', 'İşe başvuru sırasında bir hata oluştu.');
    throw error;
  }
};

export const withdrawJob = async (id) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await api.post(`/jobs/${id}/withdraw`, null, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert('Başvuru Çekme Hatası', 'Başvuru çekme sırasında bir hata oluştu.');
    throw error;
  }
};
