import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SearchContext } from '../context/SearchContext'; 
import { searchJobs } from '../api';
import { useTranslation } from 'react-i18next';


const SearchBar = () => {
  const { setSearchQuery } = useContext(SearchContext); 
  const [searchText, setSearchText] = useState(''); 
  const { t } = useTranslation(); 

  const fetchSearch = async (query: string) => {
    try {
      const response = await searchJobs(query);  
      return response;  
    } catch (error) {
      console.error('Error fetching jobs:', error);  
    }
  };

 
  useEffect(() => {
    if (searchText.length > 0) { 
      setSearchQuery(searchText); 
      const fetchData = async () => {
        const result = await fetchSearch(searchText); 
        //console.log("Arama Sonucu:", result);  
      };
      fetchData(); 
    }
  }, [searchText, setSearchQuery]);  

  return (
    <View style={{ backgroundColor: '#F2F2F2' }}>
      <View style={styles.searchSection}>
        <MaterialIcons
          name="search"
          size={30}
          color="black"
          style={{ padding: 5 }}
        />
        <TextInput
          style={styles.input}
          placeholder= {t('search')}
          placeholderTextColor="black"
          value={searchText}  
          onChangeText={(text) => setSearchText(text)} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 2,
    margin: 20,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default SearchBar;
