import React, { useState } from 'react'
import { StyleSheet , View , TextInput } from 'react-native'
import SearchBar from '../component/SearchBar'


const JobListingsScreen = () => {

 // const [searchText, setSearchText] = useState('');

  return (
    <View  style={styles.container}>
     <SearchBar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  
});

export default JobListingsScreen
