import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { user, updateUser } from '../api';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

const getUser = async () => {
  const response = await user();
  return response;
};

const ProfileScreen = () => {
  const { data: userData, isLoading: isUserLoading, error: UserError, refetch } = useQuery('user', getUser);
  
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

      // Güncelleme sonrası veriyi tekrar çek
      refetch();
    } catch (error) {
      console.error('Güncelleme hatası:', error.response?.data || error.message);
    }
  };

  if (UserError) {
    return (
      <View>
        <Text>There was an error fetching user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <ScrollView>
          <Text style={styles.title}>Personal Information</Text>

          <Text style={styles.subTitle}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            defaultValue={userData?.name}
            onChangeText={(text) => setValue('name', text)} // Form değerini manuel olarak güncelle
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message?.toString()}</Text>}

          <Text style={styles.subTitle}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Surname"
            defaultValue={userData?.surname}
            onChangeText={(text) => setValue('surname', text)} // Form değerini manuel olarak güncelle
            {...register('surname', { required: 'Surname is required' })}
          />
          {errors.surname && <Text style={styles.errorText}>{errors.surname.message?.toString()}</Text>}

          <Text style={styles.subTitle}>Profile Image</Text>
          <TextInput
            style={styles.input}
            placeholder="Profile Image URL"
            defaultValue={userData?.profileImage}
            onChangeText={(text) => setValue('profileImage', text)} // Form değerini manuel olarak güncelle
            {...register('profileImage', { required: 'Profile Image is required' })}
          />
          {errors.profileImage && <Text style={styles.errorText}>{errors.profileImage.message?.toString()}</Text>}

          <Text style={styles.subTitle}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            defaultValue={userData?.phone}
            onChangeText={(text) => setValue('phone', text)} // Form değerini manuel olarak güncelle
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone.message?.toString()}</Text>}

          <Text style={styles.subTitle}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            defaultValue={userData?.dateOfBirth}
            onChangeText={(text) => setValue('dateOfBirth', text)} // Form değerini manuel olarak güncelle
            {...register('dateOfBirth', { required: 'Date of Birth is required' })}
          />
          {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth.message?.toString()}</Text>}

          <Text style={styles.title}>Address</Text>

          <Text style={styles.subTitle}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Country"
            defaultValue={userData?.address?.country}
            onChangeText={(text) => setValue('country', text)} // Form değerini manuel olarak güncelle
            {...register('country', { required: 'Country is required' })}
          />
          {errors.country && <Text style={styles.errorText}>{errors.country.message?.toString()}</Text>}

          <Text style={styles.subTitle}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            defaultValue={userData?.address?.city}
            onChangeText={(text) => setValue('city', text)} // Form değerini manuel olarak güncelle
            {...register('city', { required: 'City is required' })}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city.message?.toString()}</Text>}

          <Text style={styles.subTitle}>Address Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Details"
            defaultValue={userData?.address?.details}
            onChangeText={(text) => setValue('addressDetails', text)} // Form değerini manuel olarak güncelle
            {...register('addressDetails', { required: 'Address details are required' })}
          />
          {errors.addressDetails && <Text style={styles.errorText}>{errors.addressDetails.message?.toString()}</Text>}

          <View style={{ alignItems: 'center', marginBottom: 100 }}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.btnText}>Update</Text>
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
