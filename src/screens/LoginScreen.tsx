import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { control, handleSubmit, reset } = useForm();




  const onSubmit = (data: { email: string; password: string }) => {
    console.log("deneme")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.subtitle}>ACME APP</Text>

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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    
      <Text style={styles.footerText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log("create user ")}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 60,
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
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
