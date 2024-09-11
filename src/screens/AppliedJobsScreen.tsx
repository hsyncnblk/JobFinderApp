

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import JobCard from '../component/JobCard';
import { jobs } from '../api';
import { useProfile } from '../context/ProfileDataContext'; 
 
const fetchJobs = async () => {
  const response = await jobs();
  return response.data;  
};

const AppliedJobsScreen = () => {
  const navigation = useNavigation();

  const { data: jobData, isLoading: isJobsLoading, error: jobsError } = useQuery('jobs', fetchJobs);

  const { profileData, isLoading: isProfileLoading, error: profileError } = useProfile();

  if (isJobsLoading || isProfileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
   
  if (jobsError || profileError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  const appliedJobIds = profileData?.appliedJobs || [];
  const appliedJobs = jobData?.filter((job) => appliedJobIds.includes(job.id)) || [];

  if (appliedJobs.length === 0) {
    return (
      <View style={styles.noJobsContainer}>
        <Text>No applied jobs found</Text>
      </View>
    );
  } 

  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {appliedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppliedJobsScreen;
