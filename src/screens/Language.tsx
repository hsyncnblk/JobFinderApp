import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../translation/index'; 

function Language() {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('welcome')}</Text>
      <Text style={styles.label}>{t('selectLanguage')}</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => handleLanguageChange('tr')} style={styles.radioButton}>
          <Text style={selectedLang === 'tr' ? styles.selected : styles.unselected}>{t('turkish')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLanguageChange('en')} style={styles.radioButton}>
          <Text style={selectedLang === 'en' ? styles.selected : styles.unselected}>{t('english')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selected: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  unselected: {
    color: '#000',
  },
});

export default Language;
