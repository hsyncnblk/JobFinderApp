import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../context/ProfileDataContext';  
import { useTranslation } from 'react-i18next';

const JobCard = ({ job }) => {
  const [isApplied, setIsApplied] = useState(false);
  const { t } = useTranslation();  
  const { profileData, isLoading, error, refetch } = useProfile();  
  
  
  const appliedJobIds = profileData?.appliedJobs || [];

  useEffect(() => {
    if (appliedJobIds.includes(job.id)) {
      setIsApplied(true);
    } else {
      setIsApplied(false);
    }
  }, [job.id, appliedJobIds]);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('JobDetail', { job, isApplied, setIsApplied });
  };

  if (isLoading) return <Text>Loading...</Text>;  
  if (error) return <Text>Error loading profile</Text>; 

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="work-outline" size={30} color="black" />
      </View>

      <View>
        <Text style={styles.jobTitle} numberOfLines={1} ellipsizeMode="tail">
          {job.name}
        </Text>
        <Text style={styles.companyName} numberOfLines={1}>
          {t('company')}: {job.companyName}  
        </Text>
        <Text style={styles.salary}>{t('salary')}: {job.salary}$</Text> 
      </View>

      {isApplied && (
        <View style={styles.checkIcon}>
          <MaterialIcons name="check-circle-outline" size={24} color="black" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
    margin: 20,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardDetail: {
    flexDirection: 'column',
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
    top: 10,
  },
});

export default JobCard;
