import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { user, updateUser } from '../api';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const getUser = async () => {
  const response = await user();
  return response;
};

const ProfileScreen = () => {
  const { data: userData, isLoading: isUserLoading, error: UserError, refetch } = useQuery('user', getUser);
  const { t } = useTranslation(); 
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        surname: userData.surname,
        profileImage: userData.profileImage,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        addressDetails: userData.address?.details,
        city: userData.address?.city,
        country: userData.address?.country,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      profileImage: data.profileImage,
      dateOfBirth: data.dateOfBirth,
      address: {
        details: data.addressDetails,
        city: data.city,
        country: data.country,
      },
    };

    try {
      const response = await updateUser(formattedData);
      console.log('Kayıt başarılı', response);
      refetch(); 
    } catch (error) {
      console.error('Güncelleme hatası:', error.response?.data || error.message);
    }
  };

  if (UserError) {
    return (
      <View>
        <Text>{t('profileDetail')}</Text> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <ScrollView>
          <Text style={styles.title}>{t('PersonaleInfo')}</Text> 

          <Text style={styles.subTitle}>{t('name')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('name')}
            defaultValue={userData?.name}
            onChangeText={(text) => setValue('name', text)}
            {...register('name', { required: t('name') + ' is required' })}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('surname')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('surname')}
            defaultValue={userData?.surname}
            onChangeText={(text) => setValue('surname', text)}
            {...register('surname', { required: t('surname') + ' is required' })}
          />
          {errors.surname && <Text style={styles.errorText}>{errors.surname.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('profileImage')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('profileImage')}
            defaultValue={userData?.profileImage}
            onChangeText={(text) => setValue('profileImage', text)}
            {...register('profileImage', { required: t('profileImage') + ' is required' })}
          />
          {errors.profileImage && <Text style={styles.errorText}>{errors.profileImage.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('Phone')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('Phone')}
            defaultValue={userData?.phone}
            onChangeText={(text) => setValue('phone', text)}
            {...register('phone', { required: t('Phone') + ' is required' })}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('dateOfBirth')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('dateOfBirth')}
            defaultValue={userData?.dateOfBirth}
            onChangeText={(text) => setValue('dateOfBirth', text)}
            {...register('dateOfBirth', { required: t('dateOfBirth') + ' is required' })}
          />
          {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth.message?.toString()}</Text>}

          <Text style={styles.title}>{t('adress')}</Text> 

          <Text style={styles.subTitle}>{t('Country')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('Country')}
            defaultValue={userData?.address?.country}
            onChangeText={(text) => setValue('country', text)}
            {...register('country', { required: t('Country') + ' is required' })}
          />
          {errors.country && <Text style={styles.errorText}>{errors.country.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('city')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('city')}
            defaultValue={userData?.address?.city}
            onChangeText={(text) => setValue('city', text)}
            {...register('city', { required: t('city') + ' is required' })}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city.message?.toString()}</Text>}

          <Text style={styles.subTitle}>{t('adressDetail')}</Text> 
          <TextInput
            style={styles.input}
            placeholder={t('adressDetail')}
            defaultValue={userData?.address?.details}
            onChangeText={(text) => setValue('addressDetails', text)}
            {...register('addressDetails', { required: t('adressDetail') + ' is required' })}
          />
          {errors.addressDetails && <Text style={styles.errorText}>{errors.addressDetails.message?.toString()}</Text>}

          <View style={{ alignItems: 'center', marginBottom: 100 }}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.btnText}>{t('update')}</Text> 
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
    marginBottom: 10,
  },
  subTitle: {
    marginBottom: 5,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'black',
    width: 145,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProfileScreen;
