import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { jobs, profile } from '../api';
import { useQuery } from 'react-query';

const fetchJobs = async () => {
  const response = await jobs();
  return response.data;  
};

const fetchProfile = async () => {
  const response = await profile();
  return response;  
};


const AppliedJobsScreen = () => {
  const { data: jobData, isLoading: isJobsLoading, error: jobsError } = useQuery('jobs', fetchJobs);
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery('profile', fetchProfile);

 


  // Yüklenme durumu
  if (isJobsLoading || isProfileLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (jobsError || profileError) {
    return <View><Text>Error loading data</Text></View>;
  }

  const appliedJobIds = profileData?.appliedJobs || [];

  const appliedJobs = jobData?.filter((job) => appliedJobIds.includes(job.id)) || [];

  if (appliedJobs.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No applied jobs found</Text>
      </View>
    );
  }

  const navigation = useNavigation();

  return (
    
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {appliedJobs.map((job) => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('JobDetail', { job })} 
          key={job.id} 
          style={styles.container}>
          
          <View style={styles.iconContainer}>
            <MaterialIcons name="work-outline" size={30} color="black" />
          </View>

          <View>
            <Text style={styles.jobTitle} numberOfLines={1} ellipsizeMode="tail">
              {job.name}
            </Text>
            <Text style={styles.companyName} numberOfLines={1}>
              Company: {job.companyName}
            </Text>
            <Text style={styles.salary}>
              Salary: {job.salary}$
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
    margin: 20
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
});

export default AppliedJobsScreen;
