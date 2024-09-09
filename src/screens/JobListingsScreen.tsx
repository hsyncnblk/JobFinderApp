import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import SearchBar from '../component/SearchBar';
import JobCard from '../component/JobCard';
import { jobs } from '../api';
import { useQuery } from 'react-query';

const fetchJobs = async () => {
  const response = await jobs();
  console.log("API response Job:", response);

  return response.data;
};

const JobListingsScreen = () => {

  const { data: jobData, isLoading, error } = useQuery('jobs', fetchJobs);

  console.log("listing job",jobData)
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching jobs</Text>
      </View>
    );
  }

  const jobsList = Array.isArray(jobData) ? jobData : jobData?.data;

  if (!Array.isArray(jobsList)) {
    return (
      <View style={styles.container}>
        <Text>No jobs available</Text>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar />
        {jobsList.map((job) => (
          <JobCard job={job} />

        ))}
      </ScrollView>
      <TouchableOpacity />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default JobListingsScreen;
