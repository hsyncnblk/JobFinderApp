import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Button, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { jobs, profile } from '../api';
import { useQuery } from 'react-query';


const fetchProfile = async () => {
  const response = await profile();
  return response;  
};


const JobCard = ({ job }) => {

  const [isApplied, setIsApplied] = useState(true);


  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery('profile', fetchProfile);
  const appliedJobIds = profileData?.appliedJobs || [];


  console.log("job",job)
  console.log("appliedJobIds",appliedJobIds)

  useEffect(() => {

    if (appliedJobIds.includes(job.id)) {
      setIsApplied(true);
    } else {
      setIsApplied(false);
    }
  }, [job.id, appliedJobIds]);


    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('JobDetail', { job });
    };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
    <View style={styles.iconContainer}>
        <MaterialIcons name="work-outline" size={30} color="black" />
      </View>

      <View>
        <Text style={styles.jobTitle} numberOfLines={1} ellipsizeMode="tail">{job.name}</Text>
        <Text style={styles.companyName} numberOfLines={1} >Company: {job.companyName}</Text>
        <Text style={styles.salary}>Salary: {job.salary}$</Text>
      </View>

        {isApplied && <View style={styles.checkIcon}>
         <MaterialIcons name="check-circle-outline" size={24} color="black" />
         </View>}
         
        
      
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
    margin:20
   
    },
    card: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardDetail: {
        flexDirection: 'column'
    },
    iconContainer: {
        marginRight: 15,
      },

      jobTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
      },
      companyName: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,

      },
      salary: {
        fontSize: 14,
        color: 'gray',
      },
      checkIcon: {
        position: 'absolute',
        right: 10,
        top: 10
      },
  });
  
export default JobCard
