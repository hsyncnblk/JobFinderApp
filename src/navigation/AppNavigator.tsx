import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import JobListingsScreen from '../screens/JobListingsScreen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const Stack = createStackNavigator();

const AppNavigator = () => {


  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerTitle: "" }} />
        <Stack.Screen
          name="JobListings"
          component={JobListingsScreen}
          options={({ navigation }) => ({
            headerTitle: 'Job Lists',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <SimpleLineIcons
                name="logout"
                size={25} 
                color="black" 
                style={{ marginLeft: 10 }} 
                //onPress={() =>} 
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
