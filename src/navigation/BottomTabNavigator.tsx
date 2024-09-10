import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from '../context/AuthContext';
import JobList from '../screens/JobListingsScreen';
import ApplicationJob from '../screens/AppliedJobsScreen';
import Profile from '../screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetailScreen from '../screens/JobDetailScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const JobListStackNavigator = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobList"
        component={JobList}
        options={{
           headerTitleAlign: 'center',
          headerTitle: 'Job Listings',
          headerLeft: () => (
            <SimpleLineIcons
              name="logout"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => handleLogout(navigation)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{
          headerTitle: 'Job Detail',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const AppliedStackNavigator = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigation = useNavigation();



  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ApplicationJob"
        component={ApplicationJob}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Applied Jobs',
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('JobList')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{
          headerTitle: 'Job Detail',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};


const BottomTabNavigator = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'JobList') {
            iconName = 'menu';
          } else if (route.name === 'ApplicationJob') {
            iconName = 'checklist';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        tabBarStyle: {
          height: 50,
          borderTopColor: 'black',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          marginTop: -10,
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="JobList"
        component={JobListStackNavigator}
        options={{
          title:'Job List',

          headerShown: false
         
        }}
      />
      <Tab.Screen
        name="ApplicationJob"
        component={AppliedStackNavigator}
        options={{
          title:'Application Job',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Profile Detail',
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('JobList')}
            />
          ),
          headerRight: () => (
            <SimpleLineIcons
              name="logout"
              size={25}
              color="black"
              style={{ marginRight: 10 }}
              onPress={() => handleLogout(navigation)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
