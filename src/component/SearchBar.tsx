import React, { useContext } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SearchContext } from '../context/SearchContext'; 

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);  

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
          placeholder="Search (companyName)"
          placeholderTextColor="black"
          value={searchQuery}  
          onChangeText={(text) => setSearchQuery(text)}  
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
