import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import { AuthContext } from '../context/AuthContext';
import JobDetailScreen from '../screens/JobDetailScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'JobListings' : 'Login'}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerTitle: "" }} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{
         
          headerTitle: 'Job Detail',
          headerTitleAlign: 'center',
          
        }}  />
        <Stack.Screen 
          name="JobListings" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
