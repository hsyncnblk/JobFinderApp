import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query'; 
import { loginUser } from '../api/index'; 



const LoginScreen = () => {
  const { control, handleSubmit, reset } = useForm();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const mutation = useMutation(({ email, password }: { email: string; password: string }) =>
    loginUser(email, password)
  );

  const onSubmit = (data: { email: string; password: string }) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Login başarılı:', response);
        
        
        navigation.navigate('JobListings'); 
      },
      onError: (error) => {
        console.error('Login hatası:', error);
      },
    });
    reset(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <Text style={styles.subtitle}>{t('appName')}</Text>

      <Text style={styles.label}>{t('email')}</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder={t('email')}
            keyboardType="email-address"
          />
        )}
      />

      <Text style={styles.label}>{t('password')}</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: 'password is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder={t('password')}
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>

      {mutation.isLoading && <Text>{t('loading')}</Text>}
      {mutation.isError && <Text style={styles.error}>{t('loginFailed')}</Text>}



      <Text style={styles.footerText}>{t('dontHaveAccount')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.buttonText}>{t('createAccount')}</Text>
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
