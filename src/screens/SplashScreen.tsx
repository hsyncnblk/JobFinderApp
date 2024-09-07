import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const SplashScreen = () => {
    const navigation = useNavigation();
  
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ACME</Text>
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
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
  
  export default SplashScreen;