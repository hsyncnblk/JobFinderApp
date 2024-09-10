import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { applyJob, withdrawJob } from '../api';


const JobDetailScreen = ({ route }) => {

  const { job, isApplied , setIsApplied } = route.params;

  const [applied, setApplied]= useState(isApplied)

  console.log("Detay job", job.id)

  const handleApply = async (id) => {
    console.log("Detay job", id);

    try {
        const response = await applyJob(id);  // applyJob'u await ile bekliyoruz
        console.log('Başvuru başarılı:', response);  // Başvuru başarılı olduğunda yanıtı loglayın
        setIsApplied(true)
        setApplied(true)
    } catch (error) {
        console.error('Başvuru sırasında hata:', error);  // Hata varsa loglayın
    }
};

  const handleWithdraw = async (id) => {
    try {
      const response = await withdrawJob(id);  // withdrawJob'u bekleyin
      console.log('Başvuru iptali başarılı:', response);
      setIsApplied(false)
      setApplied(false)
    } catch (error) {
      console.error('Başvuru iptali sırasında hata:', error);  // Hataları yönetin
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <MaterialIcons name="work-outline" size={35} color="black" />

        <Text style={styles.title}>{job.name}</Text>

        <Text style={styles.subTitle}>Company:<Text style={{ fontWeight: '400' }}> {job.companyName}</Text></Text>

        <Text style={styles.subTitle}>Location:<Text style={{ fontWeight: '400' }}> {job.location}</Text></Text>

        <Text style={styles.subTitle}>Salary:<Text style={{ fontWeight: '400' }}> {job.salary}$</Text></Text>

        <Text style={styles.title}>Keyword</Text>

        <View style={{
          paddingHorizontal: 10,
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'
        }}>
          {job.keywords.map((keywords) => (
            <Text style={styles.keywords}>{keywords}</Text>
          ))}

        </View>

        <Text style={styles.title}>Job Description</Text>

        <View style={styles.descriptionBox}>
          <Text style={{ color: 'black', fontWeight: 'bold', }}>{job.description}</Text>
        </View>

        {applied ?
          <TouchableOpacity onPress={() => handleWithdraw(job.id)}  style={styles.btnWithdraw}>
            <Text style={styles.textWithdraw}>Withdraw</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleApply(job.id)}  style={styles.btnApply}>
            <Text style={styles.textApply}>Apply</Text>
          </TouchableOpacity>

        }




      </View>
    </View>

  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    margin: 25,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    margin: 10

  },
  subTitle: {
    color: 'black',
    margin: 7,
    fontWeight: 'bold'
  },
  keywords: {
    margin: 5,
    borderWidth: 3,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  descriptionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    padding: 1,
    backgroundColor: 'white',
    width: 210,
    height: 80

  },
  btnApply: {
    margin: 30,
    borderWidth: 3,
    paddingHorizontal: 35,
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textApply: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnWithdraw: {
    margin: 30,
    borderWidth: 3,
    paddingHorizontal: 30,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWithdraw: {
    color: 'black',
    fontWeight: 'bold',
  }
})

export default JobDetailScreen
