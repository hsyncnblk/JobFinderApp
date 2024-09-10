import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import JobCard from '../component/JobCard';
import { jobs } from '../api';
import { useQuery } from 'react-query';
import { SearchContext } from '../context/SearchContext'; 
import SearchBar from '../component/SearchBar'; 

const fetchJobs = async () => {
  const response = await jobs();
  return response.data;
};

const JobListingsScreen = () => {
  const { searchQuery } = useContext(SearchContext);  
  const { data: jobData, isLoading, error } = useQuery('jobs', fetchJobs);
  const [filteredJobs, setFilteredJobs] = useState([]);  

  
  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  
  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error fetching jobs</Text>
  //     </View>
  //   );
  // }

  
  const jobsList = Array.isArray(jobData) ? jobData : [];

  
  useEffect(() => {
    if (jobsList.length > 0) {  
      if (searchQuery === '') {
        setFilteredJobs(jobsList);
      } else {
        const filtered = jobsList.filter((job) =>
          job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setFilteredJobs(filtered);
      } 
    } 
  }, [searchQuery, jobsList]); 

  if (!filteredJobs || filteredJobs.length === 0) {
    return (
      <View style={styles.container}>
        <SearchBar/>
        <Text>no job</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar /> 
      <ScrollView>
        {filteredJobs.map((job) => (
          <JobCard job={job} />
        ))}
      </ScrollView>
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
