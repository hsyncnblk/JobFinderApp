import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';



const SplashScreen = () => {
    const navigation = useNavigation();

    const { isLoggedIn } = useContext(AuthContext); 

  
    useEffect(() => {
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.navigate('JobListings'); 
        } else {
          navigation.navigate('Login'); 
        }
      }, 2000); 
    }, [isLoggedIn, navigation]);

    return (
      <View style={styles.container}>
              <View style={styles.circle}>
        <Text style={styles.title}>ACME</Text>
      </View>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
    },
    circle: {
      width: 150, // Yuvarlağın genişliği
      height: 150, // Yuvarlağın yüksekliği
      borderRadius: 75, // Tam yuvarlak olması için genişlik/yüksekliğin yarısı kadar bir borderRadius
      backgroundColor: 'grey', // Gri renk
      justifyContent: 'center', // İçeriğin ortalanması için
      alignItems: 'center', // İçeriğin ortalanması için
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
  
  export default SplashScreen;