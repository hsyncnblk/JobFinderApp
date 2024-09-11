import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import BottomTabNavigator from './BottomTabNavigator'; 
import JobDetailScreen from '../screens/JobDetailScreen';
import Language from '../screens/Language'


const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Language" component={Language}/>
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
