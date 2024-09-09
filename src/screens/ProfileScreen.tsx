import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <ScrollView>
          <Text style={styles.title}>Personal Information</Text>

          <Text style={styles.subTitle}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"

          />

          <Text style={styles.subTitle}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Surname"

          />

          <Text style={styles.subTitle}>Profile Image</Text>
          <TextInput
            style={styles.input}
            placeholder="url"

          />

          <Text style={styles.subTitle}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="555"

          />

          <Text style={styles.subTitle}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="22-05-2002"

          />

          <Text style={styles.title}>Adress</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"

          />

          <Text style={styles.subTitle}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Country"

          />

          <Text style={styles.subTitle}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"

          />

          <Text style={styles.subTitle}>Adress</Text>
          <TextInput
            style={styles.input}
            placeholder="Adress"

          />

          <View style={{ alignItems: 'center' , marginBottom:100 }}>
            <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Update</Text></TouchableOpacity>
          </View>

        </ScrollView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
    marginBottom: 10
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
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText: {
    color: 'white',

  }
});


export default ProfileScreen
