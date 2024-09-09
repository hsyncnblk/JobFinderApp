import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { user, updateUser } from '../api';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

const getUser = async () => {
  const response = await user();
  return response.data;
};

const ProfileScreen = () => {
  const { data: userData, isLoading: isUserLoading, error: UserError } = useQuery('user', getUser);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

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
      ...data,
      address: {
        details: data.addressDetails,
        city: data.city,
        country: data.country,
      },
    };

    try {
      const response = await updateUser(formattedData);
      console.log("kayıt oldu", response.data); 
    } catch (error) {
      console.error("Güncelleme hatası:", error.response?.data || error.message); 
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
            {...register('name')}
          />

          <Text style={styles.subTitle}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Surname"
            defaultValue={userData?.surname}
            {...register('surname')}
          />

          <Text style={styles.subTitle}>Profile Image</Text>
          <TextInput
            style={styles.input}
            placeholder="Profile Image URL"
            defaultValue={userData?.profileImage}
            {...register('profileImage')}
          />

          <Text style={styles.subTitle}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            defaultValue={userData?.phone}
            {...register('phone', { required: true })}
          />
          {errors.phone && <Text style={styles.errorText}>Phone is required</Text>}

          <Text style={styles.subTitle}>Date Of Birth</Text>
<TextInput
  style={styles.input}
  placeholder="YYYY-MM-DD"
  defaultValue={userData?.dateOfBirth}
  {...register('dateOfBirth', { required: true })}  // YYYY-MM-DD doğrulama
/>
{errors.dateOfBirth && <Text style={styles.errorText}>Please enter a valid date (YYYY-MM-DD)</Text>}



          <Text style={styles.title}>Address</Text>

          

          <Text style={styles.subTitle}>Country</Text>
<TextInput
  style={styles.input}
  placeholder="Country"
  defaultValue={userData?.address?.country}
  {...register('country', { required: true })}  // Zorunlu alan olarak işaretliyoruz
/>
{errors.country && <Text style={styles.errorText}>Country is required</Text>}
          <Text style={styles.subTitle}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            defaultValue={userData?.address?.city}
            {...register('city')}
          />

<Text style={styles.subTitle}>Address Details</Text>
          <TextInput
            style={styles.input}
            placeholder="details"
            defaultValue={userData?.address?.details}
            {...register('details')}
          />

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
