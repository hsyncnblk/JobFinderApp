

import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { registerUser } from '../api/index';
import { AuthContext } from '../context/AuthContext';

const CreateAccountScreen = () => {
  const { control, handleSubmit ,reset } = useForm();
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const mutation = useMutation(({ email, password }: { email: string; password: string }) =>
    registerUser(email, password)
  );
  
  const onSubmit = (data: { email: string; password: string }) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Kayıt başarılı:', response);
        login(response.accessToken);
         navigation.navigate('JobListings');
      },
      onError: (error) => {
        console.error('Kayıt hatası:', error);
      },
    });
    reset(); 
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
          />
        )}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
     
      {mutation.isLoading && <Text>Loading...</Text>}
      {mutation.isError && <Text style={styles.error}>sign up failed, try again.</Text>}

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
 
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    color: 'black',
    height: 50,
    borderColor: '#000',
    borderWidth: 4,
   
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  button: {
  
    paddingVertical: 10,
    
    borderColor: 'black',
    borderWidth: 4,
    marginBottom: 40,
    borderBottomWidth: 7,
    borderRightWidth: 7,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CreateAccountScreen;
